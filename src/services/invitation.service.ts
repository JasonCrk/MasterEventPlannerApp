import { UserId } from '../models/user.model'
import { MessageResponse } from '../models/response.model'
import { InvitationId } from '../models/invitation.model'

import { useAuthStore } from '../store/useAuthStorage'

import { connectionBaseEndpoint } from './endpoints'

export const sendInvitation = async (
  userId: UserId
): Promise<MessageResponse> => {
  const accessToken = useAuthStore.getState().accessToken
  return connectionBaseEndpoint
    .post<MessageResponse>(
      '/send-invitation',
      { user: userId },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
    .then(response => response.data)
}

export const acceptInvitation = async (
  invitationId: InvitationId
): Promise<MessageResponse> => {
  const accessToken = useAuthStore.getState().accessToken
  return connectionBaseEndpoint
    .post<MessageResponse>(`/accept-invitation/${invitationId}`, null, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then(response => response.data)
}
