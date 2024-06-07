import { CreateOrganizationUseCase } from '@dobairro/core'

import { PrismaOrganizationRepo } from '@/database/repositories/prisma-organization-repo'

export const makeCreateOrganization = () => {
  const organizationRepo = new PrismaOrganizationRepo()
  return new CreateOrganizationUseCase(organizationRepo)
}
