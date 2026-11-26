import { createContext } from 'react'

import type {
  AuthStatus,
  LoginCredentials,
  UserProfile,
  UserRole,
} from '../types/auth'

export interface AuthContextValue {
  user: UserProfile | null

  role: UserRole | null
  teamId: number | null

  status: AuthStatus
  sessionError: string | null

  isAuthenticated: boolean
  isLoading: boolean

  isAdmin: boolean
  isTeamMember: boolean

  login: (credentials: LoginCredentials) => Promise<void>
  logout: () => void
  retrySession: () => void
}

export const AuthContext = createContext<
  AuthContextValue | undefined
>(undefined)