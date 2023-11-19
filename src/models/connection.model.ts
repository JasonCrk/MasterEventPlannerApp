import { SimpleUser } from './user.model'

export type ConnectionId = `${string}-${string}-${string}-${string}-${string}`
export type ConnectionUser = SimpleUser

export interface Connection {
  id: ConnectionId
  user: ConnectionUser
}
