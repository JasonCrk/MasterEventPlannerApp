import { FC } from 'react'

import { AccountPicture } from '../models/account.model'

import config from '../config'

interface Props {
  size: string
  src: AccountPicture | undefined
  alt: string
}

const Avatar: FC<Props> = ({ size, src, alt }) => {
  return (
    <img
      className='rounded-circle'
      style={{ width: size, height: size }}
      src={src ?? config.DEFAULT_AVATAR_URL}
      alt={alt}
    />
  )
}

export default Avatar
