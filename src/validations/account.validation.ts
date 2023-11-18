import z from 'zod'

export const editAccountSchemaValidation = z.object({
  about: z
    .string({
      invalid_type_error: 'Must be a text',
      required_error: 'The about is required',
    })
    .max(250, {
      message: 'Must be a maximum of 250 characters or less',
    })
    .nullish(),
})
