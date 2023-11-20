import { UserId } from '../models/user.model'
import { ListResponse, MessageResponse } from '../models/response.model'
import { InvitationId, InvitationResponse } from '../models/invitation.model'

import { useAuthStore } from '../store/useAuthStorage'

import { connectionBaseEndpoint } from './endpoints'

export const getAllInvitations = async (): Promise<
  ListResponse<InvitationResponse>
> => {
  const accessToken = useAuthStore.getState().accessToken
  return connectionBaseEndpoint
    .get<ListResponse<InvitationResponse>>('/invitations', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then(response => response.data)
}

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

export const rejectInvitation = async (
  invitationId: InvitationId
): Promise<MessageResponse> => {
  const accessToken = useAuthStore.getState().accessToken
  return connectionBaseEndpoint
    .delete<MessageResponse>(`/reject-invitation/${invitationId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then(response => response.data)
}
