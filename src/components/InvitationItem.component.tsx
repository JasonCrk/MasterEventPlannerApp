import { FC, useState } from 'react'

import { Link } from 'react-router-dom'

import { useMutation } from '@tanstack/react-query'

import { InvitationResponse } from '../models/invitation.model'

import {
  acceptInvitation,
  rejectInvitation,
} from '../services/invitation.service'

import Avatar from './Avatar.component'
import IconButton from './IconButton.component'

import { datetimeFormat } from '../utils/datetimeFormat'

import { IoMdCheckmark } from 'react-icons/io'
import { AiOutlineClose } from 'react-icons/ai'

const InvitationItem: FC<InvitationResponse> = ({
  id: invitationId,
  user,
  notifiedAt,
}) => {
  const [isAccepted, setIsAccepted] = useState<boolean | null>(null)

  const {
    isPending: isPendingAcceptInvitation,
    mutate: mutateAcceptInvitation,
  } = useMutation({
    mutationFn: acceptInvitation,
    onSuccess: () => setIsAccepted(true),
  })

  const {
    isPending: isPendingRejectInvitation,
    mutate: mutateRejectInvitation,
  } = useMutation({
    mutationFn: rejectInvitation,
    onSuccess: () => setIsAccepted(false),
  })

  const handleAcceptInvitation = () => {
    mutateAcceptInvitation(invitationId)
  }

  const handleRejectInvitation = () => {
    mutateRejectInvitation(invitationId)
  }

  return (
    <div
      className={`card ${
        isAccepted !== null &&
        (isAccepted ? 'bg-success-subtle' : 'bg-danger-subtle')
      }`}
    >
      <div className='card-body d-flex align-items-center justify-content-between'>
        <div className='d-flex align-items-center gap-2'>
          <Link to={`/${user.id}/profile`}>
            <Avatar
              size='55px'
              src={user.account.picture}
              alt={user.username}
              className='border border-secondary'
            />
          </Link>
          <div>
            <p className='mb-0' style={{ fontSize: '1.05rem' }}>
              <Link
                to={`/${user.account.id}/profile`}
                className='fw-bold link-offset-1 link-offset-1-hover link-underline link-underline-opacity-0 link-underline-opacity-100-hover text-dark link-secondary'
              >
                {user.username}
              </Link>{' '}
              quiere conectarse con usted
            </p>
            <p className='mb-0' style={{ fontSize: '0.9rem' }}>
              {datetimeFormat(notifiedAt, 'short', 'medium')}
            </p>
          </div>
        </div>

        {isAccepted === null ? (
          <div className='d-flex justify-content-center align-items-center gap-2'>
            <IconButton
              icon={<IoMdCheckmark />}
              className='btn-success'
              onClick={handleAcceptInvitation}
              disabled={isPendingRejectInvitation || isPendingAcceptInvitation}
            />
            <IconButton
              icon={<AiOutlineClose />}
              className='btn-danger'
              onClick={handleRejectInvitation}
              disabled={isPendingRejectInvitation || isPendingAcceptInvitation}
            />
          </div>
        ) : isAccepted ? (
          <span className='badge bg-success fs-6'>Accepted</span>
        ) : (
          <span className='badge bg-danger fs-6'>Rejected</span>
        )}
      </div>
    </div>
  )
}

export default InvitationItem
