import { AuthenticateMagicLinkUseCase } from '@dobairro/core'

import { PrismaService } from '@/database/prisma'
import { PrismaUserRepo } from '@/database/repositories/prisma-user-repo'
import { JwtTokenService } from '@/services/jwt-token-service'
import { ResendEmailService } from '@/services/resend-email-service'

export const makeSignInMagicLink = () => {
  const jwtTokenService = new JwtTokenService()
  const userRepo = new PrismaUserRepo(PrismaService.getInstance())
  const emailService = new ResendEmailService()
  return new AuthenticateMagicLinkUseCase(
    userRepo,
    jwtTokenService,
    emailService,
  )
}
