import { ChangeEvent } from 'react'

import { Link } from 'react-router-dom'

import { useQuery } from '@tanstack/react-query'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import {
  SearchEventsParticipatingParams,
  SortByEvents,
} from '../models/event.model'

import { searchEventsParticipating } from '../services/event.service'
import { getAllCategories } from '../services/category.service'

import { searchEventsParticipatingValidation } from '../validations/event.validation'

import EventCard from '../components/EventCard.component'
import EventCardSkeleton from '../components/skeleton/EventCardSkeleton.component'
import Select from '../components/Select.component'

function Home() {
  const { handleSubmit, register, getValues, setValue } =
    useForm<SearchEventsParticipatingParams>({
      resolver: zodResolver(searchEventsParticipatingValidation),
      values: {
        category: undefined,
        sortBy: undefined,
      },
      defaultValues: {
        category: undefined,
        sortBy: undefined,
      },
    })

  const {
    isLoading: isLoadingEvents,
    data: events,
    refetch,
  } = useQuery({
    queryKey: ['home', getValues()],
    queryFn: () => searchEventsParticipating(getValues()),
    refetchOnWindowFocus: false,
  })

  const { isLoading: isLoadingCategories, data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: getAllCategories,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  })

  const handleFilterEvents = handleSubmit(() => refetch())

  return (
    <main className='d-flex mt-4 gap-3'>
      <section className='d-flex flex-column gap-3' style={{ width: '65%' }}>
        {isLoadingEvents || !events ? (
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

            <div className='mb-2'>
              <div className='form-check'>
                <input
                  id='sortByRecent'
                  className='form-check-input'
                  type='radio'
                  defaultChecked
                  value={SortByEvents.RECENT}
                  {...register('sortBy', {
                    onChange: (e: ChangeEvent<HTMLInputElement>) => {
                      handleFilterEvents()
                      setValue('sortBy', e.currentTarget.value)
                    },
                  })}
                />
                <label htmlFor='sortByRecent' className='form-check-label'>
                  Recent
                </label>
              </div>

              <div className='form-check'>
                <input
                  id='sortByUpcoming'
                  className='form-check-input'
                  type='radio'
                  value={SortByEvents.UPCOMING}
                  {...register('sortBy', {
                    onChange: (e: ChangeEvent<HTMLInputElement>) => {
                      handleFilterEvents()
                      setValue('sortBy', e.currentTarget.value)
                    },
                  })}
                />
                <label htmlFor='sortByUpcoming' className='form-check-label'>
                  Upcoming
                </label>
              </div>
            </div>

            <div>
              <Select
                id='selectCategory'
                defaultOption='No selected'
                name='category'
                register={register}
                isLoading={isLoadingCategories}
                label='Category'
                onChange={event => {
                  handleFilterEvents()
                  setValue('category', event.currentTarget.value)
                }}
                options={() => (
                  <>
                    {categories?.data.map(category => (
                      <option key={category.id} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </>
                )}
              />
            </div>
          </form>
        </div>

        <Link to='/create' className='btn btn-primary w-100'>
          New Event
        </Link>
      </aside>
    </main>
  )
}

export default Home
