import { FC } from 'react'

import { BootstrapColorOptions } from '../models/bootstrap.model'

interface Props {
  name: string
  icon: string
  color: BootstrapColorOptions
}

const Tag: FC<Props> = ({ icon, name, color }) => {
  const tagNameColor =
    color === 'warning' || color === 'light' ? 'text-dark' : 'text-white'
  const tagBorder = color === 'light' ? 'border' : ''

  return (
    <div
      className={`rounded-pill bg-${color} d-flex gap-2 ${tagBorder}`}
      style={{ padding: '8px 13px 8px 10px' }}
    >
      <img
        src={icon}
        className='rounded-circle object-fit-cover'
        alt={name}
        style={{
          width: '25px',
          height: '25px',
        }}
      />
      <span className={tagNameColor}>{name}</span>
    </div>
  )
}

export default Tag
