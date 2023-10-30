export interface Category {
  id: string
  name: string
  picture: string
}

export type CategoryId = Pick<Category, 'id'>
export type CategoryName = Pick<Category, 'name'>
export type CategoryPicture = Pick<Category, 'picture'>
