# Meeting Room Booking System — Frontend

A React and TypeScript frontend for the Meeting Room Booking System.

## Technology Stack

- React
- TypeScript
- Vite
- React Router
- Axios
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

The development proxy forwards `/api` requests to the Django backend.

When an access token exists in session storage, the Axios request
interceptor automatically injects the JWT Bearer authorization header.

Never commit credentials, JWT tokens, or environment secrets.

## Routes

- `/` — Home and backend connectivity check
- `/login` — Login placeholder
- `*` — Page not found

## Code Quality

```bash
npm run lint
npx tsc -b
npm run build
```

## Production

Configure a production reverse proxy or appropriate backend CORS settings.

The hosting server must support SPA route fallback to `index.html`.

## Development Status

FE-01: Frontend Project Initialization and API Client Setup.

Full authentication, protected routes, and dashboard functionality
will be implemented in subsequent tasks.