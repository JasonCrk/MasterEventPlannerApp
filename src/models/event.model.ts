import { BootstrapColorOptions } from './bootstrap.model'
import { Category, CategoryId, CategoryName } from './category.model'
import { SimpleUser } from './user.model'

export enum SortByEvents {
  RECENT = 'RECENT',
  UPCOMING = 'UPCOMING',
}

export enum Status {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  FINALIZED = 'FINALIZED',
  CANCELLED = 'CANCELLED',
}

interface ValuesData {
  [key: string]: string
}

export const StatusValues: ValuesData = {
  PENDING: 'Pending',
  IN_PROGRESS: 'In progress',
  FINALIZED: 'Finalized',
  CANCELLED: 'Cancelled',
}

export const VisibilityValues: ValuesData = {
  ONLY_CONNECTIONS: 'Only Connections',
  PUBLIC: 'Public',
}

interface ColorData {
  [key: string]: BootstrapColorOptions
}

export const StatusColorValues: ColorData = {
  PENDING: 'secondary',
  IN_PROGRESS: 'info',
  FINALIZED: 'success',
  CANCELLED: 'danger',
}

export const VisibilityColorValues: ColorData = {
  ONLY_CONNECTIONS: 'info',
  PUBLIC: 'success',
}

export enum Visibility {
  ONLY_CONNECTIONS = 'ONLY_CONNECTIONS',
  PUBLIC = 'PUBLIC',
}

export interface Event {
  id: string
  coordinator: SimpleUser
  name: string
  description: string | null
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
  name: EventName
  description: EventDescription
  visibility: EventVisibility
  status: EventStatus
  realizationDate: EventRealizationDate
  category: EventCategory
  numberParticipants: number
  createdAt: EventCreatedAt
}

export interface EventDetails extends Event {
  participating: boolean
  numberParticipants: number
}

export interface UpdateEvent {
  name?: EventName
  description?: EventDescription
  category?: CategoryId
  local?: EventLocal
  visibility?: EventVisibility
  realizationDate?: EventRealizationDate
  finishDate?: EventFinishDate
}

export interface SearchEventsParticipatingParams {
  sortBy?: string
  category?: CategoryName
}

export interface SearchEventsParams {
  searchQuery: string
  category?: CategoryName
}
