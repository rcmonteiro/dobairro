'use server'

import { HTTPError } from 'ky'
import { z } from 'zod'

import { signIn } from '@/http/auth/sign-in'

const signInSchema = z.object({
  email: z.string().email({ message: 'Digite um email válido' }),
})

export const signInAction = async (data: FormData) => {
  const formDataValidationResult = signInSchema.safeParse(
    Object.fromEntries(data),
  )

  if (!formDataValidationResult.success) {
    const errors = formDataValidationResult.error.flatten().fieldErrors
    return { success: false, message: null, errors }
  }

  const { email } = formDataValidationResult.data

  try {
    await signIn({
      email: String(email),
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

  return { success: true, message: 'Veja a sua caixa de entrada', errors: null }
}
