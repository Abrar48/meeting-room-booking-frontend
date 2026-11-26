import axios from 'axios'
import { env } from '../config/env'
import {
  AUTH_UNAUTHORIZED_EVENT,
  tokenStorage,
} from '../utils/tokenStorage'

const apiClient = axios.create({
  baseURL: env.apiUrl,
  timeout: 15000,

  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.request.use((config) => {
  const baseUrl = new URL(
    `${env.apiUrl.replace(/\/+$/, '')}/`,
    window.location.origin,
  )

  const requestUrl = new URL(
    apiClient.getUri(config),
    window.location.origin,
  )

  if (
    requestUrl.origin !== baseUrl.origin ||
    !requestUrl.pathname.startsWith(baseUrl.pathname)
  ) {
    throw new Error('External API requests are not allowed.')
  }

  const loginPath = new URL('auth/login/', baseUrl).pathname
  const isLoginRequest = requestUrl.pathname === loginPath

  const token = tokenStorage.getAccessToken()

  config.headers.delete('Authorization')

  if (token && !isLoginRequest) {
    config.headers.set('Authorization', `Bearer ${token}`)
  }

  return config
})

apiClient.interceptors.response.use(
  (response) => response,

  (error: unknown) => {
    if (axios.isAxiosError(error)) {
      const token = tokenStorage.getAccessToken()

      const requestAuthorization =
        error.config?.headers.get('Authorization')

      const isCurrentSession =
        token && requestAuthorization === `Bearer ${token}`

      if (
        error.response?.status === 401 &&
        isCurrentSession
      ) {
        tokenStorage.clearTokens()

        window.dispatchEvent(
          new Event(AUTH_UNAUTHORIZED_EVENT),
        )
      }
    }

    return Promise.reject(error)
  },
)

export default apiClient