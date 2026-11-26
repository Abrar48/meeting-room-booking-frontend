import { Navigate, Outlet } from 'react-router'

import { useAuth } from '../hooks/useAuth'
import SessionState from '../components/auth/SessionState'
import { ROUTES } from './routePaths'

export default function ProtectedRoute() {
  const {
    isAuthenticated,
    isLoading,
    status,
  } = useAuth()

  if (isLoading || status === 'error') {
    return <SessionState />
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to={ROUTES.LOGIN}
        replace
      />
    )
  }

  return <Outlet />
}