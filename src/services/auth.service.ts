import { LoginCredentials, RegisterCredentials } from '../models/auth.model'
import { SimpleUser } from '../models/user.model'
import { AuthTokensResponse, MessageResponse } from '../models/response.model'

import { authBaseEndpoint } from './endpoints'

export const getUserWithToken = async (
  accessToken: string
): Promise<SimpleUser> => {
  return authBaseEndpoint
    .get<SimpleUser>('/user', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then(response => response.data)
}

export const verifyToken = async (
  accessToken: string | null
): Promise<MessageResponse> => {
  return authBaseEndpoint
    .get<MessageResponse>('/verify', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then(response => response.data)
}

export const refreshAccessToken = async (
  refreshToken: string | null
): Promise<AuthTokensResponse> => {
  return authBaseEndpoint
    .post<AuthTokensResponse>('/refresh-token', null, {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    })
    .then(response => response.data)
}

export const login = async (
  credentials: LoginCredentials
): Promise<AuthTokensResponse> => {
  return authBaseEndpoint
    .post<AuthTokensResponse>('/login', credentials)
    .then(response => response.data)
}

export const registerUser = async (
  credentials: RegisterCredentials
): Promise<AuthTokensResponse> => {
  return authBaseEndpoint
    .post<AuthTokensResponse>('/register', credentials)
    .then(response => response.data)
}
