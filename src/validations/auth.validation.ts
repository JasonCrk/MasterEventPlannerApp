import z from 'zod'

export const loginValidationSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'The email must be a text',
    })
    .email({ message: 'The email is invalid' }),
  password: z
    .string({
      required_error: 'Password is required',
      invalid_type_error: 'The Password must be a text',
    })
    .min(5, { message: 'Must be a 5 or more characters long' }),
})

export const registerValidationSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'The email must be a text',
    })
    .email({ message: 'The email is invalid' })
    .max(100, { message: 'Must be a 100 or fewer characters long' }),
  username: z
    .string({
      required_error: 'Username is required',
      invalid_type_error: 'The username must be a text',
    })
    .max(60, { message: 'Must be a 60 or fewer characters long' })
    .min(3, { message: 'Must be a 3 or more characters long' }),
  password: z
    .string({
      required_error: 'Password is required',
      invalid_type_error: 'The password must be a text',
    })
    .min(5, { message: 'Must be a 5 or more characters long' }),
})
