import { VerifyMagicLinkUseCase } from '@dobairro/core'

import { PrismaService } from '@/database/prisma'
import { PrismaUserRepo } from '@/database/repositories/prisma-user-repo'
import { JwtTokenService } from '@/services/jwt-token-service'

export const makeVerifyMagicLink = () => {
  const jwtTokenService = new JwtTokenService()
  const userRepo = new PrismaUserRepo(PrismaService.getInstance())
  return new VerifyMagicLinkUseCase(userRepo, jwtTokenService)
}
