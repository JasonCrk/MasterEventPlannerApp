import { ChangeEvent, FC, SelectHTMLAttributes } from 'react'

import { useQuery } from '@tanstack/react-query'

import { UseFormRegister } from 'react-hook-form'

import { getAllCategories } from '../services/category.service'

import Select from './Select.component'

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  register: UseFormRegister<any>
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void
  errorMessage?: string
  isError?: boolean
  isIdValue?: boolean
}

const SelectCategory: FC<Props> = ({
  register,
  onChange,
  isError,
  errorMessage,
  isIdValue,
  ...selectProps
}) => {
  const { isLoading, data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: () => getAllCategories(),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  })

  if (isLoading)
    return (
      <>
        <label className='form-label'>
          Categorías
          <select className='form-select'>
            <option value={''}>Cargando...</option>
          </select>
        </label>
      </>
    )

  return (
    <Select
      id='selectCategory'
      defaultOption='No selected'
      name='category'
      register={register}
      isLoading={isLoading}
      label='Category'
      onChange={onChange}
      errorMessage={errorMessage}
      isError={isError}
      options={() => (
        <>
          {!isLoading &&
            categories &&
            categories.data.map(category => (
              <option
                key={category.id}
                value={isIdValue ? category.id : category.name}
              >
                {category.name}
              </option>
            ))}
        </>
      )}
      {...selectProps}
    />
  )
}

export default SelectCategory
