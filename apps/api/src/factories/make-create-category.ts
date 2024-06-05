import { CreateCategoryUseCase } from '@dobairro/core'

import { PrismaCategoryRepo } from '@/repositories/prisma-category-repo'
import { PrismaOrganizationRepo } from '@/repositories/prisma-organization-repo'

export const makeCreateCategory = () => {
  const organizationRepo = new PrismaOrganizationRepo()
  const categoryRepo = new PrismaCategoryRepo()
  return new CreateCategoryUseCase(categoryRepo, organizationRepo)
}
