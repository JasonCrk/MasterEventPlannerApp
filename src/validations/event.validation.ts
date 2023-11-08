import z from 'zod'

import { Visibility } from '../models/event.model'

export const createEventSchemaValidation = z
  .object({
    name: z
      .string({
        invalid_type_error: 'Must be a text',
        required_error: 'The name is required',
      })
      .min(1, { message: 'The name is required' })
      .max(100, { message: 'Must be a maximum of 150 characters or less' }),
    description: z
      .string({
        invalid_type_error: 'Must be a text',
        required_error: 'The description is required',
      })
      .nullish(),
    category: z
      .string({
        invalid_type_error: 'Must be a text',
        required_error: 'The category is required',
      })
      .uuid({ message: 'The category is invalid' }),
    visibility: z
      .enum([Visibility.ONLY_CONNECTIONS, Visibility.PUBLIC], {
        invalid_type_error: 'The visibility is invalid',
        required_error: 'The visibility is required',
      })
      .default(Visibility.ONLY_CONNECTIONS),
    local: z
      .string({
        invalid_type_error: 'Must be a text',
        required_error: 'The local is required',
      })
      .min(1, { message: 'The local is required' })
      .max(150, { message: 'Must be a maximum of 150 characters or less' }),
    realizationDate: z
      .string({
        invalid_type_error: 'Must be a datetime',
        required_error: 'The realization date is required',
      })
      .datetime({ message: 'Invalid realization date' })
      .refine(realizationDate => new Date(realizationDate) > new Date(), {
        message: 'The realization date must be a greater than the current date',
      }),
    finishDate: z
      .string({
        invalid_type_error: 'Must be a datetime',
        required_error: 'The finish date is required',
      })
      .datetime({ message: 'Invalid finish date' }),
  })
  .refine(
    ({ realizationDate, finishDate }) =>
      new Date(finishDate) > new Date(realizationDate),
    {
      message: 'The finish date must be a greater than the realization date',
      path: ['finishDate'],
    }
  )
