import { FC } from 'react'
import { Link } from 'react-router-dom'

interface EventCardProps {
  eventId: string
  avatar: string
  username: string
  createdAt: string
  eventName: string
  participants: number
  eventType: string
  width: string
}

const EventCard: FC<EventCardProps> = ({
  eventId,
  avatar,
  username,
  createdAt,
  eventName,
  participants,
  eventType,
  width,
}) => {
  return (
    <Link
      className='card'
      to={`/events/${eventId}`}
      style={{
        textDecoration: 'none',
        width,
      }}
    >
      <div className='card-body'>
        <div className='d-flex align-items-center gap-2 mb-2'>
          <img
            src={avatar}
            alt='Avatar'
            className='img-fulid rounded-circle mr-3'
            style={{
              width: '70px',
              height: '70px',
            }}
          />

          <div className=''>
            <p className='mb-0 fs-5'>{username}</p>
            <p className='mb-0 text-secondary'>{createdAt}</p>
          </div>
        </div>
        <p className='fs-4 fw-bold'>{eventName}</p>
        <div className='d-flex justify-content-between align-items-center'>
          <p className='border border-primary p-2'>
            Participant {participants}
          </p>

          <p className='badge fs-6 bg-secondary'>{eventType}</p>
        </div>
      </div>
    </Link>
  )
}

export default EventCard
