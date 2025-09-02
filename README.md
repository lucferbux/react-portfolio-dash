# Personal Portfolio Dashboard

A modern, secure personal portfolio application with JWT authentication, internationalization (i18n), and reusable React hooks built with React 19, TypeScript, and Tailwind CSS.

## Features

- 🔐 **JWT Authentication** - Secure login with mock credentials and token management
- 🌍 **Internationalization** - English/Spanish language support with react-i18next
- 📱 **Responsive Design** - Mobile-first approach with Tailwind CSS
- 🎨 **Modern UI** - Professional design using shadcn/ui components
- 🔄 **State Management** - React Context for auth and project state
- 📊 **Data Fetching** - Custom useFetchData hook with loading/error states
- 🛣️ **Protected Routes** - Role-based access control for admin features
- ⚡ **Performance** - Built with Vite for fast development and builds

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Routing**: React Router v6
- **Styling**: Tailwind CSS, shadcn/ui components
- **Icons**: Phosphor Icons
- **Authentication**: JWT with localStorage persistence
- **Internationalization**: i18next, react-i18next
- **State Management**: React Context + useKV hook

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
cd personal-portfolio
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Start the development server:
\`\`\`bash
npm run dev
\`\`\`

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## Demo Credentials

The application includes mock authentication for demonstration:

- **Admin User**: username: \`admin\`, password: \`admin\`
- **Regular User**: username: \`user\`, password: \`user\`

## Project Structure

\`\`\`
src/
├── api/              # Mock API and data services
├── components/       # React components
│   ├── cards/        # Card components (ProjectCard, AboutMeCard)
│   ├── elements/     # Reusable UI elements (LoadingSpinner, LanguageSelector)
│   ├── layout/       # Layout components (Navigation, Layout)
│   ├── routes/       # Route components (PrivateRoute)
│   └── ui/           # shadcn/ui components
├── context/          # React Context providers
├── hooks/            # Custom React hooks
├── model/            # TypeScript type definitions
├── pages/            # Page components
├── utils/            # Utility functions
├── i18n.ts           # Internationalization configuration
└── main.tsx          # Application entry point
\`\`\`

## Key Features

### Authentication System

- JWT-based authentication with automatic token validation
- Protected routes with role-based access control
- Automatic logout on token expiry
- Persistent login state across browser sessions

### Internationalization

- Support for English and Spanish
- Browser language detection
- Persistent language preference
- Easy language switching via UI toggle

### Data Management

- Custom \`useFetchData\` hook for consistent data fetching patterns
- Loading and error states for all data operations
- Mock API with realistic delays for demonstration
- React Context for global state management

### UI/UX

- Modern, professional design with complementary blue-orange color scheme
- Responsive layout optimized for mobile and desktop
- Smooth animations and hover effects
- Accessible design with proper contrast ratios

## Available Scripts

- \`npm run dev\` - Start development server
- \`npm run build\` - Build for production
- \`npm run preview\` - Preview production build
- \`npm run lint\` - Run ESLint

## Routes

- **/** - Landing page with portfolio overview
- **/login** - Authentication page
- **/dashboard** - User dashboard with about me and featured projects
- **/admin** - Admin panel (requires admin role)

## Customization

### Adding New Projects

Edit \`src/api/mockData.ts\` to add or modify project data:

\`\`\`typescript
export const mockProjects: Project[] = [
  {
    id: 'unique-id',
    title: 'Project Title',
    description: 'Project description',
    technologies: ['React', 'TypeScript'],
    githubUrl: 'https://github.com/...',
    liveUrl: 'https://...',
    featured: true,
  },
  // ... more projects
];
\`\`\`

### Updating About Me

Modify the \`mockAboutMe\` object in \`src/api/mockData.ts\`:

\`\`\`typescript
export const mockAboutMe: AboutMe = {
  name: 'Your Name',
  title: 'Your Title',
  bio: 'Your biography...',
  skills: ['Skill1', 'Skill2'],
  // ... other fields
};
\`\`\`

### Adding Translations

Add new translation keys to \`src/i18n.ts\`:

\`\`\`typescript
const resources = {
  en: {
    translation: {
      newSection: {
        newKey: 'English text',
      },
    },
  },
  es: {
    translation: {
      newSection: {
        newKey: 'Spanish text',
      },
    },
  },
};
\`\`\`

### Theme Customization

Modify CSS variables in \`src/index.css\` to customize the color scheme:

\`\`\`css
:root {
  --primary: oklch(0.45 0.15 250); /* Primary blue */
  --accent: oklch(0.65 0.15 50);   /* Accent orange */
  /* ... other color variables */
}
\`\`\`

## Future Enhancements

This portfolio is designed for extensibility. Planned enhancements include:

- **Real API Integration** - Replace mock data with actual backend API
- **Content Management** - Admin interface for editing projects and about me
- **Dark Mode** - Theme switching capability
- **SEO Optimization** - Meta tags and structured data
- **Analytics** - Integration with Google Analytics or similar
- **Contact Form** - Email integration for visitor inquiries
- **Blog Section** - Content management for blog posts
- **Image Upload** - File management for project images

## Migration Notes

### 2025-09: Lottie Removal & Three.js Hero Animation

The landing page hero animation transitioned from a planned `lottie-react` JSON animation to a lightweight custom Three.js component (`LandingAnimation3D`). Reasons:

- Avoid extra ~80kb (lottie + json) for a simple motion effect
- Gain dynamic lighting & theme-friendly gradient
- Provide graceful fallback when WebGL unsupported

Component characteristics:

- Accessible (`role="img"`, customizable `aria-label`)
- Cleans up WebGL context, geometry, materials on unmount
- No external abstraction (keeps bundle minimal vs react-three-fiber)
- <150 LOC, self-contained under `src/components/elements/`

Testing: Added Vitest + React Testing Library. A basic test asserts the role & aria-label are present.

If you need to re-enable Lottie later, re-install `lottie-react` and add a JSON animation loader component in `components/elements`.

## Contributing

1. Fork the repository
2. Create a feature branch: \`git checkout -b feature-name\`
3. Commit changes: \`git commit -am 'Add feature'\`
4. Push to branch: \`git push origin feature-name\`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.