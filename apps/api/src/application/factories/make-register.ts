import { RegisterUseCase } from '@dobairro/core'

import { PrismaService } from '@/database/prisma'
import { PrismaUserRepo } from '@/database/repositories/prisma-user-repo'

export const makeRegister = () => {
  const userRepo = new PrismaUserRepo(PrismaService.getInstance())
  return new RegisterUseCase(userRepo)
}
