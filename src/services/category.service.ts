import { Category } from '../models/category.model'
import { ListResponse } from '../models/response.model'
import { useAuthStore } from '../store/useAuthStorage'

import { categoryBaseEndpoint } from './endpoints'

export const getAllCategories = (): Promise<ListResponse<Category>> => {
  const accessToken = useAuthStore.getState().accessToken
  return categoryBaseEndpoint
    .get<ListResponse<Category>>('/', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then(response => response.data)
}
