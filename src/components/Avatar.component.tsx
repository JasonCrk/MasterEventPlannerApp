import { FC, ImgHTMLAttributes } from 'react'

import { AccountPicture } from '../models/account.model'

import config from '../config'

interface Props extends ImgHTMLAttributes<HTMLImageElement> {
  size: string
  src: AccountPicture | undefined
}

const Avatar: FC<Props> = ({ size, src, style, className, ...props }) => {
  return (
    <img
      className={`rounded-circle ${className}`}
      style={{ width: size, height: size, ...style }}
      src={src ?? config.DEFAULT_AVATAR_URL}
      {...props}
    />
  )
}

export default Avatar
