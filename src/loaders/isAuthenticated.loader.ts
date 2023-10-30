import { LoaderFunction, redirect } from 'react-router-dom'

import { AuthTokensResponse } from '../models/response.model'

import { useAuthStore } from '../store/useAuthStorage'

import {
  getUserWithToken,
  refreshAccessToken,
  verifyToken,
} from '../services/auth.service'

const rejectAuthentication = () => {
  const { setAuthTokens, setIsAuth, setUser } = useAuthStore.getState()

  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')

  setAuthTokens({ accessToken: null, refreshToken: null })
  setIsAuth(false)
  setUser(null)

  return redirect('/auth/login')
}

export const isAuthenticatedLoader: LoaderFunction = async () => {
  const {
    isAuth,
    accessToken,
    refreshToken,
    setAuthTokens,
    setIsAuth,
    setUser,
  } = useAuthStore.getState()

  if (!isAuth && accessToken === null) return rejectAuthentication()

  let validAccessToken: string = accessToken!

  try {
    await verifyToken(accessToken)
  } catch (e) {
    if (refreshToken === null) return rejectAuthentication()

    let newTokens: AuthTokensResponse

    try {
      newTokens = await refreshAccessToken(refreshToken)
    } catch (e) {
      return rejectAuthentication()
    }

    validAccessToken = newTokens.accessToken
  }

  try {
    const user = await getUserWithToken(validAccessToken)
    setUser(user)
  } catch (e) {
    return rejectAuthentication()
  }

  setAuthTokens({
    accessToken: validAccessToken,
    refreshToken: refreshToken,
  })
  setIsAuth(true)

  return null
}
