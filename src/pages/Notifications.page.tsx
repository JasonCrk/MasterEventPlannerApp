import { useQuery } from '@tanstack/react-query'

import { getAllInvitations } from '../services/invitation.service'

import InvitationItem from '../components/InvitationItem.component'
import InvitationItemSkeleton from '../components/skeleton/InvitationItemSkeleton.component'

function Notifications() {
  const { isLoading, data: invitations } = useQuery({
    queryKey: ['notifications'],
    queryFn: () => getAllInvitations(),
    refetchOnWindowFocus: false,
  })

  return (
    <div className='d-flex flex-column mt-4'>
      {isLoading || !invitations ? (
        [...Array(6)].map(() => (
          <InvitationItemSkeleton key={crypto.randomUUID()} />
        ))
      ) : invitations.data.length > 0 ? (
        invitations.data.map(invitation => (
          <InvitationItem {...invitation} key={invitation.id} />
        ))
      ) : (
        <h4 className='text-center'>No tienes ninguna notificación</h4>
      )}
    </div>
  )
}

export default Notifications
