import { useState } from 'react'

import {
  Link,
  Navigate,
} from 'react-router'

import { useForm } from 'react-hook-form'
import type { SubmitHandler } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Eye,
  EyeOff,
  Loader2,
  LockKeyhole,
  ShieldCheck,
  UserRound,
} from 'lucide-react'

import { useAuth } from '../hooks/useAuth'
import { getAuthErrorMessage } from '../api/auth'

import { loginSchema } from '../schemas/loginSchema'
import type { LoginFormValues } from '../schemas/loginSchema'

import './LoginPage.css'

const features = [
  'Effortless room scheduling',
  'Centralized booking management',
  'Secure team collaboration',
]

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

  const [showPassword, setShowPassword] = useState(false)

  const [dismissedSessionError, setDismissedSessionError] =
    useState<string | null>(null)


  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    resetField,

    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),

    defaultValues: {
      username: '',
      password: '',
    },

    mode: 'onSubmit',
    reValidateMode: 'onChange',
  })

  const usernameField = register('username')
  const passwordField = register('password')

  const activeSessionError =
    sessionError !== dismissedSessionError
      ? sessionError
      : null

  const errorMessage =
    errors.root?.server?.message || activeSessionError

  function clearLoginFeedback() {
    clearErrors('root.server')
    setDismissedSessionError(sessionError)
  }

  const onSubmit: SubmitHandler<LoginFormValues> = async (
  credentials,
) => {
  clearLoginFeedback()
  setShowPassword(false)

  try {
    await login(credentials)
  } catch (error: unknown) {
    resetField('password')

    setError('root.server', {
      type: 'server',
      message: getAuthErrorMessage(
        error,
        'Unable to sign in. Please try again.',
      ),
    })
  }
}
  if (isLoading) {
    return (
      <main className="app">
        <section className="welcome-card">
          <Loader2
            className="login-spinner session-spinner"
            size={36}
            aria-hidden="true"
          />

          <h1>Restoring Session</h1>

          <p className="description" role="status">
            Verifying your existing session...
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

          <div
            className="connection-status error"
            role="alert"
          >
            {sessionError}
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

  return (
    <main className="login-layout">
      <aside className="login-brand-panel">
        <div className="login-brand">
          <div className="login-brand-icon">
            <CalendarDays
              size={26}
              aria-hidden="true"
            />
          </div>

          <div>
            <span className="login-brand-name">
              Meeting Room
            </span>

            <span className="login-brand-caption">
              Booking System
            </span>
          </div>
        </div>

        <div className="login-brand-content">
          <span className="login-brand-eyebrow">
            WORKSPACE MANAGEMENT
          </span>

          <h2>Better meetings start here.</h2>

          <p>
            Schedule meetings, manage bookings, and
            organize your workspace with confidence.
          </p>

          <ul className="login-features">
            {features.map((feature) => (
              <li key={feature}>
                <CheckCircle2
                  size={20}
                  aria-hidden="true"
                />

                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="login-brand-footer">
          Meeting Room Booking System
        </p>
      </aside>

      <section className="login-main-panel">
        <div className="login-form-container">
          <Link
            to="/"
            className="login-back-link"
          >
            <ArrowLeft
              size={17}
              aria-hidden="true"
            />

            Back to home
          </Link>

          <header className="login-heading">
            <span className="login-eyebrow">
              ACCOUNT ACCESS
            </span>

            <h1>Welcome back</h1>

            <p>
              Sign in to access your workspace.
            </p>
          </header>

          {errorMessage && (
            <div
              className="login-error-banner"
              role="alert"
            >
              <AlertCircle
                size={21}
                aria-hidden="true"
              />

              <div>
                <strong>Unable to sign in</strong>

                <p>{errorMessage}</p>
              </div>
            </div>
          )}

          <form
            className="login-form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            aria-busy={isSubmitting}
          >
            <div className="login-form-group">
              <label htmlFor="username">
                Username
              </label>

              <div
                className={
                  errors.username
                    ? 'login-input-wrapper has-error'
                    : 'login-input-wrapper'
                }
              >
                <UserRound
                  className="login-input-icon"
                  size={19}
                  aria-hidden="true"
                />

                <input
                  {...usernameField}
                  id="username"
                  type="text"
                  autoComplete="username"
                  autoCapitalize="none"
                  spellCheck={false}
                  placeholder="Enter your username"
                  readOnly={isSubmitting}
                  required
                  aria-invalid={Boolean(errors.username)}
                  aria-describedby={
                    errors.username
                      ? 'username-error'
                      : undefined
                  }
                  onChange={(event) => {
                    clearLoginFeedback()
                    void usernameField.onChange(event)
                  }}
                />
              </div>

              {errors.username && (
                <p
                  id="username-error"
                  className="login-field-error"
                  role="alert"
                >
                  {errors.username.message}
                </p>
              )}
            </div>

            <div className="login-form-group">
              <label htmlFor="password">
                Password
              </label>

              <div
                className={
                  errors.password
                    ? 'login-input-wrapper has-error'
                    : 'login-input-wrapper'
                }
              >
                <LockKeyhole
                  className="login-input-icon"
                  size={19}
                  aria-hidden="true"
                />

                <input
                  {...passwordField}
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  readOnly={isSubmitting}
                  required
                  aria-invalid={Boolean(errors.password)}
                  aria-describedby={
                    errors.password
                      ? 'password-error'
                      : undefined
                  }
                  onChange={(event) => {
                    clearLoginFeedback()
                    void passwordField.onChange(event)
                  }}
                />

                <button
                  type="button"
                  className="login-password-toggle"
                  aria-label={
                    showPassword
                      ? 'Hide password'
                      : 'Show password'
                  }
                  disabled={isSubmitting}
                  onClick={() =>
                    setShowPassword((previous) => !previous)
                  }
                >
                  {showPassword ? (
                    <EyeOff
                      size={19}
                      aria-hidden="true"
                    />
                  ) : (
                    <Eye
                      size={19}
                      aria-hidden="true"
                    />
                  )}
                </button>
              </div>

              {errors.password && (
                <p
                  id="password-error"
                  className="login-field-error"
                  role="alert"
                >
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="login-submit-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2
                    className="login-spinner"
                    size={20}
                    aria-hidden="true"
                  />

                  Signing in...
                </>
              ) : (
                <>
                  Sign in

                  <ArrowRight
                    size={19}
                    aria-hidden="true"
                  />
                </>
              )}
            </button>

            {isSubmitting && (
              <span
                className="login-sr-only"
                role="status"
              >
                Signing in. Please wait.
              </span>
            )}
          </form>

          <div className="login-security-note">
            <ShieldCheck
              size={18}
              aria-hidden="true"
            />

            <span>Secure account access</span>
          </div>

          <p className="login-help-text">
            Need help accessing your account?
            <br />
            Please contact your administrator.
          </p>
        </div>
      </section>
    </main>
  )
}