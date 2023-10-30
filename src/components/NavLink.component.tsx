import { FC, ReactNode } from 'react'

import { NavLink as ReactNavLink } from 'react-router-dom'

interface Props {
  href: string
  children: ReactNode
}

const NavLink: FC<Props> = ({ href, children }) => {
  return (
    <li className='nav-item'>
      <ReactNavLink
        to={href}
        className={({ isActive }) =>
          `nav-link ${isActive && 'active fw-bold'} text-light fs-6`
        }
      >
        {children}
      </ReactNavLink>
    </li>
  )
}

export default NavLink
