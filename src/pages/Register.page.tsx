import { Link, useNavigate } from 'react-router-dom'

import { useForm, SubmitHandler } from 'react-hook-form'

import { useMutation } from '@tanstack/react-query'

import { zodResolver } from '@hookform/resolvers/zod'

import { useAuthStore } from '../store/useAuthStorage'

import { RegisterCredentials } from '../models/auth.model'

import { registerUser } from '../services/auth.service'

import { registerValidationSchema } from '../validations/auth.validation'

import Input from '../components/Input.component'
import Button from '../components/Button.component'

function Register() {
  const navigate = useNavigate()
  const { setAuthTokens, setIsAuth } = useAuthStore()

  const { mutate: mutateRegisterUser, isPending } = useMutation({
    mutationFn: registerUser,
    onSuccess(data) {
      localStorage.setItem('accessToken', data.accessToken)
      localStorage.setItem('refreshToken', data.refreshToken)

      setAuthTokens(data)
      setIsAuth(true)

      navigate('/')
    },
  })

  const {
    handleSubmit,
    register: formRegister,
    formState: { errors },
  } = useForm<RegisterCredentials>({
    resolver: zodResolver(registerValidationSchema),
    defaultValues: {
      email: '',
      password: '',
      username: '',
    },
  })

  const handleSubmitRegister: SubmitHandler<
    RegisterCredentials
  > = async credentials => {
    mutateRegisterUser(credentials)
  }

  return (
    <div style={{ width: '35%' }}>
      <h1 className='text-center mb-2'>Master Planner Event</h1>

      <form
        className='d-flex flex-column gap-2'
        onSubmit={handleSubmit(handleSubmitRegister)}
      >
        <Input
          placeholder='Username'
          name='username'
          register={formRegister}
          isError={!!errors.username}
          errorMessage={errors.username?.message}
          fullWidth
        />

        <Input
          type='email'
          placeholder='Email'
          name='email'
          register={formRegister}
          isError={!!errors.email}
          errorMessage={errors.email?.message}
          fullWidth
        />

        <Input
          type='password'
          placeholder='Password'
          name='password'
          register={formRegister}
          isError={!!errors.password}
          errorMessage={errors.password?.message}
          fullWidth
        />

        <div className='d-flex flex-column gap-2 align-items-center'>
          <Button btnColor='primary' isLoading={isPending} type='submit'>
            Register
          </Button>

          <p>
            Are you registered? Sign in{' '}
            <Link to='/auth/login' className='link-offset-1'>
              HERE
            </Link>
          </p>
        </div>
      </form>
    </div>
  )
}

export default Register
