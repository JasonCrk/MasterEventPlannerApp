import { FC, InputHTMLAttributes, ReactNode } from 'react'

import { UseFormRegister } from 'react-hook-form'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  fullWidth?: boolean
  isError?: boolean
  errorMessage?: string
  adornment?: () => ReactNode
  register: UseFormRegister<any>
  name: string
}

const Input: FC<Props> = ({
  fullWidth,
  adornment,
  register,
  isError,
  errorMessage,
  name,
  ...props
}) => {
  return (
    <div className='input-group'>
      {adornment && <span className='input-group-text'>{adornment()}</span>}

      <input
        className={`form-control ${fullWidth && 'w-100'} ${
          isError && 'is-invalid'
        }`}
        {...props}
        {...register(name, { valueAsNumber: props.type === 'number' })}
      />

      {isError && <p className='text-danger mb-1'>{errorMessage}</p>}
    </div>
  )
}

export default Input
