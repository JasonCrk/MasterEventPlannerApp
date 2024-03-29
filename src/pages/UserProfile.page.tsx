import { ChangeEvent } from 'react'

import { useParams } from 'react-router-dom'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { UserId } from '../models/user.model'
import { AccountId } from '../models/account.model'
import { InvitationStatus } from '../models/invitation.model'
import { BootstrapColorOptions } from '../models/bootstrap.model'

import { useAuthStore } from '../store/useAuthStorage'

import { updateProfile, getProfile } from '../services/account.service'
import { sendInvitation } from '../services/invitation.service'
import { retrieveUserEvents } from '../services/event.service'

import { useAlerts } from '../hooks/useAlerts.hook'

import ProfileSkeleton from '../components/skeleton/ProfileSkeleton.component'
import EditProfileModal from '../components/EditProfileModal.component'
import IconButton from '../components/IconButton.component'
import EventCardSkeleton from '../components/skeleton/EventCardSkeleton.component'
import EventCard from '../components/EventCard.component'
import Avatar from '../components/Avatar.component'
import Button from '../components/Button.component'

import { FiEdit } from 'react-icons/fi'

function UserProfile() {
  const user = useAuthStore(state => state.user)
  const queryClient = useQueryClient()

  const { accountId } = useParams()
  const { showAlert } = useAlerts()

  const { data: account, isLoading: isLoadingProfile } = useQuery({
    queryKey: ['profile', accountId],
    queryFn: ({ queryKey }) => getProfile(queryKey[1] as AccountId),
    enabled: Boolean(accountId),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  })

  const { data: userEvents, isLoading: isLoadingUserEvents } = useQuery({
    queryKey: ['userEvents', account?.user.id],
    queryFn: ({ queryKey }) => retrieveUserEvents(queryKey[1] as UserId),
    enabled: Boolean(account?.user.id),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  })

  const { mutate: mutateUpdateProfile, isPending: isPendingUpdateAccount } =
    useMutation({
      mutationFn: updateProfile,
      onSuccess: async ({ message }) => {
        await queryClient.invalidateQueries({
          queryKey: ['profile', accountId],
        })
        showAlert({
          message,
          type: 'success',
          timestamp: 3000,
        })
      },
    })

  const { mutate: mutateSendInvitation, isPending: isPendingSendInvitation } =
    useMutation({
      mutationFn: sendInvitation,
      onSuccess: async ({ message }) => {
        await queryClient.invalidateQueries({
          queryKey: ['profile', accountId],
        })
        showAlert({
          message,
          type: 'success',
          timestamp: 3000,
        })
      },
    })

  const handleUpdatePicture = (e: ChangeEvent<HTMLInputElement>) => {
    const picture = e.target.files?.item(0)
    if (picture) {
      const updatePictureData = new FormData()
      updatePictureData.append('picture', picture)

      mutateUpdateProfile(updatePictureData)
    }
  }

  const handleUpdateBanner = (e: ChangeEvent<HTMLInputElement>) => {
    const banner = e.target.files?.item(0)
    if (banner) {
      const updateBannerData = new FormData()
      updateBannerData.append('banner', banner)

      mutateUpdateProfile(updateBannerData)
    }
  }

  const handleSendInvitation = (
    invitationStatus: InvitationStatus | null,
    userId: UserId
  ) => {
    if (invitationStatus === null) {
      mutateSendInvitation(userId)
    }
  }

  const isOwner = account?.user.id === user?.id

  const invitationColorStatus: BootstrapColorOptions =
    account?.invitationSent === InvitationStatus.PENDING
      ? 'secondary'
      : account?.invitationSent === InvitationStatus.ACCEPTED
      ? 'success'
      : 'primary'

  if (isLoadingProfile || !account) return <ProfileSkeleton />

  return (
    <>
      <EditProfileModal accountAbout={account.about} accountId={account.id} />

      <section className='mb-4'>
        <div
          className='position-relative bg-dark-subtle'
          style={{ height: '200px' }}
        >
          {!isPendingUpdateAccount && (
            <img
              src={
                account.banner ??
                'https://cld.accentuate.io/280453120189/1653332172009/all_collection_background_d.png?v=1653342169075&options=f_webp,q_90,w_1024'
              }
              alt={account.user.username}
              className='w-100 object-fit-cover h-100'
            />
          )}

          {isOwner && (
            <>
              <label
                htmlFor='banner'
                className={`position-absolute top-0 end-0 mt-3 me-3 btn rounded-circle ${
                  isPendingUpdateAccount
                    ? 'btn-outline-secondary disabled'
                    : 'btn-secondary'
                }`}
                style={{
                  padding: '5px 10px 8px 10px',
                  textAlign: 'center',
                  fontSize: '1.1rem',
                }}
              >
                <FiEdit />
              </label>
              <input
                id='banner'
                type='file'
                accept='.jpg, .png, .jpeg'
                style={{ display: 'none' }}
                onChange={handleUpdateBanner}
              />
            </>
          )}

          <div
            className='position-absolute'
            style={{
              bottom: -90,
              left: 40,
            }}
          >
            <div
              className='position-relative rounded-circle bg-dark'
              style={{ width: '180px', height: '180px' }}
            >
              {!isPendingUpdateAccount && (
                <Avatar
                  size='180px'
                  src={account.picture}
                  alt={account.user.username}
                  className='border border-dark border-2'
                />
              )}

              {isOwner && (
                <>
                  <label
                    htmlFor='picture'
                    className={`position-absolute bottom-0 end-0 z-1 btn rounded-circle ${
                      isPendingUpdateAccount
                        ? 'btn-secondary disabled'
                        : 'btn-secondary'
                    }`}
                    style={{
                      padding: '5px 10px 8px 10px',
                      textAlign: 'center',
                      fontSize: '1.1rem',
                    }}
                  >
                    <FiEdit />
                  </label>
                  <input
                    id='picture'
                    type='file'
                    accept='.jpg, .png, .jpeg'
                    style={{ display: 'none' }}
                    onChange={handleUpdatePicture}
                  />
                </>
              )}
            </div>
          </div>
        </div>

        <div
          className='container-lg px-5 position-relative'
          style={{ paddingTop: '100px' }}
        >
          {isOwner && (
            <IconButton
              icon={<FiEdit />}
              data-bs-toggle='modal'
              data-bs-target='#editProfile'
              roundedCircle
              className='btn-secondary position-absolute top-0 end-0 mt-3 me-3'
            />
          )}

          <h1 className='fs-2'>{account.user.username}</h1>

          {account.about && <p>{account.about}</p>}

          {!isOwner && (
            <Button
              btnColor={invitationColorStatus}
              onClick={() =>
                handleSendInvitation(account.invitationSent, account.user.id)
              }
              isLoading={isPendingSendInvitation}
              disabled={
                account.invitationSent === InvitationStatus.PENDING ||
                account.invitationSent === InvitationStatus.ACCEPTED
              }
            >
              {account.invitationSent === InvitationStatus.PENDING
                ? 'Invitation sent'
                : account.invitationSent === InvitationStatus.ACCEPTED
                ? 'Connected'
                : 'Send invitation'}
            </Button>
          )}
        </div>
      </section>

      <section className='d-flex flex-column gap-2'>
        {isLoadingUserEvents || !userEvents ? (
          [...Array(3)].map(() => (
            <EventCardSkeleton key={crypto.randomUUID()} width='100%' />
          ))
        ) : userEvents?.data.length > 0 ? (
          userEvents.data.map(event => (
            <EventCard key={event.id} width='100%' {...event} />
          ))
        ) : (
          <h5 className='text-center text-secondary'>No public events</h5>
        )}
      </section>
    </>
  )
}

export default UserProfile
