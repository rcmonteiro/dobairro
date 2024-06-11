'use server'

import { HTTPError } from 'ky'
import { z } from 'zod'

import { signUp } from '@/http/auth/sign-up'

const signUpSchema = z.object({
  name: z.string().refine((value) => value.split(' ').length > 1, {
    message: 'Digite seu nome completo',
  }),
  email: z.string().email({ message: 'Digite um email válido' }),
  street: z.string().min(3, {
    message: 'Digite o nome da sua rua, avenida, etc.',
  }),
  number: z.string().min(1, {
    message: 'Digite o número do seu endereço',
  }),
  city: z.string().min(1, {
    message: 'Digite a sua cidade',
  }),
  state: z.string().min(2, {
    message: 'Digite a sigla do seu estado',
  }),
  zipCode: z.string().min(8, {
    message: 'Digite o seu CEP',
  }),
})

export const signUpAction = async (data: FormData) => {
  const formDataValidationResult = signUpSchema.safeParse(
    Object.fromEntries(data),
  )

  if (!formDataValidationResult.success) {
    const errors = formDataValidationResult.error.flatten().fieldErrors
    return { success: false, message: null, errors }
  }

  const { name, email, city, state, zipCode, street, number } =
    formDataValidationResult.data

  try {
    await signUp({
      name: String(name),
      email: String(email),
      city: String(city),
      state: String(state),
      zipCode: String(zipCode),
      street: String(street),
      number: String(number),
    })
  } catch (error) {
    if (error instanceof HTTPError) {
      const { message } = await error.response.json()
      return { success: false, message, errors: null }
    }
    console.error(error)
    return {
      success: false,
      message: 'An unknown error occurred',
      errors: null,
    }
  }

  return { success: true, message: null, errors: null }
}
