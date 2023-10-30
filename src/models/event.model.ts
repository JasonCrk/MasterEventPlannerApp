import { Category } from './category.model'
import { User } from './user.model'

export enum Status {
  PENDING,
  IN_PROGRESS,
  FINALIZED,
  CANCELLED,
}

export enum Visibility {
  ONLY_CONNECTIONS,
  PUBLIC,
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
  realizationDate: Date
  finishDate: Date
  createdAt: Date
}

export type EventId = Pick<Event, 'id'>
export type EventName = Pick<Event, 'name'>
export type EventDescription = Pick<Event, 'description'>
export type EventVisibility = Pick<Event, 'visibility'>
export type EventLocal = Pick<Event, 'local'>
export type EventStatus = Pick<Event, 'status'>
export type EventRealizationDate = Pick<Event, 'realizationDate'>
export type EventFinishDate = Pick<Event, 'finishDate'>
export type EventCreatedAt = Pick<Event, 'createdAt'>
