import { Category } from './category.model'
import { SimpleUser, User } from './user.model'

export enum Status {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  FINALIZED = 'FINALIZED',
  CANCELLED = 'CANCELLED',
}

export enum Visibility {
  ONLY_CONNECTIONS = 'ONLY_CONNECTIONS',
  PUBLIC = 'PUBLIC',
}

export interface Event {
  id: string
  coordinator: User
  name: string
  description: string
  category: Category
  visibility: Visibility
  local: string
  status: Status
  realizationDate: string
  finishDate: string
  createdAt: string
}

export type EventId = Event['id']
export type EventName = Event['name']
export type EventDescription = Event['description']
export type EventVisibility = Event['visibility']
export type EventLocal = Event['local']
export type EventStatus = Event['status']
export type EventCategory = Event['category']
export type EventRealizationDate = Event['realizationDate']
export type EventFinishDate = Event['finishDate']
export type EventCreatedAt = Event['createdAt']

export interface CreateEventData {
  name: EventName
  description: EventDescription
  category: string
  local: EventLocal
  visibility: EventVisibility
  realizationDate: EventRealizationDate
  finishDate: EventFinishDate
}

export interface EventItem {
  id: EventId
  coordinator: SimpleUser
}
