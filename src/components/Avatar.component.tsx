import { FC, ImgHTMLAttributes } from 'react'

import config from '../config'

interface Props extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  size: string
  src: string | null | undefined
}

const Avatar: FC<Props> = ({ size, src, style, className, ...props }) => {
  return (
    <img
      className={`rounded-circle ${className}`}
      style={{ width: size, height: size, ...style, aspectRatio: 1 / 1 }}
      src={src ?? config.DEFAULT_AVATAR_URL}
      {...props}
    />
  )
}

export default Avatar
