import { jwtDecode } from 'jwt-decode';
import type { User } from '../model/types';

const TOKEN_KEY = 'auth_token';

export interface DecodedToken {
  sub: string;
  username: string;
  email: string;
  role: 'admin' | 'user';
  exp: number;
  iat: number;
}

export const authUtils = {
  setToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
  },

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  },

  removeToken(): void {
    localStorage.removeItem(TOKEN_KEY);
  },

  decodeToken(token?: string): DecodedToken | null {
    const authToken = token || this.getToken();
    if (!authToken) return null;

    try {
      return jwtDecode<DecodedToken>(authToken);
    } catch (error) {
      console.error('Invalid token:', error);
      this.removeToken();
      return null;
    }
  },

  isTokenExpired(token?: string): boolean {
    const decoded = this.decodeToken(token);
    if (!decoded) return true;

    return Date.now() >= decoded.exp * 1000;
  },

  getCurrentUser(): User | null {
    const decoded = this.decodeToken();
    if (!decoded) return null;

    return {
      id: decoded.sub,
      username: decoded.username,
      email: decoded.email,
      role: decoded.role,
    };
  },

  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!(token && !this.isTokenExpired(token));
  },

  // Mock login for demo purposes
  async mockLogin(username: string, password: string): Promise<string> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Simple mock validation
    if (username === 'admin' && password === 'admin') {
      // Create mock JWT payload
      const payload = {
        sub: '1',
        username: 'admin',
        email: 'admin@example.com',
        role: 'admin' as const,
        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24), // 24 hours
        iat: Math.floor(Date.now() / 1000),
      };

      // Create mock JWT token (just base64 encoded for demo)
      const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
      const payloadB64 = btoa(JSON.stringify(payload));
      const signature = btoa('mock-signature');
      
      return `${header}.${payloadB64}.${signature}`;
    }

    if (username === 'user' && password === 'user') {
      const payload = {
        sub: '2',
        username: 'user',
        email: 'user@example.com',
        role: 'user' as const,
        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24),
        iat: Math.floor(Date.now() / 1000),
      };

      const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
      const payloadB64 = btoa(JSON.stringify(payload));
      const signature = btoa('mock-signature');
      
      return `${header}.${payloadB64}.${signature}`;
    }

    throw new Error('Invalid credentials');
  },
};