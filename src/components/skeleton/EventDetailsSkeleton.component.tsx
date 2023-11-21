import type { FC } from 'react'

import TagSkeleton from './TagSkeleton.component'
import AvatarSkeleton from './AvatarSkeleton.component'

const EventDetailsSkeleton: FC = () => {
  return (
    <div>
      <div className='d-flex gap-2 align-items-center mb-3'>
        <AvatarSkeleton size='60px' />

        <p className='placeholder-glow mb-0 d-flex flex-column gap-2'>
          <span
            className='placeholder placeholder-lg'
            style={{ width: '320px' }}
          ></span>
          <span
            className='placeholder placeholder-lg'
            style={{ width: '120px' }}
          ></span>
        </p>
      </div>

      <p className='placeholder-glow mb-2'>
        <span
          className='placeholder placeholder-lg w-100'
          style={{ height: '30px' }}
        ></span>
      </p>

      <div className='d-flex flex-wrap gap-2 mb-3'>
        <TagSkeleton />
        <TagSkeleton />
        <TagSkeleton />
        <TagSkeleton />
        <TagSkeleton />
        <TagSkeleton />
      </div>

      <p className='placeholder-glow d-flex flex-wrap gap-1'>
        <span className='placeholder col-4'></span>
        <span className='placeholder col-7'></span>
        <span className='placeholder col-7'></span>
        <span className='placeholder col-4'></span>
        <span className='placeholder col-5'></span>
        <span className='placeholder col-5'></span>
        <span className='placeholder col-3'></span>
      </p>

      <button className='btn btn-primary disabled placeholder col-3'></button>
    </div>
  )
}

export default EventDetailsSkeleton
