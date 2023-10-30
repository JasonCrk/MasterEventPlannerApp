export type AccountId = `${string}-${string}-${string}-${string}-${string}`
export type AccountAbout = string
export type AccountPicture = string
export type AccountBanner = string

export interface Account {
  id: AccountId
  about: AccountAbout
  picture: AccountPicture
  banner: AccountBanner
}
