import { FC } from 'react'

import { Link } from 'react-router-dom'

import NavLink from './NavLink.component'
import UserOptions from './UserOptions.component'

const Navbar: FC = () => {
  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-black'>
      <div className='container-md'>
        <Link className='navbar-brand fw-bold' to='/'>
          Master Planner Event
        </Link>

        {/* <div className='collapse navbar-collapse'>
          <form>
            <Input
              register={}
              placeholder='Search...'
              adornment={() => <FiSearch />}
              style={{ width: '300px' }}
            />
          </form>
        </div> */}

        <div className='d-flex align-items-center gap-3'>
          <ul className='nav nav-underline d-flex'>
            <NavLink href='/'>Home</NavLink>
            <NavLink href='/public-events'>Public events</NavLink>
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
