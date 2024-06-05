import { Category } from '@/domain/entities/category'

import { type Either, left, right } from '../either'
import type { CategoryRepo } from '../repositories/category-repo'
import type { OrganizationRepo } from '../repositories/organization-repo'
import { getUserPermissions } from '../shared/get-user-permissions'
import { NotAllowedError } from './_errors/not-allowed-error'

interface FetchCategoriesUseCaseRequest {
  userId: string
  organizationId: string
}

type FetchCategoriesUseCaseResponse = Either<
  NotAllowedError,
  {
    categories: Category[]
  }
>

export class FetchCategoriesUseCase {
  constructor(
    private categoryRepo: CategoryRepo,
    private organizationRepo: OrganizationRepo,
  ) {}

  public async execute(
    dto: FetchCategoriesUseCaseRequest,
  ): Promise<FetchCategoriesUseCaseResponse> {
    const membership = await this.organizationRepo.getMembership(
      dto.userId,
      dto.organizationId,
    )

    if (!membership) {
      return left(new NotAllowedError())
    }

    const { cannot } = getUserPermissions(
      dto.userId.toString(),
      membership.role,
    )

    if (cannot('get', 'Category')) {
      return left(new NotAllowedError('Not allowed to create a category'))
    }

    const categories = await this.categoryRepo.findManyByOrg(dto.organizationId)

    return right({ categories })
  }
}
