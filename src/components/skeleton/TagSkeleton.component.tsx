import { FC } from 'react'

const TagSkeleton: FC = () => {
  return (
    <div
      className={`rounded-pill bg-secondary-subtle d-flex gap-2`}
      style={{ padding: '8px 13px 8px 10px', width: '180px' }}
    >
      <img
        src={
          'https://www.solidbackgrounds.com/images/950x350/950x350-light-gray-solid-color-background.jpg'
        }
        className='rounded-circle object-fit-cover'
        alt={'icon loading'}
        style={{
          width: '25px',
          height: '25px',
        }}
      />
      <p className='placeholder-glow mb-0'>
        <span
          className='placeholder placeholder-lg'
          style={{ width: '120px' }}
        ></span>
      </p>
    </div>
  )
}

export default TagSkeleton
