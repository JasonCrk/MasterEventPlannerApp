import { FC } from 'react'

interface Props {
  size: string
}

const AvatarSkeleton: FC<Props> = ({ size }) => {
  return (
    <div
      className='bg-secondary rounded-circle'
      style={{ width: size, height: size }}
    ></div>
  )
}

export default AvatarSkeleton
