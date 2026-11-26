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
  if (axios.isAxiosError<ApiResponse<unknown>>(error)) {
    return error.response?.data?.message || fallback
  }

  return fallback
}