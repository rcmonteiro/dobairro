import { api } from '../api-client'

interface SignInRequest {
  email: string
}

type SignInResponse = void

export async function signIn({
  email,
}: SignInRequest): Promise<SignInResponse> {
  await api.post('sessions/magic-link', {
    json: {
      email,
    },
  })
}
