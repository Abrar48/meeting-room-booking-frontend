import { useState } from 'react'
import type { FormEvent } from 'react'

import {
  Link,
  Navigate,
} from 'react-router'

import { useAuth } from '../hooks/useAuth'
import { getAuthErrorMessage } from '../api/auth'

export default function LoginPage() {
  const {
    login,
    logout,
    retrySession,
    isAuthenticated,
    isLoading,
    status,
    sessionError,
  } = useAuth()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault()

    if (isSubmitting) {
      return
    }

    setErrorMessage('')
    setIsSubmitting(true)

    try {
      await login({
        username: username.trim(),
        password,
      })

      setPassword('')
    } catch (error: unknown) {
      setErrorMessage(
        getAuthErrorMessage(
          error,
          'Unable to log in. Please try again.',
        ),
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <main className="app">
        <section className="welcome-card">
          <h1>Restoring Session</h1>

          <p className="description" role="status">
            Please wait while your session is verified.
          </p>
        </section>
      </main>
    )
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />
  }

  if (status === 'error') {
    return (
      <main className="app">
        <section className="welcome-card">
          <h1>Session Verification Failed</h1>

          <div className="connection-status error" role="alert">
            {sessionError}
          </div>

          <div className="actions">
            <button
              type="button"
              className="primary-button"
              onClick={retrySession}
            >
              Retry
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

  return (
    <main className="app">
      <section className="welcome-card auth-card">
        <span className="project-label">
          AUTHENTICATION
        </span>

        <h1>Welcome Back</h1>

        <p className="description">
          Sign in to your meeting room booking account.
        </p>

        {(errorMessage || sessionError) && (
          <div className="connection-status error" role="alert">
            {errorMessage || sessionError}
          </div>
        )}

        <form
          className="auth-form"
          onSubmit={handleSubmit}
        >
          <div className="form-group">
            <label htmlFor="username">Username</label>

            <input
              id="username"
              type="text"
              autoComplete="username"
              placeholder="Enter your username"
              value={username}
              disabled={isSubmitting}
              onChange={(event) =>
                setUsername(event.target.value)
              }
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>

            <input
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder="Enter your password"
              value={password}
              disabled={isSubmitting}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              required
            />
          </div>

          <button
            type="submit"
            className="primary-button full-width"
            disabled={isSubmitting || !username.trim()}
          >
            {isSubmitting ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="actions">
          <Link to="/" className="secondary-button">
            Back to Home
          </Link>
        </div>
      </section>
    </main>
  )
}