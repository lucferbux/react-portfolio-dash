# React Portfolio Dashboard - GitHub Copilot Instructions

**ALWAYS follow these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.**

## Overview

React Portfolio Dashboard is a modern personal portfolio application built with React 19, TypeScript, Vite, and Tailwind CSS. It features JWT authentication, internationalization (English/Spanish), role-based access control, and uses the GitHub Spark framework for enhanced development experience.

## Quick Setup & Build

**CRITICAL**: All timing estimates below include 50% safety buffer. NEVER CANCEL these commands.

### Initial Setup
```bash
# Install dependencies - takes ~60 seconds, NEVER CANCEL
npm install

# First ESLint configuration (if missing)
# The repository may be missing eslint.config.js, create it if needed:
cat > eslint.config.js << 'EOF'
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
)
EOF
```

### Development Commands
```bash
# Start development server - runs on http://localhost:5000 (NOT 5173)
npm run dev

# Build for production - takes ~15 seconds, NEVER CANCEL  
npm run build

# Preview production build - serves on http://localhost:4173
npm run preview

# Run linting - takes ~3 seconds, may show warnings/errors but doesn't prevent builds
npm run lint

# Force dependency optimization (deprecated but works)
npm run optimize

# Kill development server (if needed)
npm run kill
```

## Validation Scenarios

**ALWAYS run these complete validation scenarios after making changes:**

### 1. Basic Application Flow
1. Start development server: `npm run dev`
2. Navigate to http://localhost:5000
3. Verify homepage loads with portfolio sections
4. Test language switching (EN ⇄ ES button in top nav)
5. Test navigation between Home and Dashboard links

### 2. Authentication Flow  
1. Click "Login" button in navigation
2. Use demo credentials:
   - **Admin**: username `admin`, password `admin`
   - **User**: username `user`, password `user`  
3. Verify successful login redirects to dashboard
4. Confirm user role appears in navigation (admin users see "Admin" link)
5. Test logout functionality

### 3. Protected Routes
1. Login as admin user
2. Navigate to Admin panel (/admin)
3. Verify admin content loads (may show React errors but should function)
4. Logout and verify admin routes are no longer accessible

### 4. Build Validation
1. Run `npm run build` - NEVER CANCEL, takes ~15 seconds
2. Run `npm run preview` 
3. Test the same scenarios above on the preview build

## Known Issues & Workarounds

### ESLint Configuration
- **Issue**: Repository may be missing `eslint.config.js`
- **Solution**: Create the config file as shown in setup section
- **Impact**: Linting will fail without this file

### Linting Warnings
- **Issue**: ESLint shows 4 errors and 8 warnings in current codebase
- **Solution**: These are non-blocking - builds and app function normally
- **Common errors**: Unused variables, useless catch clauses
- **Common warnings**: React refresh component export patterns

### Admin Page React Errors  
- **Issue**: "Maximum update depth exceeded" errors in browser console on /admin page
- **Solution**: Known issue - app functions despite console errors
- **Impact**: Admin functionality works, but console shows errors

### Port Differences
- **Issue**: README mentions port 5173, actual dev server uses port 5000
- **Correction**: Always use http://localhost:5000 for development
- **Preview**: Uses port 4173 for `npm run preview`

## Project Structure & Navigation

### Key Directories
```
src/
├── api/mockData.ts          # ALL mock data for projects, about me, users
├── components/              # React components by category
│   ├── cards/              # ProjectCard, AboutMeCard components  
│   ├── elements/           # LoadingSpinner, LanguageSelector
│   ├── layout/             # Navigation, Layout components
│   ├── routes/             # PrivateRoute wrapper
│   └── ui/                 # shadcn/ui components (Button, Card, etc.)
├── context/                # React Context providers
│   ├── AuthContext.tsx    # JWT auth, user state management
│   └── ProjectContext.tsx # Project data state
├── hooks/                  # Custom React hooks
│   └── useFetchData.ts    # Generic data fetching with loading/error states
├── pages/                  # Main page components
│   ├── LandingPage.tsx    # Homepage (/)
│   ├── LoginPage.tsx      # Authentication (/login)
│   ├── DashboardPage.tsx  # User dashboard (/dashboard)
│   └── AdminPage.tsx      # Admin panel (/admin) - protected route
├── i18n.ts                # Internationalization config (EN/ES)
└── main.tsx               # App entry point with routing
```

### Frequently Modified Files
- **Mock Data**: Edit `src/api/mockData.ts` to update projects, about me, or users
- **Styling**: Global styles in `src/index.css`, component styles use Tailwind CSS
- **Authentication**: Auth logic in `src/context/AuthContext.tsx`
- **Routing**: Route definitions in `src/main.tsx`
- **i18n**: Translation keys in `src/i18n.ts`

## Tech Stack Details

### Core Framework
- **React 19** with TypeScript for type safety
- **Vite** for fast development and building
- **React Router v6** for client-side routing

### Styling & UI
- **Tailwind CSS** for utility-first styling  
- **shadcn/ui** components for consistent UI patterns
- **Phosphor Icons** for iconography
- **GitHub Spark** framework integration

### State Management
- **React Context** for global state (auth, projects)
- **Custom hooks** for reusable logic (useFetchData)
- **localStorage** for JWT token persistence

### Authentication & i18n
- **JWT tokens** with role-based access control
- **react-i18next** for English/Spanish translations
- **Browser language detection** with manual switching

## Development Best Practices

### When Adding Features
1. **Always** run the full validation scenarios after changes
2. **Use existing patterns**: Follow the useFetchData hook pattern for API calls
3. **Update mock data**: Modify `src/api/mockData.ts` for content changes
4. **Test both languages**: Verify features work in English and Spanish
5. **Check responsive design**: Test on different screen sizes

### Before Committing
1. Run `npm run lint` - fix critical errors, warnings are acceptable
2. Run `npm run build` - ensure production build succeeds
3. Test authentication flow with both admin and user roles
4. Verify no new console errors beyond known issues

### Debugging Tips
- **Authentication issues**: Check localStorage for 'token' key
- **Language problems**: Verify translations exist in `src/i18n.ts`
- **Component errors**: Most issues are in mock data or context providers
- **Build failures**: Usually TypeScript errors or missing dependencies

## Common Tasks

### Adding New Projects
Edit `src/api/mockData.ts`:
```typescript
export const mockProjects: Project[] = [
  {
    id: 'unique-id',
    title: 'Project Title',
    description: 'Project description',
    technologies: ['React', 'TypeScript'],
    githubUrl: 'https://github.com/...',
    liveUrl: 'https://...',
    featured: true,
  }
];
```

### Adding Translations
Update `src/i18n.ts`:
```typescript
const resources = {
  en: { translation: { newKey: 'English text' } },
  es: { translation: { newKey: 'Spanish text' } }
};
```

### Customizing Styles
- **Global styles**: Edit `src/index.css`
- **Component styles**: Use Tailwind classes
- **Theme colors**: Update CSS custom properties in `src/index.css`

**No test framework is configured** - add tests only if implementing new testing infrastructure.