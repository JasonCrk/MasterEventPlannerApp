import { useNavigate, useParams } from 'react-router-dom'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { useMutation, useQuery } from '@tanstack/react-query'

import { UpdateEvent, Visibility } from '../models/event.model'

import { getEventById, updateEvent } from '../services/event.service'

import { useAlerts } from '../hooks/useAlerts.hook'

import { updateEventSchemaValidation } from '../validations/event.validation'

import Button from '../components/Button.component'
import Input from '../components/Input.component'
import SelectCategory from '../components/SelectCategory.component'
import Textarea from '../components/Textarea.component'
import IconButton from '../components/IconButton.component'
import EditEventSkeleton from '../components/skeleton/EditEventSkeleton.component'

import { AiOutlineArrowLeft } from 'react-icons/ai'

function EditEvent() {
  const { eventId } = useParams()
  const { showAlert } = useAlerts()

  const navigate = useNavigate()

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm<UpdateEvent>({
    resolver: zodResolver(updateEventSchemaValidation),
  })

  const { data: event, isLoading: isLoadingEvent } = useQuery({
    queryKey: ['eventDetails', eventId],
    queryFn: () => getEventById(eventId!),
    refetchOnWindowFocus: false,
    enabled: eventId !== undefined,
  })

  const { mutate: mutateUpdateEvent, isPending: isPendingUpdateEvent } =
    useMutation({
      mutationFn: updateEvent,
      onSuccess: ({ message }) => {
        navigate('/events/' + eventId)
        showAlert({
          message,
          type: 'success',
          timestamp: 3000,
        })
      },
    })

  const handleEditEvent = handleSubmit(updateEvent => {
    mutateUpdateEvent({ eventId: eventId!, updateEvent })
  })

  if (isLoadingEvent) return <EditEventSkeleton eventId={eventId!} />

  return (
    <form className='mt-4' onSubmit={handleEditEvent}>
      <div className='d-flex justify-content-between align-items-center mb-4'>
        <div className='d-flex gap-2 align-items-center'>
          <IconButton
            icon={<AiOutlineArrowLeft />}
            className='btn btn-secondary'
            onClick={() => navigate(`/events/${eventId}`)}
            type='button'
          />

          <select
            className='form-select'
            {...register('visibility')}
            defaultValue={event?.visibility}
          >
            <option value={Visibility.ONLY_CONNECTIONS.toString()}>
              Only Connections
            </option>
            <option value={Visibility.PUBLIC.toString()}>Public</option>
          </select>
        </div>

        <Button
          btnColor='info'
          className='text-white'
          style={{ padding: '5px 20px' }}
          isLoading={isPendingUpdateEvent}
          type='submit'
        >
          Save Changes
        </Button>
      </div>

      <Input
        name='name'
        register={register}
        errorMessage={errors.name?.message}
        isError={!!errors.name}
        placeholder='Name'
        defaultValue={event?.name}
        style={{ fontSize: '1.4rem' }}
      />

      <div className='container my-2 px-0'>
        <div className='row g-2'>
          <div className='col-6'>
            <SelectCategory
              register={register}
              isIdValue
              defaultValue={event?.category.id}
              errorMessage={errors.category?.message}
              isError={!!errors.category}
              onChange={selectEvent => {
                setValue('category', selectEvent.currentTarget.value)
              }}
            />
          </div>
          <div className='col-6'>
            <Input
              label='Local'
              name='local'
              placeholder='Location address'
              register={register}
              errorMessage={errors.local?.message}
              isError={!!errors.local}
              defaultValue={event?.local}
            />
          </div>
          <div className='col-6'>
            <Input
              label='Realization date'
              name='realizationDate'
              register={register}
              type='datetime-local'
              errorMessage={errors.realizationDate?.message}
              isError={!!errors.realizationDate}
              defaultValue={event?.realizationDate}
            />
          </div>
          <div className='col-6'>
            <Input
              label='Finish date'
              name='finishDate'
              type='datetime-local'
              register={register}
              errorMessage={errors.finishDate?.message}
              isError={!!errors.finishDate}
              defaultValue={event?.finishDate}
            />
          </div>
        </div>
      </div>

      <Textarea
        name='description'
        placeholder='Description'
        register={register}
        errorMessage={errors.description?.message}
        isError={!!errors.description}
        defaultValue={event?.description ?? ''}
        rows={5}
      />
    </form>
  )
}

export default EditEvent
