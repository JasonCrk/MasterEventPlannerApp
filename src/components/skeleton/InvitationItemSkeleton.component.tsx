import { FC } from 'react'

const InvitationItemSkeleton: FC = () => {
  return (
    <div className='card'>
      <div className='card-body d-flex align-items-center justify-content-between'>
        <div className='d-flex align-items-center gap-2'>
          <div
            className='bg-secondary rounded-circle'
            style={{ width: '55px', height: '55px' }}
          ></div>
          <p className='placeholder-glow mb-0 d-flex flex-column gap-1'>
            <span
              className='placeholder placeholder-lg'
              style={{ width: '300px' }}
            ></span>
            <span
              className='placeholder placeholder-lg'
              style={{ width: '150px' }}
            ></span>
          </p>
        </div>
        <div className='d-flex justify-content-center align-items-center gap-2'>
          <button
            className='btn btn-success disabled placeholder rounded'
            style={{ width: '50px', height: '50px' }}
          ></button>
          <button
            className='btn btn-danger disabled placeholder rounded'
            style={{ width: '50px', height: '50px' }}
          ></button>
        </div>
      </div>
    </div>
  )
}

export default InvitationItemSkeleton
