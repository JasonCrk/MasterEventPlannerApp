import { useParams, useNavigate, Link } from 'react-router-dom'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import {
  EventId,
  Status,
  StatusValues,
  VisibilityColorValues,
  VisibilityValues,
} from '../models/event.model'
import { MessageResponse } from '../models/response.model'
import { BootstrapColorOptions } from '../models/bootstrap.model'

import { useAuthStore } from '../store/useAuthStorage'

import { useAlerts } from '../hooks/useAlerts.hook'

import { getEventById, joinEvent } from '../services/event.service'
import { getNotificationToken } from '../services/firebase.service'

import Tag from '../components/Tag.component'
import Avatar from '../components/Avatar.component'
import EventOptions from '../components/EventOptions.component'
import EventDetailsSkeleton from '../components/skeleton/EventDetailsSkeleton.component'

import { datetimeFormat } from '../utils/datetimeFormat'

import { AiOutlineArrowLeft } from 'react-icons/ai'

function EventDetails() {
  const { eventId } = useParams()
  const { showAlert } = useAlerts()

  const navigate = useNavigate()
  const userAuth = useAuthStore(state => state.user)
  const queryClient = useQueryClient()

  const { isLoading, data: event } = useQuery({
    queryKey: ['eventDetails', eventId],
    queryFn: () => getEventById(eventId!),
    refetchOnWindowFocus: false,
  })

  const { mutate: mutateJoinEvent, isPending: isPendingJoinEvent } =
    useMutation({
      mutationFn: joinEvent,
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: ['eventDetails', eventId],
        })
      },
      onError: e => {
        console.log(e)
      },
    })

  const handleParticipateEvent = (eventId: EventId) => {
    Notification.requestPermission().then(permission => {
      if (permission === 'granted' || permission === 'default') {
        getNotificationToken()
          .then(token => mutateJoinEvent({ eventId, token }))
          .catch(err => {
            console.log(err)
          })
      }
    })
  }

  const handleCancelEvent = async ({ message }: MessageResponse) => {
    await queryClient.invalidateQueries({
      queryKey: ['eventDetails', eventId],
    })
    showAlert({
      message,
      type: 'success',
      timestamp: 3000,
    })
  }

  const handleDeleteEvent = async ({ message }: MessageResponse) => {
    navigate('/')
    showAlert({
      message,
      type: 'success',
      timestamp: 3000,
    })
  }

  const eventStatusColor = (eventStatus: Status): BootstrapColorOptions => {
    return eventStatus === Status.PENDING
      ? 'secondary'
      : eventStatus === Status.CANCELLED
      ? 'danger'
      : eventStatus === Status.IN_PROGRESS
      ? 'info'
      : eventStatus === Status.FINALIZED
      ? 'success'
      : 'secondary'
  }

  return (
    <div className='d-flex flex-column gap-3 mt-4'>
      <button
        className='btn btn-secondary align-self-start'
        onClick={() => navigate('/')}
        type='button'
        style={{
          padding: '5px 10px 8px 10px',
          textAlign: 'center',
          fontSize: '1.1rem',
        }}
      >
        <AiOutlineArrowLeft />
      </button>

      {isLoading || !event ? (
        <EventDetailsSkeleton />
      ) : (
        <div>
          <div className='d-flex justify-content-between align-items-center mb-3'>
            <div className='d-flex gap-2 align-items-center'>
              <Link to={`/${event.coordinator.account.id}/profile`}>
                <Avatar
                  src={event.coordinator.account.picture}
                  alt={event.coordinator.username}
                  size='60px'
                />
              </Link>
              <div>
                <p className='fs-5 mb-0'>{event.coordinator.username}</p>
                <p className='text-secondary mb-0'>
                  {datetimeFormat(event.createdAt, 'medium', 'medium')}
                </p>
              </div>
            </div>

            <EventOptions
              coordinatorId={event.coordinator.id}
              eventId={event.id}
              eventStatus={event.status}
              onCancel={handleCancelEvent}
              onDelete={handleDeleteEvent}
            />
          </div>

          <p className='fs-3 fw-bold'>{event.name}</p>

          <div className='d-flex flex-wrap gap-2 mb-3'>
            <Tag
              color='primary'
              icon={event.category.picture}
              name={event.category.name}
            />

            <Tag
              color='danger'
              icon='https://www.svgrepo.com/show/387968/local.svg'
              name={event.local}
            />

            <Tag
              color={VisibilityColorValues[event.visibility]}
              icon='https://www.svgrepo.com/show/532493/eye.svg'
              name={VisibilityValues[event.visibility]}
            />

            <Tag
              color='warning'
              icon='https://www.svgrepo.com/show/495575/people.svg'
              name={`Participants: ${event.numberParticipants}`}
            />

            <Tag
              color='success'
              icon='https://www.svgrepo.com/show/502605/date-range.svg'
              name={datetimeFormat(event.realizationDate, 'short', 'short')}
            />

            <Tag
              color='secondary'
              icon='https://www.svgrepo.com/show/411178/finish.svg'
              name={datetimeFormat(event.finishDate, 'short', 'short')}
            />

            <Tag
              color={eventStatusColor(event.status)}
              icon='https://www.svgrepo.com/show/507229/circle.svg'
              name={StatusValues[event.status]}
            />
          </div>

          {event.description && <p>{event.description}</p>}

          {userAuth?.id !== event.coordinator.id ? (
            <button
              className={`btn ${
                event.participating ? 'btn-secondary' : 'btn-primary'
              }`}
              disabled={isPendingJoinEvent}
              onClick={() => handleParticipateEvent(event.id)}
            >
              {event.participating ? 'Participating' : 'Participate'}
            </button>
          ) : null}
        </div>
      )}
    </div>
  )
}

export default EventDetails
