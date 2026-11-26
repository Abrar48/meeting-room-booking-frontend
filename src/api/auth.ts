import axios from 'axios'
import apiClient from './client'

import type {
  ApiResponse,
  LoginCredentials,
  LoginData,
  ProfileData,
  UserProfile,
} from '../types/auth'

export const authApi = {
  async login(
    credentials: LoginCredentials,
  ): Promise<LoginData> {
    const response = await apiClient.post<
      ApiResponse<LoginData>
    >('/auth/login/', credentials)

    return response.data.data
  },

  async getProfile(
    signal?: AbortSignal,
  ): Promise<UserProfile> {
    const response = await apiClient.get<
      ApiResponse<ProfileData>
    >('/auth/me/', { signal })

    return response.data.data.user
  },
}

export function getAuthErrorMessage(
  error: unknown,
  fallback: string,
): string {
  if (!axios.isAxiosError<ApiResponse<unknown>>(error)) {
    return fallback
  }

  if (
    error.code === 'ECONNABORTED' ||
    error.code === 'ETIMEDOUT'
  ) {
    return 'The request timed out. Please try again.'
  }

  if (!error.response) {
    return 'Unable to connect to the server. Please try again.'
  }

  switch (error.response.status) {
    case 400:
      return 'Unable to sign in. Please check your credentials.'

    case 401:
      return 'Invalid username or password. Please try again.'

    case 403:
      return 'Unable to sign in. Please contact your administrator.'

    case 429:
      return 'Too many requests. Please try again later.'

    case 500:
    case 502:
    case 503:
    case 504:
      return 'The server is temporarily unavailable. Please try again.'

    default:
      return fallback
  }
}