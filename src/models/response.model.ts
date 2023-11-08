export interface MessageResponse {
  message: string
}

export interface ListResponse<TData> {
  data: TData[]
}

export interface AuthTokensResponse {
  accessToken: string
  refreshToken: string
  authHeader: string
}

export interface EntityWithMessageResponse<Entity> {
  created: Entity
  message: string
}
