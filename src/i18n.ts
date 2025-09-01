import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      nav: {
        home: 'Home',
        dashboard: 'Dashboard',
        admin: 'Admin',
        login: 'Login',
        logout: 'Logout',
      },
      auth: {
        title: 'Login',
        username: 'Username',
        password: 'Password',
        loginButton: 'Sign In',
        loggingIn: 'Signing in...',
        error: 'Invalid credentials',
        required: 'This field is required',
      },
      landing: {
        title: 'Welcome to My Portfolio',
        subtitle: 'Full-Stack Developer & UI/UX Designer',
        aboutButton: 'About Me',
        projectsButton: 'View Projects',
        loginButton: 'Login',
      },
      dashboard: {
        title: 'Dashboard',
        welcome: 'Welcome back',
        aboutMe: 'About Me',
        projects: 'My Projects',
        stats: 'Statistics',
        viewProfile: 'View Profile',
        manageProjects: 'Manage Projects',
      },
      admin: {
        title: 'Admin Panel',
        subtitle: 'Manage your portfolio content',
        projects: 'Projects',
        settings: 'Settings',
        users: 'Users',
      },
      aboutMe: {
        title: 'About Me',
        experience: 'years of experience',
        location: 'Location',
        email: 'Email',
        skills: 'Skills',
        bio: 'Biography',
      },
      projects: {
        title: 'My Projects',
        featured: 'Featured Projects',
        viewCode: 'View Code',
        viewLive: 'Live Demo',
        technologies: 'Technologies',
        noProjects: 'No projects found',
      },
      common: {
        loading: 'Loading...',
        error: 'Something went wrong',
        retry: 'Try Again',
        back: 'Back',
        save: 'Save',
        cancel: 'Cancel',
        edit: 'Edit',
        delete: 'Delete',
        confirm: 'Confirm',
      },
      language: {
        english: 'English',
        spanish: 'Español',
        switch: 'Switch Language',
      },
    },
  },
  es: {
    translation: {
      nav: {
        home: 'Inicio',
        dashboard: 'Panel',
        admin: 'Admin',
        login: 'Iniciar Sesión',
        logout: 'Cerrar Sesión',
      },
      auth: {
        title: 'Iniciar Sesión',
        username: 'Usuario',
        password: 'Contraseña',
        loginButton: 'Entrar',
        loggingIn: 'Iniciando sesión...',
        error: 'Credenciales inválidas',
        required: 'Este campo es obligatorio',
      },
      landing: {
        title: 'Bienvenido a Mi Portafolio',
        subtitle: 'Desarrollador Full-Stack y Diseñador UI/UX',
        aboutButton: 'Sobre Mí',
        projectsButton: 'Ver Proyectos',
        loginButton: 'Iniciar Sesión',
      },
      dashboard: {
        title: 'Panel de Control',
        welcome: 'Bienvenido de nuevo',
        aboutMe: 'Sobre Mí',
        projects: 'Mis Proyectos',
        stats: 'Estadísticas',
        viewProfile: 'Ver Perfil',
        manageProjects: 'Gestionar Proyectos',
      },
      admin: {
        title: 'Panel de Administración',
        subtitle: 'Gestiona el contenido de tu portafolio',
        projects: 'Proyectos',
        settings: 'Configuración',
        users: 'Usuarios',
      },
      aboutMe: {
        title: 'Sobre Mí',
        experience: 'años de experiencia',
        location: 'Ubicación',
        email: 'Correo',
        skills: 'Habilidades',
        bio: 'Biografía',
      },
      projects: {
        title: 'Mis Proyectos',
        featured: 'Proyectos Destacados',
        viewCode: 'Ver Código',
        viewLive: 'Demo en Vivo',
        technologies: 'Tecnologías',
        noProjects: 'No se encontraron proyectos',
      },
      common: {
        loading: 'Cargando...',
        error: 'Algo salió mal',
        retry: 'Intentar de Nuevo',
        back: 'Volver',
        save: 'Guardar',
        cancel: 'Cancelar',
        edit: 'Editar',
        delete: 'Eliminar',
        confirm: 'Confirmar',
      },
      language: {
        english: 'English',
        spanish: 'Español',
        switch: 'Cambiar Idioma',
      },
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;