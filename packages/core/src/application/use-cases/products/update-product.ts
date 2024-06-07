import type { OrganizationRepo } from '@/application/repositories/organization-repo'
import type { ProductRepo } from '@/application/repositories/product-repo'
import { getUserPermissions } from '@/application/shared/get-user-permissions'
import type { Product } from '@/domain/entities/product'
import { Id } from '@/domain/types/id'

import { type Either, left, right } from '../../either'
import { NotAllowedError } from '../_errors/not-allowed-error'
import { ResourceNotFoundError } from '../_errors/resource-not-found-error'

interface UpdateProductUseCaseRequest {
  authenticatedUserId: string
  organizationId: string
  productId: string
  title?: string
  description?: string
  categoryId?: string
  image?: string
  price?: number
}

type UpdateProductUseCaseResponse = Either<
  NotAllowedError | ResourceNotFoundError,
  {
    product: Product
  }
>

export class UpdateProductUseCase {
  constructor(
    private productRepo: ProductRepo,
    private organizationRepo: OrganizationRepo,
  ) {}

  public async execute(
    dto: UpdateProductUseCaseRequest,
  ): Promise<UpdateProductUseCaseResponse> {
    const membership = await this.organizationRepo.getMembership(
      dto.authenticatedUserId,
      dto.organizationId,
    )

    if (!membership) {
      return left(new NotAllowedError())
    }

    const { cannot } = getUserPermissions(
      dto.authenticatedUserId,
      membership.role,
    )

    if (cannot('update', 'Product')) {
      return left(new NotAllowedError('Not allowed to update product'))
    }

    const product = await this.productRepo.findById(
      dto.productId,
      dto.organizationId,
    )

    if (!product) {
      return left(new ResourceNotFoundError())
    }

    product.title = dto.title ?? product.title
    product.description = dto.description ?? product.description
    product.categoryId = dto.categoryId
      ? new Id(dto.categoryId)
      : product.categoryId
    product.price = dto.price ?? product.price

    this.productRepo.save(product)

    return right({ product })
  }
}
