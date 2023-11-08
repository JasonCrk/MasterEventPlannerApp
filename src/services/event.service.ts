import { CreateEventData, EventItem } from '../models/event.model'
import { EntityWithMessageResponse } from '../models/response.model'

import { useAuthStore } from '../store/useAuthStorage'

import { eventBaseEndpoint } from './endpoints'

export const scheduleEvent = async (
  data: CreateEventData
): Promise<EntityWithMessageResponse<EventItem>> => {
  const accessToken = useAuthStore.getState().accessToken
  return eventBaseEndpoint
    .post<EntityWithMessageResponse<EventItem>>('', data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then(response => response.data)
}
