import { FC, ReactNode } from 'react'

import { UseFormRegister } from 'react-hook-form'

interface Props {
  isLoading?: boolean
  register: UseFormRegister<any>
  name: string
  errorMessage?: string
  isError?: boolean
  options: () => ReactNode
  defaultOption: string
  label?: string
}

const Select: FC<Props> = ({
  name,
  register,
  errorMessage,
  isError,
  isLoading,
  defaultOption,
  label,
  options,
}) => {
  return (
    <div>
      {label && (
        <label className='form-label' style={{ marginBottom: 2 }}>
          {label}
        </label>
      )}
      <select
        className={`form-select ${isError && 'is-invalid'}`}
        disabled={isLoading}
        {...register(name)}
      >
        <option value={undefined}>{defaultOption}</option>
        {!isLoading && options()}
      </select>
      {isError && <p className='text-danger mb-0'>{errorMessage}</p>}
    </div>
  )
}

export default Select
