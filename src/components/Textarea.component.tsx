import { FC, TextareaHTMLAttributes } from 'react'

import { UseFormRegister } from 'react-hook-form'

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  fullWidth?: boolean
  isError?: boolean
  errorMessage?: string
  register: UseFormRegister<any>
  name: string
  label?: string
}

const Textarea: FC<Props> = ({
  fullWidth,
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
      <textarea
        className={`form-control ${fullWidth && 'w-100'} mb-1 ${
          isError && 'is-invalid'
        }`}
        {...props}
        {...register(name)}
      ></textarea>
      {isError && <p className='text-danger'>{errorMessage}</p>}
    </div>
  )
}

export default Textarea
