import type { AboutMe, Project } from '../model/types';

// Mock data for demo purposes
export const mockAboutMe: AboutMe = {
  name: 'Alex Johnson',
  title: 'Full-Stack Developer & UI/UX Designer',
  bio: 'Passionate developer with 5+ years of experience creating beautiful, functional web applications. I specialize in React, TypeScript, and modern web technologies. Always learning and exploring new ways to solve complex problems.',
  skills: [
    'React',
    'TypeScript',
    'Node.js',
    'Python',
    'AWS',
    'Docker',
    'PostgreSQL',
    'GraphQL',
    'Tailwind CSS',
    'Figma',
  ],
  experience: 5,
  location: 'San Francisco, CA',
  email: 'alex.johnson@example.com',
  linkedin: 'https://linkedin.com/in/alexjohnson',
  github: 'https://github.com/alexjohnson',
};

export const mockProjects: Project[] = [
  {
    id: '1',
    title: 'E-Commerce Platform',
    description: 'Full-stack e-commerce solution with React, Node.js, and PostgreSQL. Features include user authentication, product catalog, shopping cart, and payment integration.',
    technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Stripe'],
    githubUrl: 'https://github.com/alexjohnson/ecommerce-platform',
    liveUrl: 'https://ecommerce-demo.example.com',
    featured: true,
  },
  {
    id: '2',
    title: 'Task Management App',
    description: 'Modern task management application with real-time collaboration features. Built with React, GraphQL, and WebSocket for live updates.',
    technologies: ['React', 'GraphQL', 'Apollo', 'WebSocket', 'MongoDB'],
    githubUrl: 'https://github.com/alexjohnson/task-manager',
    liveUrl: 'https://tasks-demo.example.com',
    featured: true,
  },
  {
    id: '3',
    title: 'Weather Dashboard',
    description: 'Beautiful weather dashboard with location-based forecasts, interactive maps, and data visualization. Integrates with multiple weather APIs.',
    technologies: ['React', 'D3.js', 'OpenWeather API', 'Mapbox'],
    githubUrl: 'https://github.com/alexjohnson/weather-dashboard',
    liveUrl: 'https://weather-demo.example.com',
    featured: false,
  },
  {
    id: '4',
    title: 'Personal Finance Tracker',
    description: 'Secure personal finance application with expense tracking, budget planning, and financial insights. Emphasizes privacy and data security.',
    technologies: ['React', 'TypeScript', 'Express', 'MongoDB', 'Chart.js'],
    githubUrl: 'https://github.com/alexjohnson/finance-tracker',
    featured: false,
  },
];

// Mock API functions
export const api = {
  getAboutMe: async (): Promise<AboutMe> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    return mockAboutMe;
  },

  getProjects: async (): Promise<Project[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return mockProjects;
  },

  getFeaturedProjects: async (): Promise<Project[]> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    return mockProjects.filter(project => project.featured);
  },
};