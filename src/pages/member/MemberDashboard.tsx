import {
  CalendarDays,
  LayoutDashboard,
  LogOut,
  UserRound,
  UsersRound,
} from 'lucide-react'

import { Link } from 'react-router'

import { useAuth } from '../../hooks/useAuth'
import { ROUTES } from '../../routes/routePaths'

export default function MemberDashboard() {
  const {
    user,
    role,
    teamId,
    logout,
  } = useAuth()

  const fullName =
    `${user?.first_name ?? ''} ${user?.last_name ?? ''}`.trim()

  return (
    <main className="app">
      <section className="welcome-card route-dashboard">
        <div className="route-dashboard-header">
          <div className="route-dashboard-brand">
            <div className="route-brand-icon">
              <CalendarDays
                size={24}
                aria-hidden="true"
              />
            </div>

            <div>
              <strong>Meeting Room</strong>
              <span>Booking System</span>
            </div>
          </div>

          <span className="route-role-badge">
            <UsersRound
              size={16}
              aria-hidden="true"
            />
            TEAM MEMBER
          </span>
        </div>

        <div className="route-dashboard-body">
          <div className="route-state-icon">
            <LayoutDashboard
              size={32}
              aria-hidden="true"
            />
          </div>

          <span className="project-label">
            TEAM WORKSPACE
          </span>

          <h1>Team Member Dashboard</h1>

          <p className="description">
            Welcome, {fullName || user?.username}.
          </p>

          <div className="connection-status success">
            Team member access granted.
          </div>

          <dl className="profile-details">
            <div>
              <dt>Username</dt>
              <dd>{user?.username}</dd>
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
              <dd>{user?.team_name ?? 'Not assigned'}</dd>
            </div>

            <div>
              <dt>Email</dt>
              <dd>{user?.email || 'Not provided'}</dd>
            </div>
          </dl>

          <div className="route-development-note">
            Your workspace is ready. Meeting schedules,
            booking requests, and team booking management
            will be available in subsequent tasks.
          </div>

          <div className="actions">
            <Link
              to={ROUTES.SESSION_CHECK}
              className="secondary-button"
            >
              <UserRound
                size={17}
                aria-hidden="true"
              />
              Session Details
            </Link>

            <button
              type="button"
              className="danger-button"
              onClick={logout}
            >
              <LogOut
                size={17}
                aria-hidden="true"
              />
              Logout
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}