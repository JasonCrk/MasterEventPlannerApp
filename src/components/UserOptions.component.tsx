import { FC } from 'react'

import { Link } from 'react-router-dom'

import { useAuthStore } from '../store/useAuthStorage'

import Avatar from './Avatar.component'

const UserOptions: FC = () => {
  const user = useAuthStore(state => state.user)

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
          <button className='dropdown-item bg-danger text-white'>Logout</button>
        </li>
      </ul>
    </div>
  )
}

export default UserOptions
