export interface Category {
  id: string
  name: string
  picture: string
}

export type CategoryId = Category['id']
export type CategoryName = Category['name']
export type CategoryPicture = Category['picture']
