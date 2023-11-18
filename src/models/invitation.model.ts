import { User } from './user.model'

export type InvitationId = `${string}-${string}-${string}-${string}-${string}`
export type InvitationInviter = User
export type InvitationInviting = User

export enum InvitationStatus {
  ACCEPTED = 'ACCEPTED',
  PENDING = 'PENDING',
}

export interface Invitation {
  id: InvitationId
  inviter: InvitationInviter
  inviting: InvitationInviting
}
