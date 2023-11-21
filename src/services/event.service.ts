import {
  CreateEventData,
  EventDetails,
  EventId,
  EventItem,
  SearchEventsParticipatingParams,
} from '../models/event.model'
import {
  EntityWithMessageResponse,
  ListResponse,
  MessageResponse,
} from '../models/response.model'

import { useAuthStore } from '../store/useAuthStorage'

import { eventBaseEndpoint } from './endpoints'

export const searchEventsParticipating = async (
  params: SearchEventsParticipatingParams
): Promise<ListResponse<EventItem>> => {
  const accessToken = useAuthStore.getState().accessToken

  const url = new URL(eventBaseEndpoint.defaults.baseURL + '/participating')

  if (params.category !== undefined && params.category !== '')
    url.searchParams.append('category', params.category)

  if (params.sortBy !== undefined)
    url.searchParams.append('sortBy', params.sortBy)

  return eventBaseEndpoint
    .get<ListResponse<EventItem>>(url.toString(), {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then(response => response.data)
}

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
