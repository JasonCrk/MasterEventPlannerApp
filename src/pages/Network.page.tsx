import { useQuery } from '@tanstack/react-query'

import { getAllConnections } from '../services/connections.service'

import ConnectionItem from '../components/ConnectionItem.component'
import ConnectionItemSkeleton from '../components/skeleton/ConnectionItemSkeleton.component'

function Network() {
  const { data: connections, isLoading } = useQuery({
    queryKey: ['network'],
    queryFn: () => getAllConnections(),
    refetchOnWindowFocus: false,
  })

  return (
    <div className='container mt-4'>
      <div className='row'>
        {isLoading || !connections ? (
          [...Array(8)].map(() => (
            <div className='col-3' key={crypto.randomUUID()}>
              <ConnectionItemSkeleton />
            </div>
          ))
        ) : connections.data.length > 0 ? (
          connections.data.map(connection => (
            <div className='col-3' key={connection.id}>
              <ConnectionItem {...connection} />
            </div>
          ))
        ) : (
          <h5 className='text-center text-danger'>
            You don't have connections
          </h5>
        )}
      </div>
    </div>
  )
}

export default Network
