import { FC } from 'react'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { AccountAbout, AccountId, EditAccount } from '../models/account.model'

import { updateProfile } from '../services/account.service'

import { useAlerts } from '../hooks/useAlerts.hook'

import { editAccountSchemaValidation } from '../validations/account.validation'

import Textarea from './Textarea.component'
import Button from './Button.component'

interface Props {
  accountId: AccountId
  accountAbout: AccountAbout
}

const EditProfileModal: FC<Props> = ({ accountId, accountAbout }) => {
  const { showAlert } = useAlerts()
  const queryClient = useQueryClient()

  const { isPending, mutate: mutateEditProfile } = useMutation({
    mutationFn: updateProfile,
    onSuccess: ({ message }) => {
      queryClient.invalidateQueries({ queryKey: ['profile', accountId] })
      showAlert({
        message,
        type: 'success',
        timestamp: 3000,
      })
    },
    onError: err => {
      showAlert({
        message: err.message,
        type: 'danger',
        timestamp: 4000,
      })
    },
  })

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<Pick<EditAccount, 'about'>>({
    resolver: zodResolver(editAccountSchemaValidation),
    defaultValues: {
      about: accountAbout ?? '',
    },
  })

  const handleEditModal = handleSubmit(data => {
    const updateAccountData = new FormData()
    if (data.about) updateAccountData.append('about', data.about)

    mutateEditProfile(updateAccountData)
  })

  return (
    <div
      className='modal fade'
      id='editProfile'
      tabIndex={-1}
      aria-labelledby='editProfile'
      aria-hidden='true'
    >
      <div className='modal-dialog'>
        <form className='modal-content' onSubmit={handleEditModal}>
          <div className='modal-header'>
            <h2 className='modal-title fs-5'>Edit Account</h2>
            <button
              type='button'
              className='btn-close'
              data-bs-dismiss='modal'
              aria-label='Close'
              onClick={() =>
                reset({
                  about: accountAbout,
                })
              }
            ></button>
          </div>

          <div className='modal-body'>
            <Textarea
              label='About'
              rows={4}
              register={register}
              name='about'
              errorMessage={errors.about?.message}
              isError={!!errors.about}
            />
          </div>

          <div className='modal-footer'>
            <Button btnColor='info' type='submit' isLoading={isPending}>
              Update
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditProfileModal
