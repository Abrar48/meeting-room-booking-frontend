import {
  AlertCircle,
  Loader2,
  ShieldCheck,
} from 'lucide-react'

import { useAuth } from '../../hooks/useAuth'

export default function SessionState() {
  const {
    isLoading,
    sessionError,
    retrySession,
    logout,
  } = useAuth()

  if (isLoading) {
    return (
      <main className="app">
        <section
          className="welcome-card route-state-card"
          aria-busy="true"
        >
          <div className="route-state-icon">
            <Loader2
              size={32}
              className="route-spinner"
              aria-hidden="true"
            />
          </div>

          <h1>Restoring Session</h1>

          <p className="description" role="status">
            Verifying your account and access permissions...
          </p>

          <div className="route-security-note">
            <ShieldCheck size={17} aria-hidden="true" />
            Secure session verification
          </div>
        </section>
      </main>
    )
  }

  return (
    <main className="app">
      <section className="welcome-card route-state-card">
        <div className="route-state-icon route-error-icon">
          <AlertCircle size={32} aria-hidden="true" />
        </div>

        <h1>Session Verification Failed</h1>

        <div
          className="connection-status error"
          role="alert"
        >
          {sessionError ||
            'Unable to verify your session. Please try again.'}
        </div>

        <div className="actions">
          <button
            type="button"
            className="primary-button"
            onClick={retrySession}
          >
            Retry Session
          </button>

          <button
            type="button"
            className="secondary-button"
            onClick={logout}
          >
            Clear Session
          </button>
        </div>
      </section>
    </main>
  )
}