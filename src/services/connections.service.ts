import { Connection, ConnectionId } from '../models/connection.model'
import { ListResponse, MessageResponse } from '../models/response.model'

import { useAuthStore } from '../store/useAuthStorage'

import { connectionBaseEndpoint } from './endpoints'

export const getAllConnections = async (): Promise<
  ListResponse<Connection>
> => {
  const accessToken = useAuthStore.getState().accessToken
  return connectionBaseEndpoint
    .get<ListResponse<Connection>>('', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then(response => response.data)
}

export const removeConnection = async (
  connectionId: ConnectionId
): Promise<MessageResponse> => {
  const accessToken = useAuthStore.getState().accessToken
  return connectionBaseEndpoint
    .delete<MessageResponse>(`/${connectionId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then(response => response.data)
}
