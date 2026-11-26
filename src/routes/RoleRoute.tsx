import { Navigate, Outlet } from 'react-router'

import { useAuth } from '../hooks/useAuth'
import SessionState from '../components/auth/SessionState'

import type { UserRole } from '../types/auth'

import { ROUTES } from './routePaths'

interface RoleRouteProps {
  allowedRoles: readonly UserRole[]
}

export default function RoleRoute({
  allowedRoles,
}: RoleRouteProps) {
  const {
    role,
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

  if (!role || !allowedRoles.includes(role)) {
    return (
      <Navigate
        to={ROUTES.FORBIDDEN}
        replace
      />
    )
  }

  return <Outlet />
}