import { Navigate, Outlet } from 'react-router'

import { useAuth } from '../hooks/useAuth'
import SessionState from '../components/auth/SessionState'
import { getDashboardPath } from './routePaths'

export default function GuestRoute() {
  const {
    role,
    isAuthenticated,
    isLoading,
    status,
  } = useAuth()

  if (isLoading || status === 'error') {
    return <SessionState />
  }

  if (isAuthenticated) {
    return (
      <Navigate
        to={getDashboardPath(role)}
        replace
      />
    )
  }

  return <Outlet />
}