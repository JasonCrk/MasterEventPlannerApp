import { ChangeEvent, FC } from 'react'

import { useQuery } from '@tanstack/react-query'

import { UseFormRegister } from 'react-hook-form'

import { getAllCategories } from '../services/category.service'

import Select from './Select.component'

interface Props {
  register: UseFormRegister<any>
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void
}

const SelectCategory: FC<Props> = ({ register, onChange }) => {
  const { isLoading, data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: () => getAllCategories(),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  })

  return (
    <Select
      id='selectCategory'
      defaultOption='No selected'
      name='category'
      register={register}
      isLoading={isLoading}
      label='Category'
      onChange={onChange}
      options={() => (
        <>
          {categories?.data.map(category => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </>
      )}
    />
  )
}

export default SelectCategory
