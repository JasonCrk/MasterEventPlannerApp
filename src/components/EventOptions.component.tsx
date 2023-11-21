import { FC } from 'react'

import { Link } from 'react-router-dom'

import { useMutation } from '@tanstack/react-query'

import { EventId, Status } from '../models/event.model'
import { UserId } from '../models/user.model'
import { MessageResponse } from '../models/response.model'

import { useAuthStore } from '../store/useAuthStorage'

import { cancelEvent, deleteEvent } from '../services/event.service'

import { SlOptionsVertical } from 'react-icons/sl'

interface Props {
  coordinatorId: UserId
  eventId: EventId
  eventStatus: Status
  onCancel: (data: MessageResponse) => void
  onDelete: (data: MessageResponse) => void
}

const EventOptions: FC<Props> = ({
  coordinatorId,
  eventId,
  eventStatus,
  onCancel,
  onDelete,
}) => {
  const user = useAuthStore(state => state.user)

  const { isPending: isPendingDeleteEvent, mutate: mutateDeleteEvent } =
    useMutation({
      mutationFn: deleteEvent,
      onSuccess: data => {
        onDelete(data)
      },
      onError: e => {
        console.error(e)
      },
    })

  const { isPending: isPendingCancelEvent, mutate: mutateCancelEvent } =
    useMutation({
      mutationFn: cancelEvent,
      onSuccess: data => {
        onCancel(data)
      },
      onError: e => {
        console.error(e)
      },
    })

  const handleDeleteEvent = () => {
    mutateDeleteEvent(eventId)
  }

  const handleCancelEvent = () => {
    mutateCancelEvent(eventId)
  }

  if (user?.id !== coordinatorId) return null

  return (
    <div className='dropdown'>
      <button
        className='btn btn-light rounded-circle border-none pb-2'
        data-bs-toggle='dropdown'
        aria-expanded='false'
        disabled={isPendingDeleteEvent || isPendingCancelEvent}
      >
        <SlOptionsVertical />
      </button>

      <ul className='dropdown-menu dropdown-menu-end mt-1'>
        <li>
          <Link className='dropdown-item' to={`/events/${eventId}/edit`}>
            Edit
          </Link>
        </li>

        {eventStatus === Status.CANCELLED ? (
          <li>
            <button
              className='dropdown-item bg-danger text-white'
              disabled={isPendingCancelEvent || isPendingDeleteEvent}
              onClick={() => handleDeleteEvent()}
            >
              Delete
            </button>
          </li>
        ) : (
          <li>
            <button
              className='dropdown-item bg-danger text-white'
              disabled={isPendingCancelEvent || isPendingDeleteEvent}
              onClick={() => handleCancelEvent()}
            >
              Cancel
            </button>
          </li>
        )}
      </ul>
    </div>
  )
}

export default EventOptions
