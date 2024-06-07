import type { OrganizationRepo } from '@/application/repositories/organization-repo'
import type { ProductRepo } from '@/application/repositories/product-repo'
import { getUserPermissions } from '@/application/shared/get-user-permissions'
import type { Product } from '@/domain/entities/product'

import { type Either, left, right } from '../../either'
import { NotAllowedError } from '../_errors/not-allowed-error'
import { ResourceNotFoundError } from '../_errors/resource-not-found-error'

interface GetProductUseCaseRequest {
  authenticatedUserId: string
  organizationId: string
  productId: string
}

type GetProductUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    product: Product
  }
>

export class GetProductUseCase {
  constructor(
    private productRepo: ProductRepo,
    private organizationRepo: OrganizationRepo,
  ) {}

  public async execute(
    dto: GetProductUseCaseRequest,
  ): Promise<GetProductUseCaseResponse> {
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

    if (cannot('get', 'Product')) {
      return left(new NotAllowedError('Not allowed to get product info'))
    }

    const product = await this.productRepo.findById(
      dto.productId,
      dto.organizationId,
    )

    if (!product) {
      return left(new ResourceNotFoundError())
    }

    return right({ product })
  }
}
