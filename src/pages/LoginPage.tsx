import { Link } from 'react-router'

export default function LoginPage() {
  return (
    <main className="app">
      <section className="welcome-card">
        <span className="project-label">
          AUTHENTICATION
        </span>

        <h1>Login</h1>

        <p className="description">
          The login interface will be implemented in the
          authentication task.
        </p>

        <div className="actions">
          <Link to="/" className="primary-button">
            Back to Home
          </Link>
        </div>
      </section>
    </main>
  )
}