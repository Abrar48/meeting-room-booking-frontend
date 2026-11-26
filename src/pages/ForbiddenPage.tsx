import {
  ArrowLeft,
  LogOut,
  ShieldAlert,
} from 'lucide-react'

import { Link } from 'react-router'

import { useAuth } from '../hooks/useAuth'

import {
  getDashboardPath,
  ROUTES,
} from '../routes/routePaths'

export default function ForbiddenPage() {
  const {
    role,
    logout,
  } = useAuth()

  const dashboardPath = getDashboardPath(role)

  return (
    <main className="app">
      <section className="welcome-card route-state-card">
        <div className="route-state-icon route-error-icon">
          <ShieldAlert
            size={36}
            aria-hidden="true"
          />
        </div>

        <span className="project-label">
          ACCESS CONTROL
        </span>

        <div className="route-error-code">
          403
        </div>

        <h1>Access Forbidden</h1>

        <p className="description">
          You do not have permission to access this page.
          Please return to your authorized workspace.
        </p>

        <div className="route-development-note">
          Your current role: {role ?? 'Unknown'}
        </div>

        <div className="actions">
          {dashboardPath !== ROUTES.FORBIDDEN && (
            <Link
              to={dashboardPath}
              className="primary-button"
            >
              <ArrowLeft
                size={17}
                aria-hidden="true"
              />
              Back to Dashboard
            </Link>
          )}

          <button
            type="button"
            className="secondary-button"
            onClick={logout}
          >
            <LogOut
              size={17}
              aria-hidden="true"
            />
            Logout
          </button>
        </div>
      </section>
    </main>
  )
}