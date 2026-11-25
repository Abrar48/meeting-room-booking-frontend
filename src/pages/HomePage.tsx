import { useState } from 'react'
import { Link } from 'react-router'
import axios from 'axios'
import apiClient from '../api/client'

type ConnectionStatus = 'idle' | 'loading' | 'success' | 'error'

export default function HomePage() {
  const [status, setStatus] = useState<ConnectionStatus>('idle')
  const [message, setMessage] = useState(
    'Click the button to test the backend connection.',
  )

  async function checkBackendConnection() {
    setStatus('loading')
    setMessage('Connecting to the backend...')

    try {
      await apiClient.get('/health/')

      setStatus('success')
      setMessage('Backend connected successfully.')
    } catch (error: unknown) {
      setStatus('error')

      if (axios.isAxiosError(error) && error.response) {
        setMessage(`Request failed: HTTP ${error.response.status}`)
      } else {
        setMessage('Unable to connect. Make sure the backend is running.')
      }
    }
  }

  return (
    <main className="app">
      <section className="welcome-card">
        <span className="project-label">
          WORKSPACE MANAGEMENT
        </span>

        <h1>Meeting Room Booking System</h1>

        <p className="description">
          Frontend routing and API client configuration.
        </p>

        <div className={`connection-status ${status}`} role="status">
          {message}
        </div>

        <div className="actions">
          <button
            type="button"
            className="primary-button"
            disabled={status === 'loading'}
            onClick={checkBackendConnection}
          >
            {status === 'loading'
              ? 'Connecting...'
              : 'Test Backend Connection'}
          </button>

          <Link to="/login" className="secondary-button">
            Go to Login
          </Link>
        </div>

        <p className="tech-stack">
          React · TypeScript · Vite · Axios
        </p>
      </section>
    </main>
  )
}