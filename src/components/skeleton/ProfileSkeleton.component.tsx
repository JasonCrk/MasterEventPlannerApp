import { FC } from 'react'

const ProfileSkeleton: FC = () => {
  return (
    <section>
      <div
        className='position-relative bg-dark-subtle w-100'
        style={{ height: '200px' }}
      >
        <div
          className='position-absolute'
          style={{
            bottom: -90,
            left: 40,
          }}
        >
          <div
            className='position-relative rounded-circle bg-secondary'
            style={{ width: '180px', height: '180px' }}
          ></div>
        </div>
      </div>

      <div
        className='container-lg px-5 position-relative'
        style={{ paddingTop: '100px' }}
      >
        <p className='placeholder-glow mb-3'>
          <span
            className='placeholder placeholder-lg w-100'
            style={{ height: '40px' }}
          ></span>
        </p>

        <p className='placeholder-glow d-flex flex-wrap gap-1'>
          <span className='placeholder col-4'></span>
          <span className='placeholder col-7'></span>
          <span className='placeholder col-7'></span>
          <span className='placeholder col-4'></span>
          <span className='placeholder col-5'></span>
        </p>
      </div>
    </section>
  )
}

export default ProfileSkeleton
