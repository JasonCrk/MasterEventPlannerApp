import { Link, useSearchParams } from 'react-router-dom'

import { useQuery } from '@tanstack/react-query'

import { useForm } from 'react-hook-form'

import { SearchEventsParams } from '../models/event.model'

import { searchEvents } from '../services/event.service'

import EventCardSkeleton from '../components/skeleton/EventCardSkeleton.component'
import EventCard from '../components/EventCard.component'
import SelectCategory from '../components/SelectCategory.component'

function SearchEvents() {
  const [searchParams, setSearchParams] = useSearchParams()

  const { handleSubmit, register, setValue } = useForm<SearchEventsParams>({
    defaultValues: {
      searchQuery: searchParams.get('q') ?? '',
    },
  })

  const {
    data: events,
    isLoading: isLoadingEvents,
    isRefetching,
  } = useQuery({
    queryKey: [
      'search',
      { q: searchParams.get('q'), category: searchParams.get('category') },
    ],
    queryFn: () => searchEvents(searchParams),
    enabled: searchParams.get('q') !== null || searchParams.get('q') !== '',
    refetchOnWindowFocus: false,
  })

  const handleSearchEvents = handleSubmit(data => {
    const searchQuery = searchParams.get('q')
    if (searchQuery !== null) {
      if (data.category && data.category !== null) {
        setSearchParams({ q: searchQuery, category: data.category })
        return
      }

      setSearchParams({ q: searchQuery })
    }
  })

  return (
    <main className='d-flex mt-4 gap-3'>
      <section className='d-flex flex-column gap-3' style={{ width: '65%' }}>
        {isRefetching ? (
          <div>Nada</div>
        ) : isLoadingEvents || !events ? (
          [...Array(3)].map(() => (
            <EventCardSkeleton key={crypto.randomUUID()} width='100%' />
          ))
        ) : events.data.length > 0 ? (
          events.data.map(event => (
            <EventCard key={event.id} {...event} width='100%' />
          ))
        ) : (
          <h5 className='text-center'>No events found</h5>
        )}
      </section>

      <aside style={{ width: '35%' }}>
        <div className='card mb-2'>
          <form className='card-body'>
            <h5 className='mb-1'>Filters</h5>
            <SelectCategory
              register={register}
              onChange={event => {
                setValue('category', event.currentTarget.value)
                handleSearchEvents()
              }}
            />
          </form>
        </div>

        <Link to='/create' className='btn btn-primary w-100'>
          New Event
        </Link>
      </aside>
    </main>
  )
}

export default SearchEvents
