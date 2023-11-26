import { FC, InputHTMLAttributes, ReactNode } from 'react'

import { UseFormRegister } from 'react-hook-form'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  fullWidth?: boolean
  isError?: boolean
  errorMessage?: string
  adornment?: () => ReactNode
  register: UseFormRegister<any>
  name: string
  label?: string
}

const Input: FC<Props> = ({
  fullWidth,
  adornment,
  register,
  isError,
  errorMessage,
  name,
  label,
  ...props
}) => {
  return (
    <div>
      {label && (
        <label
          htmlFor={props.id}
          className='form-label'
          style={{ marginBottom: 2 }}
        >
          {label}
        </label>
      )}
      <div className='input-group'>
        {adornment && <span className='input-group-text'>{adornment()}</span>}
        <input
          className={`form-control ${fullWidth && 'w-100'} mb-1 ${
            isError && 'is-invalid'
          }`}
          {...register(name, {
            setValueAs: value => {
              if (props.type === 'number') return parseInt(value)
              // if (props.type === 'datetime-local') {
              //   return new Date(value).toISOString()
              // }
              return value
            },
          })}
          {...props}
        />
      </div>
      {isError && <p className='text-danger mb-0'>{errorMessage}</p>}
    </div>
  )
}

export default Input
