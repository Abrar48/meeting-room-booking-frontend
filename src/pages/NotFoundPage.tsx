import { Link } from 'react-router'

export default function NotFoundPage() {
  return (
    <main className="app">
      <section className="welcome-card">
        <span className="project-label">
          ERROR 404
        </span>

        <h1>Page Not Found</h1>

        <p className="description">
          The page you are looking for does not exist.
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