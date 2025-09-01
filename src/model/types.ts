export interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'user';
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  image?: string;
  featured: boolean;
}

export interface AboutMe {
  name: string;
  title: string;
  bio: string;
  skills: string[];
  experience: number;
  location: string;
  email: string;
  linkedin?: string;
  github?: string;
}