import { CreateOrganizationUseCase } from '@dobairro/core'

import { PrismaService } from '@/database/prisma'
import { PrismaOrganizationRepo } from '@/database/repositories/prisma-organization-repo'

export const makeCreateOrganization = () => {
  const organizationRepo = new PrismaOrganizationRepo(
    PrismaService.getInstance(),
  )
  return new CreateOrganizationUseCase(organizationRepo)
}
