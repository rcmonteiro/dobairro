import { Category } from '@/domain/entities/category'
import { Id } from '@/domain/types/id'
import { Slug } from '@/domain/value-objects/slug'

import { type Either, left, right } from '../../either'
import type { CategoryRepo } from '../../repositories/category-repo'
import type { OrganizationRepo } from '../../repositories/organization-repo'
import { getUserPermissions } from '../../shared/get-user-permissions'
import { NotAllowedError } from '../_errors/not-allowed-error'
import { ResourceAlreadyExistsError } from '../_errors/resource-already-exists-error'

interface CreateCategoryUseCaseRequest {
  userId: string
  organizationId: string
  title: string
}

type CreateCategoryUseCaseResponse = Either<
  ResourceAlreadyExistsError | NotAllowedError,
  {
    category: Category
  }
>

export class CreateCategoryUseCase {
  constructor(
    private categoryRepo: CategoryRepo,
    private organizationRepo: OrganizationRepo,
  ) {}

  public async execute(
    dto: CreateCategoryUseCaseRequest,
  ): Promise<CreateCategoryUseCaseResponse> {
    const membership = await this.organizationRepo.getMembership(
      dto.userId,
      dto.organizationId,
    )

    const slug = Slug.createFromText(dto.title)

    if (!membership) {
      return left(new NotAllowedError())
    }

    const { cannot } = getUserPermissions(
      dto.userId.toString(),
      membership.role,
    )

    if (cannot('create', 'Category')) {
      return left(new NotAllowedError('Not allowed to create a category'))
    }

    const categoryWithSameSlug = await this.categoryRepo.findBySlug(
      slug._value,
      dto.organizationId,
    )

    if (categoryWithSameSlug) {
      return left(new ResourceAlreadyExistsError())
    }

    const newCategory = Category.create({
      organizationId: new Id(dto.organizationId),
      title: dto.title,
      slug,
    })

    const category = await this.categoryRepo.create(newCategory)

    return right({ category })
  }
}
