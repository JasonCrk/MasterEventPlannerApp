import { AccountId, AccountPicture } from './account.model'

export interface User {
  id: string
  username: string
  email: string
  password: string
}

export type UserId = User['id']
export type UserUsername = User['username']
export type UserEmail = User['email']
export type UserPassword = User['password']

export interface SimpleUser {
  id: UserId
  username: UserUsername
  account: {
    id: AccountId
    picture: AccountPicture
  }
}

export interface UserWithUsername {
  id: UserId
  username: UserUsername
}
