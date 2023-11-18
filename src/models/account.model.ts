import { UserWithUsername } from './user.model'
import { InvitationStatus } from './invitation.model'

export type AccountId = `${string}-${string}-${string}-${string}-${string}`
export type AccountAbout = string | null
export type AccountPicture = string | null
export type AccountBanner = string | null

export interface Account {
  id: AccountId
  about: AccountAbout
  picture: AccountPicture
  banner: AccountBanner
}

export interface AccountDetails extends Account {
  user: UserWithUsername
  invitationSent: InvitationStatus | null
}

export interface EditAccount {
  about?: AccountAbout | null
  picture?: File | null
  banner?: File | null
}
