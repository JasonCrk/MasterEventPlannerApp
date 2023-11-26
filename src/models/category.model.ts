export interface Category {
  id: string
  name: string
  icon: string
}

export type CategoryId = Category['id']
export type CategoryName = Category['name']
export type CategoryPicture = Category['icon']
