import { SimpleUser, User } from './user.model'

export type InvitationId = `${string}-${string}-${string}-${string}-${string}`
export type InvitationInviter = User
export type InvitationInviting = User
export type InvitationNotifiedAt = string

export enum InvitationStatus {
  ACCEPTED = 'ACCEPTED',
  PENDING = 'PENDING',
}

export interface Invitation {
  id: InvitationId
  inviter: InvitationInviter
  inviting: InvitationInviting
  notifiedAt: InvitationNotifiedAt
  status: InvitationStatus
}

export interface InvitationResponse {
  id: InvitationId
  user: SimpleUser
  notifiedAt: InvitationNotifiedAt
}
