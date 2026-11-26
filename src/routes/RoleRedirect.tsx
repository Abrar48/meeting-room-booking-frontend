import { Navigate } from 'react-router'

import { useAuth } from '../hooks/useAuth'
import SessionState from '../components/auth/SessionState'

import {
  getDashboardPath,
  ROUTES,
} from './routePaths'

export default function RoleRedirect() {
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

  return (
    <Navigate
      to={getDashboardPath(role)}
      replace
    />
  )
}