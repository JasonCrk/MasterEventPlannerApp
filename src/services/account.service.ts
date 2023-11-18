import { AccountDetails, AccountId } from '../models/account.model'
import { MessageResponse } from '../models/response.model'

import { useAuthStore } from '../store/useAuthStorage'

import { accountBaseEndpoint } from './endpoints'

export const getProfile = async (
  accountId: AccountId
): Promise<AccountDetails> => {
  const accessToken = useAuthStore.getState().accessToken
  return accountBaseEndpoint
    .get<AccountDetails>(`/${accountId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then(response => response.data)
}

export const updateProfile = async (
  data: FormData
): Promise<MessageResponse> => {
  const accessToken = useAuthStore.getState().accessToken
  return accountBaseEndpoint
    .patch<MessageResponse>('', data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then(response => response.data)
}
