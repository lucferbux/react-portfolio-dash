# Personal Portfolio Dashboard PRD

A modern, secure personal portfolio application with JWT authentication, internationalization, and reusable React hooks for future extensibility.

**Experience Qualities**: 
1. Professional - Clean, modern interface that showcases technical expertise
2. Secure - Robust JWT authentication with protected routes and proper token management
3. Accessible - Multilingual support (EN/ES) with intuitive navigation patterns

**Complexity Level**: Complex Application (advanced functionality, accounts)
- Features JWT authentication, internationalization, protected routes, and extensible architecture for future enhancements like SSR and theming.

## Essential Features

**Authentication System**
- Functionality: JWT-based login/logout with token persistence and expiry handling
- Purpose: Secure access to admin areas and personalized content
- Trigger: Login form submission or automatic token validation on app load
- Progression: Login form → Credential validation → Token storage → Dashboard redirect → Protected route access
- Success criteria: Users can login, access protected routes, and remain authenticated across sessions

**Internationalization (i18n)**
- Functionality: Dynamic language switching between English and Spanish
- Purpose: Broader accessibility and professional presentation for international audience
- Trigger: Language selector interaction or browser locale detection
- Progression: Language selection → Content translation → UI update → Preference persistence
- Success criteria: All text content translates correctly and language preference persists

**Portfolio Content Management**
- Functionality: Display About Me section and Projects with detailed information
- Purpose: Showcase professional background, skills, and work samples
- Trigger: Navigation to respective sections or dashboard load
- Progression: Route navigation → Data fetch → Content rendering → Interactive elements
- Success criteria: Content loads efficiently with proper loading states and error handling

**Admin Dashboard**
- Functionality: Protected administrative interface for content management
- Purpose: Secure area for portfolio updates and administrative tasks
- Trigger: Authenticated user accessing /admin route
- Progression: Route access → Authentication check → Admin interface load → Content management tools
- Success criteria: Only authenticated users can access admin features

**Reusable Data Fetching**
- Functionality: Generic useFetchData hook with loading, error, and reload states
- Purpose: Consistent data fetching pattern across components with proper state management
- Trigger: Component mount or manual data refresh
- Progression: Hook invocation → Loading state → API call → Success/error handling → UI update
- Success criteria: All data operations show appropriate loading/error states with retry capability

## Edge Case Handling

- **Token Expiry**: Automatic logout and redirect to login when JWT expires
- **Network Failures**: Graceful error messages with retry options for failed requests
- **Invalid Routes**: 404 handling with navigation back to valid sections
- **Language Fallbacks**: Default to English if translation missing or browser locale unsupported
- **Empty States**: Meaningful messages when no projects or content available
- **Concurrent Auth**: Handle multiple tab scenarios with consistent auth state

## Design Direction

The design should feel professional, clean, and modern with subtle animations that enhance rather than distract from the content, using a minimal interface that emphasizes content hierarchy and user focus.

## Color Selection

Complementary (opposite colors) - Using a sophisticated blue-orange pairing to convey professionalism with warm accents for call-to-action elements.

- **Primary Color**: Deep Professional Blue (oklch(0.45 0.15 250)) - Conveys trust, stability, and technical expertise
- **Secondary Colors**: Neutral grays (oklch(0.95 0 0) to oklch(0.25 0 0)) for backgrounds and subtle elements
- **Accent Color**: Warm Orange (oklch(0.65 0.15 50)) - Attention-grabbing highlight for CTAs, active states, and important elements
- **Foreground/Background Pairings**: 
  - Background Light (oklch(0.98 0 0)): Dark Gray text (oklch(0.25 0 0)) - Ratio 11.2:1 ✓
  - Primary Blue (oklch(0.45 0.15 250)): White text (oklch(1 0 0)) - Ratio 6.8:1 ✓
  - Secondary Light (oklch(0.95 0 0)): Dark Gray text (oklch(0.25 0 0)) - Ratio 10.1:1 ✓
  - Accent Orange (oklch(0.65 0.15 50)): White text (oklch(1 0 0)) - Ratio 4.9:1 ✓

## Font Selection

Typography should convey professionalism and technical precision while maintaining excellent readability across devices, using Inter for its modern, clean aesthetic perfect for digital interfaces.

- **Typographic Hierarchy**: 
  - H1 (Page Titles): Inter Bold/32px/tight letter spacing
  - H2 (Section Headers): Inter SemiBold/24px/normal spacing  
  - H3 (Subsections): Inter Medium/20px/normal spacing
  - Body Text: Inter Regular/16px/relaxed line height
  - Code/Technical: Inter Regular/14px/monospace fallback

## Animations

Subtle, purposeful animations that provide feedback and guide user attention without overwhelming the professional aesthetic, focusing on micro-interactions that enhance usability.

- **Purposeful Meaning**: Smooth transitions communicate state changes and provide visual feedback for user actions
- **Hierarchy of Movement**: Page transitions and authentication flows receive priority animation treatment, followed by hover states and form interactions

## Component Selection

- **Components**: Button, Card, Input, Dialog for authentication, Tabs for content sections, Badge for skills/technologies, Alert for error states
- **Customizations**: Custom LoadingSpinner component, LanguageSelector component, ProjectCard with hover animations
- **States**: All interactive elements include hover, focus, active, and disabled states with consistent visual feedback
- **Icon Selection**: Phosphor icons for navigation (House, User, Briefcase), authentication (SignIn, SignOut), and language switching (Globe)
- **Spacing**: Consistent 4px grid system using Tailwind's spacing scale (p-4, m-6, gap-8)
- **Mobile**: Mobile-first responsive design with collapsible navigation, touch-friendly targets, and optimized content layout for smaller screens