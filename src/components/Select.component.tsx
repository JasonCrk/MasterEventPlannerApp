import { ChangeEvent, FC, ReactNode, SelectHTMLAttributes } from 'react'

import { UseFormRegister } from 'react-hook-form'

interface Props extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'name'> {
  isLoading?: boolean
  register: UseFormRegister<any>
  name: string
  errorMessage?: string
  isError?: boolean
  options: () => ReactNode
  defaultOption: string
  label?: string
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void
}

const Select: FC<Props> = ({
  id,
  name,
  register,
  errorMessage,
  isError,
  isLoading,
  defaultOption,
  label,
  options,
  onChange,
  ...selectProps
}) => {
  return (
    <div>
      {label && (
        <label htmlFor={id} className='form-label' style={{ marginBottom: 2 }}>
          {label}
        </label>
      )}

      <select
        id={id}
        className={`form-select ${isError && 'is-invalid'}`}
        disabled={isLoading}
        {...register(name, onChange && { onChange })}
        {...selectProps}
      >
        <option value={''}>{defaultOption}</option>
        {!isLoading && options()}
      </select>

      {isError && <p className='text-danger mb-0'>{errorMessage}</p>}
    </div>
  )
}

export default Select
