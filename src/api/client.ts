import axios from 'axios'
import { env } from '../config/env'
import { tokenStorage } from '../utils/tokenStorage'

const apiClient = axios.create({
  baseURL: env.apiUrl,
  timeout: 15000,

  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.request.use((config) => {
  const token = tokenStorage.getAccessToken()

  const baseUrl = new URL(
    config.baseURL ?? env.apiUrl,
    window.location.origin,
  )

  const requestUrl = new URL(
    config.url ?? '',
    `${baseUrl.href.replace(/\/+$/, '')}/`,
  )

  if (requestUrl.origin !== baseUrl.origin) {
    throw new Error('External API requests are not allowed.')
  }

  if (token) {
    config.headers.set('Authorization', `Bearer ${token}`)
  }

  return config
})

export default apiClient