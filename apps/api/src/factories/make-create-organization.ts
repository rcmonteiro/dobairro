import { CreateOrganizationUseCase } from '@dobairro/core'

import { PrismaOrganizationRepo } from '@/repositories/prisma-organization-repo'

export const makeCreateOrganization = () => {
  const organizationRepo = new PrismaOrganizationRepo()
  return new CreateOrganizationUseCase(organizationRepo)
}
