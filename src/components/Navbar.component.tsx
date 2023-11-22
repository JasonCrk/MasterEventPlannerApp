import { FC, KeyboardEvent, useState } from 'react'

import { Link, useNavigate, useSearchParams } from 'react-router-dom'

import NavLink from './NavLink.component'
import UserOptions from './UserOptions.component'

import { FiSearch } from 'react-icons/fi'

const Navbar: FC = () => {
  const [searchEventsParams] = useSearchParams()
  const [searchQuery, setSearchQuery] = useState<string>(
    searchEventsParams.get('q') ?? ''
  )

  const navigate = useNavigate()

  const handleSearchPublicEvents = (event: KeyboardEvent<HTMLInputElement>) => {
    const searchQuery = event.currentTarget.value
    if (event.key === 'Enter' && searchQuery !== '') {
      const searchParams = new URLSearchParams()
      searchParams.append('q', searchQuery)

      navigate('/search?' + searchParams)
    }
  }

  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-black'>
      <div className='container-md'>
        <Link className='navbar-brand fw-bold' to='/'>
          Master Planner Event
        </Link>

        <div className='collapse navbar-collapse'>
          <div className='input-group w-75'>
            <span className='input-group-text'>
              <FiSearch />
            </span>
            <input
              placeholder='Buscar...'
              value={searchQuery}
              onChange={e => setSearchQuery(e.currentTarget.value)}
              className='form-control'
              onKeyDown={handleSearchPublicEvents}
            />
          </div>
        </div>

        <div className='d-flex align-items-center gap-3'>
          <ul className='nav nav-underline d-flex'>
            <NavLink href='/'>Home</NavLink>
            <NavLink href='/networks'>Networks</NavLink>
            <NavLink href='/notifications'>Notifications</NavLink>
          </ul>

          <UserOptions />
        </div>
      </div>
    </nav>
  )
}

export default Navbar
