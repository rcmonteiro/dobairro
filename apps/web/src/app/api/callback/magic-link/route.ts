import { cookies } from 'next/headers'
import { type NextRequest, NextResponse } from 'next/server'

import { verifyMagicLink } from '@/http/auth/verify-magic-link'

export const GET = async (request: NextRequest) => {
  const MAX_AGE_IN_SECONDS = 60 * 60 * 24 * 7 // 1 week
  const searchParams = request.nextUrl.searchParams
  const token = searchParams.get('token')
  if (!token) {
    return NextResponse.json(
      { message: 'Token was not found' },
      { status: 400 },
    )
  }

  const { access_token } = await verifyMagicLink({ token })
  cookies().set('token', access_token, {
    path: '/',
    httpOnly: true,
    maxAge: MAX_AGE_IN_SECONDS,
  })
  const redirectUrl = request.nextUrl.clone()
  redirectUrl.pathname = '/dashboard'
  redirectUrl.searchParams.delete('token')
  return NextResponse.redirect(redirectUrl)
}
