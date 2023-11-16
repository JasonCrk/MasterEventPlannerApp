import { FC } from 'react'
import { UserId } from '../models/user.model'

interface Props {
  username: string
  userId: UserId
  avatar: string
}

const ConnectionItem: FC<Props> = props => {
  return (
    <div
      className={'text-center border rounded p-3 bg-dark text-white '}
      style={{
        maxHeight: '300px',
        maxWidth: '220px',
      }}
    >
      <img
        alt={props.username}
        src={props.avatar}
        className={'img-thumbnail rounded-circle'}
        style={{ maxWidth: '150px', maxHeight: '150px' }}
      ></img>
      <div className={'mt-1'}>
        <span>{props.username}</span>
      </div>
      <button className={'btn btn-danger mt-2 btn-sm rounded-pill'}>
        Remove Conection
      </button>
    </div>
  )
}

export default ConnectionItem
