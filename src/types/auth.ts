export type UserRole = 'ADMIN' | 'TEAM_MEMBER'

export interface UserProfile {
  id: number
  username: string
  email: string
  first_name: string
  last_name: string
  role: UserRole
  team_id: number | null
  team_name: string | null
}

export interface LoginCredentials {
  username: string
  password: string
}

export interface LoginData {
  access_token: string
  refresh_token: string
  user: UserProfile
}

export interface ProfileData {
  user: UserProfile
  verified_team_id: number | null
}

export interface ApiResponse<T> {
  status: 'success' | 'error'
  data: T
  message: string
}

export type AuthStatus =
  | 'loading'
  | 'authenticated'
  | 'unauthenticated'
  | 'error'