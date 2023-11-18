import { UserId } from '../models/user.model'
import { MessageResponse } from '../models/response.model'
import { InvitationId } from '../models/invitation.model'

import { useAuthStore } from '../store/useAuthStorage'

import { connectionBaseEndpoint } from './endpoints'

export const sendInvitation = (userId: UserId): Promise<MessageResponse> => {
  const accessToken = useAuthStore.getState().accessToken
  return connectionBaseEndpoint.post(
    '/send-invitation',
    { user: userId },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  )
}

export const acceptInvitation = (invitationId: InvitationId) => {
  const accessToken = useAuthStore.getState().accessToken
  return connectionBaseEndpoint.post(
    `/accept-invitation/${invitationId}`,
    null,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  )
}
