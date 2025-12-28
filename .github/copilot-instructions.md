# TrustMess Frontend - AI Coding Agent Instructions

## Project Overview
React SPA for real-time messaging built with Vite. SCSS styling with seasonal components. WebSocket integration for live chat.

## Architecture

### Core Stack
- **React 19** with JSX
- **Vite** - build tool, HMR, dev server
- **React Router** - client-side routing
- **SCSS** - modular stylesheets with variables/mixins

### Key Components
- **Contexts** ([src/contexts/](../src/contexts/))
  - `AuthContext` - JWT token management, login/logout state
  - `ThemeContext` - light/dark mode switching
  - `WebSocketContext` - WebSocket connection lifecycle, message handling
- **Pages** ([src/pages/](../src/pages/))
  - `WelcomePage`, `LogInPage`, `SignUpPage`, `MessengerPage`
  - `_DevPage` - development utilities (prefix `_` for dev-only)
- **Components** ([src/components/](../src/components/))
  - `ProtectedRoute` - auth guard wrapper
  - `MessegesWindow` - real-time chat interface
  - `ContactCard`, `AccountSettings`, `SettingModal`
  - `seasonal/Snow.jsx` - seasonal decorations

### API Communication
- Centralized in [src/api/requests.js](../src/api/requests.js)
- Base URL from [src/config/apiConfig.js](../src/config/apiConfig.js)
- WebSocket URL: `ws://localhost:8000/ws/{user_id}?token={jwt_token}`

## Key Patterns

### Context-Based State
```jsx
// Authentication throughout app
const { user, login, logout } = useAuth();
const { sendMessage, messages } = useWebSocket();
```

### Protected Routes
```jsx
<Route path="/messenger" element={
  <ProtectedRoute>
    <MessengerPage />
  </ProtectedRoute>
} />
```

### Component Exports
- All components exported via index files ([src/components/index.js](../src/components/index.js), [src/pages/index.js](../src/pages/index.js))
- Import pattern: `import { LogInPage, MessengerPage } from './pages'`

### SCSS Organization
- Variables in [src/scss/_variables.scss](../src/scss/_variables.scss) - colors, fonts, breakpoints
- Mixins in [src/scss/_mixins.scss](../src/scss/_mixins.scss) - responsive, flex utilities
- Reset in [src/scss/_reset_all_styles.scss](../src/scss/_reset_all_styles.scss)
- Component styles in `src/scss/_components/`, page styles in `src/scss/_pages/`
- Main import: [src/scss/style.scss](../src/scss/style.scss)

## Developer Workflows

### Running Dev Server
```bash
npm run dev      # Vite dev server on http://localhost:5173
npm run build    # Production build to dist/
npm run preview  # Preview production build
```

### Testing
```bash
npm test         # Run tests (see tests/requests.test.js)
```

## Project Conventions

### File Naming
- Components: PascalCase (`ContactCard.jsx`)
- Utilities: camelCase (`apiConfig.js`)
- Dev-only: prefix with `_` (`_DevPage.jsx`)

### Code Style
- Ukrainian comments/documentation required (per base_instruction.instructions.md)
- Never modify code without explicit user instruction
- Follow Ukrainian language in all communications

### Build Configuration
- Custom plugins in [conf/](../conf/):
  - `assetFileNamer.js` - consistent asset naming
  - `chunkSplitter.js` - code splitting strategy
- Vite config: [vite.config.js](../vite.config.js)

## External Integration
- **Backend API**: Separate repository, expects JWT in headers
- **WebSocket**: Token-based authentication, auto-reconnect logic
- **Nginx**: Production config in [nginx.conf](../nginx.conf)
- **Docker**: Containerized deployment via [Dockerfile](../Dockerfile)

## Dependencies
- React, React Router, React DOM
- Vite, @vitejs plugins
- SASS for styling
- See [package.json](../package.json) for full list

## Seasonal Features
- Snow effect in [src/components/seasonal/Snow.jsx](../src/components/seasonal/Snow.jsx)
- Styles in [src/scss/_components/seasonal/_snow.scss](../src/scss/_components/seasonal/_snow.scss)
- Toggle based on date/user preference
