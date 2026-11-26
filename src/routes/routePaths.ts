import type { UserRole } from '../types/auth'

export const ROUTES = {
  ROOT: '/',
  LOGIN: '/login',
  ADMIN_DASHBOARD: '/admin/dashboard',
  MEMBER_DASHBOARD: '/member/dashboard',
  SESSION_CHECK: '/session-check',
  FORBIDDEN: '/403',
} as const

export function getDashboardPath(
  role: UserRole | null,
): string {
  switch (role) {
    case 'ADMIN':
      return ROUTES.ADMIN_DASHBOARD

    case 'TEAM_MEMBER':
      return ROUTES.MEMBER_DASHBOARD

    default:
      return ROUTES.FORBIDDEN
  }
}