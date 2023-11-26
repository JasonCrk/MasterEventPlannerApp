import { FC } from 'react'

import { Link } from 'react-router-dom'

import { useQueryClient } from '@tanstack/react-query'

import {
  EventItem,
  StatusColorValues,
  StatusValues,
  VisibilityColorValues,
  VisibilityValues,
} from '../models/event.model'

import { useAlerts } from '../hooks/useAlerts.hook'

import Avatar from './Avatar.component'
import EventOptions from './EventOptions.component'

import { datetimeFormat } from '../utils/datetimeFormat'

import { FaUsers, FaCircle } from 'react-icons/fa'
import { MdVisibility } from 'react-icons/md'

interface Props extends EventItem {
  width: string
}

const EventCard: FC<Props> = ({
  id: eventId,
  coordinator,
  createdAt,
  name,
  numberParticipants,
  width,
  status,
  visibility,
}) => {
  const queryClient = useQueryClient()
  const { showAlert } = useAlerts()

  const handleCancelEvent = async () => {
    await queryClient.invalidateQueries({ queryKey: ['home'] })
  }

  const handleDeleteEvent = async (message: string) => {
    await queryClient.invalidateQueries({ queryKey: ['home'] })
    showAlert({
      message,
      type: 'success',
      timestamp: 3000,
    })
  }

  return (
    <article
      className='card'
      style={{
        textDecoration: 'none',
        width,
      }}
    >
      <div className='card-body'>
        <header className='d-flex justify-content-between'>
          <div className='d-flex align-items-center gap-2 mb-2'>
            <Link to={`/${coordinator.account.id}/profile`}>
              <Avatar src={coordinator.account.picture} size='50px' />
            </Link>

            <div>
              <Link
                to={`/${coordinator.account.id}/profile`}
                className='mb-0 fs-5 text-dark fw-semibold'
                style={{ textDecoration: 'none' }}
              >
                {coordinator.username}
              </Link>
              <p className='mb-0 text-secondary' style={{ fontSize: '0.9rem' }}>
                {datetimeFormat(createdAt, 'short', 'short')}
              </p>
            </div>
          </div>

          <EventOptions
            coordinatorId={coordinator.id}
            eventId={eventId}
            eventStatus={status}
            onCancel={() => handleCancelEvent()}
            onDelete={({ message }) => handleDeleteEvent(message)}
          />
        </header>

        <Link
          to={`/events/${eventId}`}
          className='fs-4 fw-bold text-dark'
          style={{ textDecoration: 'none' }}
        >
          <p className='mb-2'>{name}</p>
        </Link>

        <div className='d-flex justify-content-between align-items-center'>
          <div className='badge bg-secondary d-flex align-items-center gap-2 fs-6 py-2'>
            <FaUsers />
            <span>Participants {numberParticipants}</span>
          </div>

          <div className='d-flex gap-2'>
            <p
              className={`badge py-2 d-flex align-items-center mb-0 fs-6 bg-${VisibilityColorValues[visibility]}`}
              style={{ fontSize: '0.9rem' }}
            >
              <MdVisibility style={{ marginRight: 4, fontSize: '1rem' }} />
              <span>{VisibilityValues[visibility]}</span>
            </p>
            <p
              className={`badge py-2 d-flex align-items-center mb-0 bg-${StatusColorValues[status]}`}
              style={{ fontSize: '0.9rem' }}
            >
              <FaCircle style={{ marginRight: 4 }} />
              <span>{StatusValues[status]}</span>
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}

export default EventCard
