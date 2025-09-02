import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { cn } from '../../lib/utils';

// Minimal Three.js hero animation (MacBook‑like model + drag + auto rotate)
export interface LandingAnimation3DProps {
  className?: string;
  /** Accessible label for assistive tech */
  label?: string;
  /** Preferred pixel size (both width & height). Responsive container can override. */
  size?: number;
  /** Extra padding (in px) around the canvas inside the circular background */
  padding?: number;
}

const isWebGLAvailable = () => {
  // Heuristic: jsdom lacks OffscreenCanvas & WebGLRenderingContext
  if (typeof window === 'undefined' || !(window as Window & { WebGLRenderingContext?: unknown }).WebGLRenderingContext) {
    return false;
  }
  try {
    const c = document.createElement('canvas');
    const gl = c.getContext('webgl') || c.getContext('experimental-webgl');
    return !!gl;
  } catch {
    return false;
  }
};

export const LandingAnimation3D: React.FC<LandingAnimation3DProps> = ({ className, label='Landing animation', size=220, padding=24 }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const frameRef = useRef<number | null>(null);
  const meshRef = useRef<THREE.Mesh | null>(null);
  const disposeFnsRef = useRef<(() => void)[]>([]);
  const draggingRef = useRef(false);
  const dragStartRef = useRef<{ x: number; y: number; rotY: number; rotX: number } | null>(null);
  const angleRef = useRef(0);
  const autoStartRef = useRef<number>(performance.now());

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isWebGLAvailable()) return; // Skip in unsupported / test env

    const scene = new THREE.Scene();
    scene.background = null; // Transparent, let Tailwind gradient show

  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  camera.position.z = 5; // further back to avoid clipping

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  // Canvas (object) size excludes padding so circle can be larger without enlarging model
  renderer.setSize(size, size);
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

  // --- MacBook‑style refined model ---
  const group = new THREE.Group();
  const aluminum = { metalness: 0.9, roughness: 0.3, color: '#d5d7da' }; // brighter silver
  const darkKey = { metalness: 0.25, roughness: 0.55, color: '#262729' };
  const bezelColor = '#161718';

  // Lid outer (very thin)
  // Hinge pivot (rear edge) so lid rotates correctly; origin at deck top back line
  const lidGroup = new THREE.Group();
  lidGroup.position.set(0, -0.63 + 0.10/2 + 0.02, -1.0); // deck Y + half deck height + slight clearance, Z back edge
  group.add(lidGroup);

  const lidOuterG = new THREE.BoxGeometry(2.9, 1.85, 0.04);
  const lidOuterM = new THREE.MeshStandardMaterial(aluminum);
  const lidOuter = new THREE.Mesh(lidOuterG, lidOuterM);
  lidOuter.position.set(0, 1.85/2, 0.04/2); // raise above hinge & slight forward thickness
  lidGroup.add(lidOuter);

  const bezelG = new THREE.PlaneGeometry(2.78,1.72);
  const bezelM = new THREE.MeshStandardMaterial({ color: bezelColor, metalness:0.15, roughness:0.85 });
  const bezel = new THREE.Mesh(bezelG, bezelM); bezel.position.set(0,1.85/2,0.021);
  lidGroup.add(bezel);

  const screenG = new THREE.PlaneGeometry(2.62,1.56);
  const screenM = new THREE.MeshStandardMaterial({ color:'#d9dadc', emissive:'#d4d5d6', emissiveIntensity:0.15, roughness:0.65, metalness:0.05 });
  const screen = new THREE.Mesh(screenG,screenM); screen.position.set(0,1.85/2,0.026);
  lidGroup.add(screen);
  // Slight open angle (~105°). Base lies roughly at rotation.x = -0.22 on parent group so adjust relative.
  lidGroup.rotation.x = -0.05; // subtle independent tilt

  // Base top deck & underside to create wedge
  const deckG = new THREE.BoxGeometry(3.0,0.10,2.0);
  const deckM = new THREE.MeshStandardMaterial(aluminum);
  const deck = new THREE.Mesh(deckG,deckM); deck.position.set(0,-0.63,0); // center base so back = -1.0, front = +1.0
  group.add(deck);
  // Underside slightly thinner & inset to look tapered
  const underG = new THREE.BoxGeometry(2.9,0.06,1.9);
  const underM = new THREE.MeshStandardMaterial({ ...aluminum, roughness:0.45 });
  const underside = new THREE.Mesh(underG,underM); underside.position.set(0,-0.68,0);
  group.add(underside);

  // Trackpad (centered, lighter)
  const trackG = new THREE.BoxGeometry(1.05,0.01,0.65);
  const trackM = new THREE.MeshStandardMaterial({ color:'#e2e4e6', metalness:0.3, roughness:0.5 });
  const track = new THREE.Mesh(trackG,trackM); track.position.set(0,-0.60,0.45); // shift forward slightly
  group.add(track);

  // Front notch (opening lip)
  const notchG = new THREE.BoxGeometry(0.6,0.02,0.09);
  const notchM = new THREE.MeshStandardMaterial({ color:'#b8bbbe', metalness:0.6, roughness:0.4 });
  const notch = new THREE.Mesh(notchG,notchM); notch.position.set(0,-0.58,0.98);
  group.add(notch);

  // Keyboard (instanced keys) – narrower footprint than deck
  const keyGeom = new THREE.BoxGeometry(0.155,0.02,0.155);
  const keyMat = new THREE.MeshStandardMaterial(darkKey);
  const rows = 5, cols = 14; const keyMesh = new THREE.InstancedMesh(keyGeom, keyMat, rows*cols);
  let i=0; for(let r=0;r<rows;r++){ for(let c=0;c<cols;c++){ const m=new THREE.Matrix4(); const x=-1.05 + c*0.165; const z=-0.55 + r*0.18; if(x<-1.05||x>1.05) continue; m.setPosition(x,-0.60,z); keyMesh.setMatrixAt(i++, m);} }
  keyMesh.count = i; keyMesh.instanceMatrix.needsUpdate = true; group.add(keyMesh);

  // Hinge bar
  const hingeG = new THREE.CylinderGeometry(0.06,0.06,2.9,20,1,true);
  const hingeM = new THREE.MeshStandardMaterial({ color:'#bfc2c5', metalness:0.85, roughness:0.35 });
  const hinge = new THREE.Mesh(hingeG, hingeM); hinge.rotation.z = Math.PI/2; hinge.position.set(0,-0.58,-1.0); group.add(hinge);

  group.rotation.x=-0.22; group.scale.set(0.9,0.9,0.9); // keep centered; deck now centered so no z shift
    meshRef.current = group as unknown as THREE.Mesh; // stored for rotation animation
    scene.add(group);
  // Lighting: soft studio feel for aluminum
  const hemi = new THREE.HemisphereLight('#ffffff','#c3c6c9',0.85); scene.add(hemi);
  const keyLight = new THREE.DirectionalLight('#ffffff',1.1); keyLight.position.set(4,3,6); scene.add(keyLight);
  const fill = new THREE.DirectionalLight('#dfe7ff',0.7); fill.position.set(-3,2,2); scene.add(fill);
  const warm = new THREE.PointLight('#ffe9d3',0.8,8); warm.position.set(0,2,-3); scene.add(warm);

  // Save disposers (no background plane now)
    disposeFnsRef.current.push(() => {
      lidOuterG.dispose(); lidOuterM.dispose(); bezelG.dispose(); bezelM.dispose(); screenG.dispose(); screenM.dispose();
      deckG.dispose(); deckM.dispose(); underG.dispose(); underM.dispose(); trackG.dispose(); trackM.dispose();
      notchG.dispose(); notchM.dispose(); keyGeom.dispose(); keyMat.dispose(); hingeG.dispose(); hingeM.dispose();
    });

  const AUTO_SPEED = 0.4; // rad/s
    const animate = () => {
      if (meshRef.current) {
        if (!draggingRef.current) {
          const now = performance.now();
          const elapsed = (now - autoStartRef.current) / 1000;
          angleRef.current = (elapsed * AUTO_SPEED) % (Math.PI * 2);
          meshRef.current.rotation.y = angleRef.current; // 360 horizontal rotation
        }
      }
      renderer.render(scene, camera);
      frameRef.current = requestAnimationFrame(animate);
    };
    animate();

    // We intentionally keep a fixed internal canvas size (size prop) and allow outer container to vary.
    const handleResize = () => {
      if (!rendererRef.current) return;
      camera.aspect = 1; // square projection
      camera.updateProjectionMatrix();
      rendererRef.current.setSize(size, size);
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    // Pointer drag interaction
  const onPointerDown = (e: PointerEvent) => {
      if (!meshRef.current) return;
      draggingRef.current = true;
      dragStartRef.current = { x: e.clientX, y: e.clientY, rotY: meshRef.current.rotation.y, rotX: meshRef.current.rotation.x };
      container.setPointerCapture(e.pointerId);
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!draggingRef.current || !dragStartRef.current || !meshRef.current) return;
      const dx = e.clientX - dragStartRef.current.x;
      const dy = e.clientY - dragStartRef.current.y;
      meshRef.current.rotation.y = dragStartRef.current.rotY + dx * 0.01;
      meshRef.current.rotation.x = dragStartRef.current.rotX + dy * 0.01;
    };
    const onPointerUp = (e: PointerEvent) => {
      if (!draggingRef.current) return;
      draggingRef.current = false;
      dragStartRef.current = null;
      container.releasePointerCapture(e.pointerId);
      // realign auto rotation timeline from current position
      if (meshRef.current) {
        angleRef.current = meshRef.current.rotation.y % (Math.PI * 2);
        autoStartRef.current = performance.now() - (angleRef.current / AUTO_SPEED) * 1000;
      }
    };
    container.addEventListener('pointerdown', onPointerDown);
    container.addEventListener('pointermove', onPointerMove);
    container.addEventListener('pointerup', onPointerUp);
    container.addEventListener('pointerleave', onPointerUp);

    const disposeFnsSnapshot = [...disposeFnsRef.current];
    return () => {
  window.removeEventListener('resize', handleResize);
  container.removeEventListener('pointerdown', onPointerDown);
  container.removeEventListener('pointermove', onPointerMove);
  container.removeEventListener('pointerup', onPointerUp);
  container.removeEventListener('pointerleave', onPointerUp);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      disposeFnsSnapshot.forEach((fn) => fn());
      scene.clear();
      renderer.dispose();
      renderer.forceContextLoss?.();
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, [size, padding]);

  return (
    <div
      ref={containerRef}
      role="img"
      aria-label={label}
  className={cn('relative mx-auto flex items-center justify-center rounded-full select-none','border border-primary/10 bg-transparent',className)}
  style={{ width: size + padding * 2, height: size + padding * 2, padding }}
    >
      {/* Fallback (when WebGL unsupported) */}
      {!rendererRef.current && (
        <div className="w-1/2 h-1/2 rounded-md bg-zinc-700 animate-pulse" />
      )}
    </div>
  );
};

// Transparent background integrates with page theme.

export default LandingAnimation3D;
