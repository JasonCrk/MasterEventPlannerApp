import { FC } from 'react'

const ConnectionItemSkeleton: FC = () => {
  return (
    <div
      className='text-center border rounded p-3 bg-white text-dark'
      style={{
        maxHeight: '300px',
      }}
    >
      <div
        className='bg-secondary rounded-circle'
        style={{ width: '100%', height: '100%', aspectRatio: 1 / 1 }}
      ></div>

      <p className='placeholder-glow mb-2'>
        <span className='placeholder placeholder-lg w-100'></span>
      </p>

      <button className='btn btn-danger disabled placeholder rounded-pill w-100'></button>
    </div>
  )
}

export default ConnectionItemSkeleton
