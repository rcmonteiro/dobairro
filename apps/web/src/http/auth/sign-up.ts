import { api } from '../api-client'

interface SignUpRequest {
  name: string
  email: string
  city: string
  state: string
  zipCode: string
  street: string
  number: string
}

type SignUpResponse = void

export async function signUp({
  name,
  email,
  city,
  state,
  zipCode,
  street,
  number,
}: SignUpRequest): Promise<SignUpResponse> {
  await api.post('users', {
    json: {
      name,
      email,
      city,
      state,
      zipCode,
      street,
      number,
    },
  })
}
