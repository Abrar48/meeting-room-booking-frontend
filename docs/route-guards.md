# Dual-Panel Route Guards

## Overview

The application uses strict route boundaries for ADMIN
and TEAM_MEMBER users.

Authentication state is managed through the existing
Auth Context and AuthProvider.

## Route Guard Components

### ProtectedRoute

- Requires an authenticated user.
- Redirects unauthenticated users to /login.
- Handles session restoration and verification errors.

### RequireAdmin

- Allows only ADMIN users.
- Protects the entire /admin route namespace.
- Redirects unauthorized roles to /403.
- Reuses the existing RoleRoute component.

### RequireTeamMember

- Allows only TEAM_MEMBER users.
- Protects the entire /member route namespace.
- Redirects unauthorized roles to /403.
- Reuses the existing RoleRoute component.

## Access Matrix

| Route | Guest | ADMIN | TEAM_MEMBER |
|---|---|---|---|
| /login | Allowed | Admin dashboard | Member dashboard |
| /admin/dashboard | Login | Allowed | Forbidden |
| /admin/* | Login | Registered routes | Forbidden |
| /member/dashboard | Login | Forbidden | Allowed |
| /member/* | Login | Forbidden | Registered routes |
| /session-check | Login | Allowed | Allowed |
| /403 | Login | Allowed | Allowed |

Unregistered routes inside an authorized panel display
the Not Found page.

Unauthorized users are blocked by the panel guard
before the nested page is rendered.

## Session Handling

- Session persistence is maintained after page refresh.
- Invalid authenticated requests returning 401 trigger
  automatic logout.
- Protected routes redirect logged-out users to /login.
- Role-based access denial does not clear the session.

## Security

Frontend route guards provide UI-level access control.

Backend authentication, role-based permissions and
team ownership validation remain authoritative.

## Theme

The existing charcoal and magenta application theme
is preserved.

## Validation

```bash
npm run lint
npx tsc -b
npm run build
```