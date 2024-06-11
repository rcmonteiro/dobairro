import { api } from '../api-client'

interface VerifyMagicLinkRequest {
  token: string
}

type VerifyMagicLinkResponse = {
  access_token: string
}

export async function verifyMagicLink({ token }: VerifyMagicLinkRequest) {
  const result = await api
    .post('sessions/magic-link/verify', {
      json: {
        token,
      },
    })
    .json<VerifyMagicLinkResponse>()
  return result
}
