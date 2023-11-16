import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

import { SimpleUser } from '../models/user.model'

interface State {
  isAuth: boolean
  accessToken: string | null
  refreshToken: string | null
  user: SimpleUser | null
}

interface Actions {
  setAuthTokens: (tokens: Pick<State, 'accessToken' | 'refreshToken'>) => void
  setIsAuth: (auth: boolean) => void
  setUser: (user: SimpleUser | null) => void
}

export const useAuthStore = create(
  devtools<State & Actions>(set => ({
    isAuth: false,
    accessToken: localStorage.getItem('accessToken'),
    refreshToken: localStorage.getItem('refreshToken'),
    user: null,
    setIsAuth: auth => set(state => ({ ...state, isAuth: auth })),
    setAuthTokens: tokens =>
      set(state => ({
        ...state,
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
      })),
    setUser: user => set(state => ({ ...state, user })),
  }))
)
