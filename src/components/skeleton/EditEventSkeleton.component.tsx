import { FC } from 'react'

import { useNavigate } from 'react-router-dom'

import { EventId } from '../../models/event.model'

import IconButton from '../IconButton.component'

import { AiOutlineArrowLeft } from 'react-icons/ai'

interface Props {
  eventId: EventId
}

const EditEventSkeleton: FC<Props> = ({ eventId }) => {
  const navigate = useNavigate()

  return (
    <div className='mt-4'>
      <div className='d-flex justify-content-between align-items-center mb-4'>
        <div className='d-flex gap-2 align-items-center'>
          <IconButton
            icon={<AiOutlineArrowLeft />}
            className='btn btn-secondary'
            onClick={() => navigate(`/events/${eventId}`)}
            type='button'
          />

          <p className='placeholder-glow mb-0'>
            <span
              className='placeholder placeholder-lg rounded'
              style={{ width: '175px', height: '36px' }}
            ></span>
          </p>
        </div>

        <button
          className='btn btn-info disabled placeholder rounded'
          style={{ width: '80px', height: '38px' }}
        ></button>
      </div>

      <p className='placeholder-glow mb-0'>
        <span
          className='placeholder placeholder-lg w-100 rounded'
          style={{ height: '45px' }}
        ></span>
      </p>

      <div className='container my-2 px-0'>
        <div className='row g-2'>
          <div className='col-6'>
            <label className='form-label mb-0'>Category</label>
            <p className='placeholder-glow mb-0'>
              <span
                className='placeholder placeholder-lg w-100 rounded'
                style={{ height: '36px' }}
              ></span>
            </p>
          </div>
          <div className='col-6'>
            <label className='form-label mb-0'>Local</label>
            <p className='placeholder-glow mb-0'>
              <span
                className='placeholder placeholder-lg w-100 rounded'
                style={{ height: '36px' }}
              ></span>
            </p>
          </div>
          <div className='col-6'>
            <label className='form-label mb-0'>Realization date</label>
            <p className='placeholder-glow mb-0'>
              <span
                className='placeholder placeholder-lg w-100 rounded'
                style={{ height: '36px' }}
              ></span>
            </p>
          </div>
          <div className='col-6'>
            <label className='form-label mb-0'>Finish date</label>
            <p className='placeholder-glow mb-0'>
              <span
                className='placeholder placeholder-lg w-100 rounded'
                style={{ height: '36px' }}
              ></span>
            </p>
          </div>
        </div>
      </div>

      <p className='placeholder-glow mb-0'>
        <span
          className='placeholder placeholder-lg w-100 rounded'
          style={{ height: '200px' }}
        ></span>
      </p>
    </div>
  )
}

export default EditEventSkeleton
