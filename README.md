# Meeting Room Booking System — Frontend

A React and TypeScript frontend for the Meeting Room Booking System.

## Technology Stack

- React
- TypeScript
- Vite
- React Router
- Axios
- React Context API
- ESLint

## Getting Started

Install dependencies:

```bash
npm install
```

Create a `.env` file using `.env.example` as a template.

```env
VITE_API_URL=/api
```

Start the Django backend at:

http://127.0.0.1:8000

Start the frontend development server:

```bash
npm run dev
```

Open:

http://localhost:5173

## API Configuration

The Axios client is configured in `src/api/client.ts`.

The API base URL is loaded from `VITE_API_URL`.

The Vite development proxy forwards `/api` requests to Django.

The request interceptor automatically attaches the JWT Bearer
authorization header to authenticated API requests.

The response interceptor handles authenticated 401 responses
by clearing the current session and notifying the AuthProvider.

## Authentication

Global authentication state is managed using React Context.

Main authentication files:

- `src/context/AuthContext.ts`
- `src/context/AuthProvider.tsx`
- `src/hooks/useAuth.ts`
- `src/api/auth.ts`
- `src/types/auth.ts`
- `src/utils/tokenStorage.ts`

The authentication context exposes:

- User profile
- User role
- Team ID
- Authentication status
- Admin and team member flags
- Login and logout methods
- Session restoration and retry

## Session Persistence

Access tokens are stored in session storage.

On page reload, the application verifies the stored access
token using GET /api/auth/me/ and restores the user profile.

A 401 response from an authenticated request automatically
clears the session.

Network errors and other HTTP errors do not automatically
invalidate an existing session.

This implementation uses auto-logout rather than token refresh
because the backend does not currently expose a refresh endpoint.

Session storage is accessible to JavaScript and does not
provide complete protection against XSS attacks.

Never commit credentials, access tokens, or environment secrets.

## Routes

- `/` — Home and authentication status
- `/login` — Login
- `*` — Page not found

## Code Quality

```bash
npm run lint
npx tsc -b
npm run build
```

## Production

Configure a production reverse proxy or appropriate CORS settings.

The hosting server must support SPA route fallback to index.html.

## Development Status

- FE-01: Frontend Project Init & API Client Setup
- FE-02: Global Auth State & Session Persistence

Role-based protected routes and dashboard interfaces will
be implemented in subsequent tasks.