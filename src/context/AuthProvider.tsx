import {
  useEffect,
  useRef,
  useState,
} from 'react'

import type { ReactNode } from 'react'

import axios from 'axios'
import { AuthContext } from './AuthContext'
import { authApi } from '../api/auth'

import {
  AUTH_UNAUTHORIZED_EVENT,
  tokenStorage,
} from '../utils/tokenStorage'

import type {
  AuthStatus,
  LoginCredentials,
  UserProfile,
} from '../types/auth'

interface AuthProviderProps {
  children: ReactNode
}

export default function AuthProvider({
  children,
}: AuthProviderProps) {
  const [user, setUser] = useState<UserProfile | null>(null)

  const [status, setStatus] = useState<AuthStatus>(() =>
    tokenStorage.getAccessToken()
      ? 'loading'
      : 'unauthenticated',
  )

  const [sessionError, setSessionError] = useState<
    string | null
  >(null)

  const [restoreAttempt, setRestoreAttempt] = useState(0)

  const sessionVersion = useRef(0)

  useEffect(() => {
    function handleUnauthorized() {
      sessionVersion.current += 1

      setUser(null)
      setStatus('unauthenticated')
      setSessionError(
        'Your session is invalid or has expired. Please log in again.',
      )
    }

    window.addEventListener(
      AUTH_UNAUTHORIZED_EVENT,
      handleUnauthorized,
    )

    return () => {
      window.removeEventListener(
        AUTH_UNAUTHORIZED_EVENT,
        handleUnauthorized,
      )
    }
  }, [])

  useEffect(() => {
    const token = tokenStorage.getAccessToken()

    if (!token) {
      return
    }

    const controller = new AbortController()
    const version = sessionVersion.current

    function isCurrentSession() {
      return (
        !controller.signal.aborted &&
        sessionVersion.current === version &&
        tokenStorage.getAccessToken() === token
      )
    }

    async function restoreSession() {
      try {
        const profile = await authApi.getProfile(
          controller.signal,
        )

        if (!isCurrentSession()) {
          return
        }

        setUser(profile)
        setStatus('authenticated')
        setSessionError(null)
      } catch (error: unknown) {
        if (!isCurrentSession() || axios.isCancel(error)) {
          return
        }

        if (
          axios.isAxiosError(error) &&
          error.response?.status === 401
        ) {
          tokenStorage.clearTokens()

          setUser(null)
          setStatus('unauthenticated')
          setSessionError(
            'Your session has expired. Please log in again.',
          )

          return
        }

        setUser(null)
        setStatus('error')
        setSessionError(
          'Unable to verify your session. Please try again.',
        )
      }
    }

    void restoreSession()

    return () => {
      controller.abort()
    }
  }, [restoreAttempt])

  async function login(
    credentials: LoginCredentials,
  ): Promise<void> {
    const version = ++sessionVersion.current

    tokenStorage.clearTokens()

    setUser(null)
    setStatus('unauthenticated')
    setSessionError(null)

    const data = await authApi.login(credentials)

    if (sessionVersion.current !== version) {
      return
    }

    tokenStorage.setAccessToken(data.access_token)

    setUser(data.user)
    setStatus('authenticated')
    setSessionError(null)
  }

  function logout(): void {
    sessionVersion.current += 1

    tokenStorage.clearTokens()

    setUser(null)
    setStatus('unauthenticated')
    setSessionError(null)
  }

  function retrySession(): void {
    if (!tokenStorage.getAccessToken()) {
      logout()
      return
    }

    setStatus('loading')
    setSessionError(null)

    setRestoreAttempt((previous) => previous + 1)
  }

  const isAuthenticated =
    status === 'authenticated' && user !== null

  return (
    <AuthContext.Provider
      value={{
        user,

        role: user?.role ?? null,
        teamId: user?.team_id ?? null,

        status,
        sessionError,

        isAuthenticated,
        isLoading: status === 'loading',

        isAdmin:
          isAuthenticated && user?.role === 'ADMIN',

        isTeamMember:
          isAuthenticated &&
          user?.role === 'TEAM_MEMBER',

        login,
        logout,
        retrySession,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}