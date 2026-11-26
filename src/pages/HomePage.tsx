import { useState } from 'react'
import { Link } from 'react-router'
import axios from 'axios'

import apiClient from '../api/client'
import { authApi } from '../api/auth'
import { useAuth } from '../hooks/useAuth'

type ConnectionStatus =
  | 'idle'
  | 'loading'
  | 'success'
  | 'error'

export default function HomePage() {
  const {
    user,
    role,
    teamId,
    status,
    sessionError,
    isAuthenticated,
    isLoading,
    isAdmin,
    isTeamMember,
    logout,
    retrySession,
  } = useAuth()

  const [connectionStatus, setConnectionStatus] =
    useState<ConnectionStatus>('idle')

  const [connectionMessage, setConnectionMessage] =
    useState(
      'Click the button to test the backend connection.',
    )

  const [sessionCheck, setSessionCheck] = useState('')

  async function checkBackendConnection() {
    setConnectionStatus('loading')
    setConnectionMessage('Connecting to the backend...')

    try {
      await apiClient.get('/health/')

      setConnectionStatus('success')
      setConnectionMessage(
        'Backend connected successfully.',
      )
    } catch (error: unknown) {
      setConnectionStatus('error')

      if (axios.isAxiosError(error) && error.response) {
        setConnectionMessage(
          `Request failed: HTTP ${error.response.status}`,
        )
      } else {
        setConnectionMessage(
          'Unable to connect. Make sure the backend is running.',
        )
      }
    }
  }

  async function verifySession() {
    setSessionCheck('Verifying session...')

    try {
      await authApi.getProfile()

      setSessionCheck('Session verified successfully.')
    } catch (error: unknown) {
      if (
        axios.isAxiosError(error) &&
        error.response?.status === 401
      ) {
        setSessionCheck('')
        return
      }

      setSessionCheck('Unable to verify session.')
    }
  }

  function handleLogout() {
    setSessionCheck('')
    logout()
  }

  return (
    <main className="app">
      <section className="welcome-card">
        <span className="project-label">
          WORKSPACE MANAGEMENT
        </span>

        <h1>Meeting Room Booking System</h1>

        <p className="description">
          Global authentication and session management.
        </p>

        <div
          className={`connection-status ${connectionStatus}`}
          role="status"
        >
          {connectionMessage}
        </div>

        <div className="actions">
          <button
            type="button"
            className="primary-button"
            disabled={connectionStatus === 'loading'}
            onClick={checkBackendConnection}
          >
            {connectionStatus === 'loading'
              ? 'Connecting...'
              : 'Test Backend Connection'}
          </button>
        </div>

        <section className="profile-section">
          <h2>Authentication Status</h2>

          {isLoading && (
            <div className="connection-status loading" role="status">
              Restoring your session...
            </div>
          )}

          {status === 'error' && (
            <>
              <div className="connection-status error" role="alert">
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
                  onClick={handleLogout}
                >
                  Clear Session
                </button>
              </div>
            </>
          )}

          {status === 'unauthenticated' && (
            <>
              <div className="connection-status" role="status">
                Not authenticated
              </div>

              {sessionError && (
                <div
                  className="connection-status error"
                  role="alert"
                >
                  {sessionError}
                </div>
              )}

              <div className="actions">
                <Link to="/login" className="primary-button">
                  Go to Login
                </Link>
              </div>
            </>
          )}

          {isAuthenticated && user && (
            <>
              <div className="connection-status success">
                Authenticated successfully
              </div>

              <dl className="profile-details">
                <div>
                  <dt>User ID</dt>
                  <dd>{user.id}</dd>
                </div>

                <div>
                  <dt>Username</dt>
                  <dd>{user.username}</dd>
                </div>

                <div>
                  <dt>Email</dt>
                  <dd>{user.email}</dd>
                </div>

                <div>
                  <dt>Full Name</dt>
                  <dd>
                    {`${user.first_name} ${user.last_name}`.trim() ||
                      'Not provided'}
                  </dd>
                </div>

                <div>
                  <dt>Role</dt>
                  <dd>{role}</dd>
                </div>

                <div>
                  <dt>Team ID</dt>
                  <dd>{teamId ?? 'Not assigned'}</dd>
                </div>

                <div>
                  <dt>Team Name</dt>
                  <dd>{user.team_name ?? 'Not assigned'}</dd>
                </div>

                <div>
                  <dt>Is Admin</dt>
                  <dd>{isAdmin ? 'Yes' : 'No'}</dd>
                </div>

                <div>
                  <dt>Is Team Member</dt>
                  <dd>{isTeamMember ? 'Yes' : 'No'}</dd>
                </div>
              </dl>

              {sessionCheck && (
                <div className="connection-status" role="status">
                  {sessionCheck}
                </div>
              )}

              <div className="actions">
                <button
                  type="button"
                  className="secondary-button"
                  onClick={verifySession}
                >
                  Verify Session
                </button>

                <button
                  type="button"
                  className="danger-button"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            </>
          )}
        </section>

        <p className="tech-stack">
          React · TypeScript · Vite · Axios · Auth Context
        </p>
      </section>
    </main>
  )
}