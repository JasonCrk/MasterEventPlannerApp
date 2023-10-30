import { LoginCredentials, RegisterCredentials } from '../models/auth.model'

import { UserAuth } from '../models/user.model'

import { AuthTokensResponse, MessageResponse } from '../models/response.model'

import { authBaseEndpoint } from './endpoints'

export const getUserWithToken = async (
  accessToken: string
): Promise<UserAuth> => {
  const res = await authBaseEndpoint.get<UserAuth>('/user', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
  return res.data
}

export const verifyToken = async (
  accessToken: string | null
): Promise<MessageResponse> => {
  const res = await authBaseEndpoint.get<MessageResponse>('/verify', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
  return res.data
}

export const refreshAccessToken = async (
  refreshToken: string | null
): Promise<AuthTokensResponse> => {
  const res = await authBaseEndpoint.post<AuthTokensResponse>(
    '/refresh-token',
    null,
    {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    }
  )
  return res.data
}

export const login = async (
  credentials: LoginCredentials
): Promise<AuthTokensResponse> => {
  const res = await authBaseEndpoint.post<AuthTokensResponse>(
    '/login',
    credentials
  )
  return res.data
}

export const registerUser = async (
  credentials: RegisterCredentials
): Promise<AuthTokensResponse> => {
  const res = await authBaseEndpoint.post<AuthTokensResponse>(
    '/register',
    credentials
  )
  return res.data
}
