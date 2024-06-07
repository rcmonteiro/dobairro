import { CreateCategoryUseCase } from '@dobairro/core'

import { PrismaCategoryRepo } from '@/database/repositories/prisma-category-repo'
import { PrismaOrganizationRepo } from '@/database/repositories/prisma-organization-repo'

export const makeCreateCategory = () => {
  const organizationRepo = new PrismaOrganizationRepo()
  const categoryRepo = new PrismaCategoryRepo()
  return new CreateCategoryUseCase(categoryRepo, organizationRepo)
}
