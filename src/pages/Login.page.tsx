import { Link, useNavigate } from 'react-router-dom'

import { useForm, SubmitHandler } from 'react-hook-form'

import { useMutation } from '@tanstack/react-query'

import { zodResolver } from '@hookform/resolvers/zod'

import { LoginCredentials } from '../models/auth.model'

import { useAuthStore } from '../store/useAuthStorage'

import { login } from '../services/auth.service'

import { loginValidationSchema } from '../validations/auth.validation'

import Input from '../components/Input.component'
import Button from '../components/Button.component'

function Login() {
  const navigate = useNavigate()
  const { setAuthTokens, setIsAuth } = useAuthStore()

  const { mutate: mutateLogin, isPending } = useMutation({
    mutationFn: login,
    onSuccess(tokens) {
      localStorage.setItem('accessToken', tokens.accessToken)
      localStorage.setItem('refreshToken', tokens.refreshToken)

      setAuthTokens(tokens)
      setIsAuth(true)

      navigate('/')
    },
  })

  const {
    handleSubmit,
    register: formRegister,
    formState: { errors },
  } = useForm<LoginCredentials>({
    resolver: zodResolver(loginValidationSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const handleSubmitLogin: SubmitHandler<
    LoginCredentials
  > = async credentials => {
    mutateLogin(credentials)
  }

  return (
    <div style={{ width: '35%' }}>
      <h1 className='text-center mb-2'>Master Planner Event</h1>

      <form
        className='d-flex flex-column gap-2'
        onSubmit={handleSubmit(handleSubmitLogin)}
      >
        <Input
          id='email'
          name='email'
          type='email'
          placeholder='Email'
          register={formRegister}
          isError={!!errors.email}
          errorMessage={errors.email?.message}
          fullWidth
        />

        <Input
          id='password'
          name='password'
          type='password'
          placeholder='Password'
          register={formRegister}
          isError={!!errors.password}
          errorMessage={errors.password?.message}
          fullWidth
        />

        <div className='d-flex flex-column gap-2 align-items-center'>
          <Button btnColor='primary' isLoading={isPending} type='submit'>
            Login
          </Button>

          <p>
            You don't have an account? Sign up{' '}
            <Link to='/auth/register' className='link-offset-1'>
              HERE
            </Link>
          </p>
        </div>
      </form>
    </div>
  )
}

export default Login
