import { FC } from 'react'

import { Link } from 'react-router-dom'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { Connection } from '../models/connection.model'

import { useAlerts } from '../hooks/useAlerts.hook'

import { removeConnection } from '../services/connections.service'

import Avatar from './Avatar.component'
import Button from './Button.component'

const ConnectionItem: FC<Connection> = ({ id, user }) => {
  const queryClient = useQueryClient()
  const { showAlert } = useAlerts()

  const {
    isPending: isPendingRemoveConnection,
    mutate: mutateRemoveConnection,
  } = useMutation({
    mutationFn: removeConnection,
    onSuccess: async ({ message }) => {
      await queryClient.invalidateQueries({ queryKey: ['network'] })
      showAlert({
        message,
        type: 'success',
        timestamp: 3000,
      })
    },
  })

  const handleRemoveConnection = () => {
    mutateRemoveConnection(id)
  }

  return (
    <div
      className={'text-center border rounded p-3 bg-white text-dark '}
      style={{
        maxHeight: '300px',
      }}
    >
      <Link to={`/${user.account.id}/profile`}>
        <Avatar alt={user.username} src={user.account.picture} size='100%' />
      </Link>

      <p className='fs-5 my-1 fw-semibold'>{user.username}</p>

      <Button
        isLoading={isPendingRemoveConnection}
        btnColor='danger'
        className='rounded-pill'
        onClick={handleRemoveConnection}
      >
        Remove Connection
      </Button>
    </div>
  )
}

export default ConnectionItem
