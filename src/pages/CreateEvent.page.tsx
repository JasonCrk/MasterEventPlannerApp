import { useContext } from 'react'

import { useNavigate } from 'react-router-dom'

import { useMutation } from '@tanstack/react-query'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { CreateEventData, Visibility } from '../models/event.model'

import { alertContext } from '../context/alert'

import { scheduleEvent } from '../services/event.service'

import { createEventSchemaValidation } from '../validations/event.validation'

import Input from '../components/Input.component'
import Textarea from '../components/Textarea.component'
import Button from '../components/Button.component'
import SelectCategory from '../components/SelectCategory.component'

import { AiOutlineArrowLeft } from 'react-icons/ai'

function CreateEvent() {
  const { showAlert: showToast } = useContext(alertContext)

  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<CreateEventData>({
    resolver: zodResolver(createEventSchemaValidation),
  })

  const { isPending, mutate: scheduleEventMutate } = useMutation({
    mutationFn: scheduleEvent,
    onSuccess: data => {
      showToast({
        message: data.message,
        type: 'success',
        timestamp: 4000,
      })
      reset()
    },
  })

  const handleCreateEvent = handleSubmit(data => {
    scheduleEventMutate(data)
  })

  return (
    <form className='mt-4' onSubmit={handleCreateEvent}>
      <div className='d-flex justify-content-between align-items-center mb-4'>
        <div className='d-flex gap-2 align-items-center'>
          <button
            className='btn btn-secondary'
            onClick={() => navigate(-1)}
            type='button'
            style={{
              padding: '5px 10px 8px 10px',
              textAlign: 'center',
              fontSize: '1.1rem',
            }}
          >
            <AiOutlineArrowLeft />
          </button>

          <select
            className='form-select'
            {...register('visibility')}
            defaultValue={Visibility.ONLY_CONNECTIONS}
          >
            <option value={Visibility.ONLY_CONNECTIONS}>
              Only Connections
            </option>
            <option value={Visibility.PUBLIC}>Public</option>
          </select>
        </div>

        <Button
          btnColor='primary'
          style={{ padding: '5px 20px' }}
          isLoading={isPending}
          type='submit'
        >
          Save
        </Button>
      </div>

      <Input
        name='name'
        register={register}
        errorMessage={errors.name?.message}
        isError={!!errors.name}
        placeholder='Name'
        style={{ fontSize: '1.4rem' }}
      />

      <div className='container my-2 px-0'>
        <div className='row g-2'>
          <div className='col-6'>
            <SelectCategory
              register={register}
              isIdValue
              errorMessage={errors.category?.message}
              isError={!!errors.category}
              onChange={event => {
                setValue('category', event.currentTarget.value)
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
            />
          </div>
          <div className='col-6'>
            <Input
              label='Realization date'
              name='realizationDate'
              min={new Date().toUTCString()}
              register={register}
              type='datetime-local'
              errorMessage={errors.realizationDate?.message}
              isError={!!errors.realizationDate}
            />
          </div>
          <div className='col-6'>
            <Input
              label='Finish date'
              name='finishDate'
              min={new Date().toUTCString()}
              type='datetime-local'
              register={register}
              errorMessage={errors.finishDate?.message}
              isError={!!errors.finishDate}
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
        rows={5}
      />
    </form>
  )
}

export default CreateEvent
