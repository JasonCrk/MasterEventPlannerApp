import { FC } from 'react'

import { Link, useNavigate } from 'react-router-dom'

import { useShallow } from 'zustand/shallow'

import { useAuthStore } from '../store/useAuthStorage'

import { logout } from '../services/auth.service'

import Avatar from './Avatar.component'

const UserOptions: FC = () => {
  const { setAuthTokens, setIsAuth, setUser } = useAuthStore()
  const { user, accessToken } = useAuthStore(
    useShallow(state => ({ user: state.user, accessToken: state.accessToken }))
  )

  const navigate = useNavigate()

  const handleLogout = async () => {
    if (accessToken) {
      await logout(accessToken)
      setAuthTokens({ accessToken: null, refreshToken: null })
      setIsAuth(false)
      navigate('/auth/login')
      setUser(null)
    }
  }

  return (
    <div className='dropdown dropstart'>
      <div data-bs-toggle='dropdown' aria-expanded='false'>
        <Avatar alt='items' size='44px' src={user?.account.picture} />
      </div>
      <ul className='dropdown-menu' style={{ marginRight: 6 }}>
        <li>
          <Link className='dropdown-item' to={'/'}>
            Profile
          </Link>
        </li>
        <li>
          <hr className='dropdown-divider' />
        </li>
        <li>
          <button
            className='dropdown-item bg-danger text-white'
            onClick={handleLogout}
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  )
}

export default UserOptions
