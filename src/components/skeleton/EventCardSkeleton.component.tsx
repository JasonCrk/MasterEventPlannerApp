import type { FC } from 'react'

import AvatarSkeleton from './AvatarSkeleton.component'

interface Props {
  width: string
}

const EventCardSkeleton: FC<Props> = ({ width }) => {
  return (
    <article
      className='card'
      style={{
        textDecoration: 'none',
        width,
      }}
    >
      <div className='card-body'>
        <header className='d-flex align-items-center gap-2 mb-2'>
          <AvatarSkeleton size='50px' />

          <p className='placeholder-glow mb-0 d-flex flex-column gap-2'>
            <span
              className='placeholder placeholder-lg'
              style={{ width: '200px', height: '23px' }}
            ></span>
            <span className='placeholder' style={{ width: '100px' }}></span>
          </p>
        </header>

        <p className='placeholder-glow d-flex flex-wrap gap-1 mb-2'>
          <span
            className='placeholder placeholder-lg col-4'
            style={{ height: '35px' }}
          ></span>
          <span
            className='placeholder placeholder-lg col-7'
            style={{ height: '35px' }}
          ></span>
          <span
            className='placeholder placeholder-lg col-4'
            style={{ height: '35px' }}
          ></span>
        </p>

        <div className='d-flex justify-content-between align-items-center'>
          <div className='badge bg-secondary d-flex align-items-center gap-2 py-2'>
            <p className='placeholder-glow mb-0'>
              <span
                className='placeholder placeholder-lg'
                style={{ width: '100px', height: '24px' }}
              ></span>
            </p>
          </div>

          <div>
            <div className='badge bg-secondary py-2 me-2'>
              <p className='placeholder-glow mb-0'>
                <span
                  className='placeholder placeholder-lg'
                  style={{ width: '100px', height: '24px' }}
                ></span>
              </p>
            </div>
            <div className='badge py-2 bg-secondary'>
              <p className='placeholder-glow mb-0'>
                <span
                  className='placeholder placeholder-lg'
                  style={{ width: '100px', height: '24px' }}
                ></span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

export default EventCardSkeleton
