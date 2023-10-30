import { AccountId, AccountPicture } from './account.model'

export interface User {
  id: string
  username: string
  email: string
  password: string
}

export type UserId = Pick<User, 'id'>
export type UserUsername = Pick<User, 'username'>
export type UserEmail = Pick<User, 'email'>
export type UserPassword = Pick<User, 'password'>

export interface UserAuth {
  id: UserId
  username: UserUsername
  account: {
    id: AccountId
    picture: AccountPicture
  }
}
