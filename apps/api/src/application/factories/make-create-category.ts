import { CreateCategoryUseCase } from '@dobairro/core'

import { PrismaService } from '@/database/prisma'
import { PrismaCategoryRepo } from '@/database/repositories/prisma-category-repo'
import { PrismaOrganizationRepo } from '@/database/repositories/prisma-organization-repo'

export const makeCreateCategory = () => {
  const organizationRepo = new PrismaOrganizationRepo(
    PrismaService.getInstance(),
  )
  const categoryRepo = new PrismaCategoryRepo(PrismaService.getInstance())
  return new CreateCategoryUseCase(categoryRepo, organizationRepo)
}
