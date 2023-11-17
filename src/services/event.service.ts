import {
  CreateEventData,
  EventDetails,
  EventId,
  EventItem,
} from '../models/event.model'
import {
  EntityWithMessageResponse,
  MessageResponse,
} from '../models/response.model'

import { useAuthStore } from '../store/useAuthStorage'

import { eventBaseEndpoint } from './endpoints'

export const getEventById = async (eventId: EventId): Promise<EventDetails> => {
  const accessToken = useAuthStore.getState().accessToken
  return eventBaseEndpoint
    .get('/' + eventId, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then(response => response.data)
}

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

export const joinEvent = async ({
  token,
  eventId,
}: {
  token: string
  eventId: EventId
}): Promise<MessageResponse> => {
  const accessToken = useAuthStore.getState().accessToken
  return eventBaseEndpoint
    .post<MessageResponse>(
      `/${eventId}/join`,
      { token },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
    .then(response => response.data)
}

export const cancelEvent = async (
  eventId: EventId
): Promise<MessageResponse> => {
  const accessToken = useAuthStore.getState().accessToken
  return eventBaseEndpoint
    .post<MessageResponse>(`/${eventId}/cancel`, null, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then(response => response.data)
}

export const deleteEvent = async (
  eventId: EventId
): Promise<MessageResponse> => {
  const accessToken = useAuthStore.getState().accessToken
  return eventBaseEndpoint
    .delete(`/${eventId}/remove`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then(response => response.data)
}
