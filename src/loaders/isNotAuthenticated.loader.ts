import { LoaderFunction, redirect } from 'react-router-dom'

import { useAuthStore } from '../store/useAuthStorage'

export const isNotAuthenticatedLoader: LoaderFunction<any> = () => {
  const isAuth = useAuthStore.getState().isAuth

  if (isAuth) return redirect('/')

  return true
}
