import type { OrganizationRepo } from '@/application/repositories/organization-repo'
import type { ProductRepo } from '@/application/repositories/product-repo'
import { getUserPermissions } from '@/application/shared/get-user-permissions'

import { type Either, left, right } from '../../either'
import { NotAllowedError } from '../_errors/not-allowed-error'
import { ResourceNotFoundError } from '../_errors/resource-not-found-error'

interface DeleteProductUseCaseRequest {
  authenticatedUserId: string
  organizationId: string
  productId: string
}

type DeleteProductUseCaseResponse = Either<
  NotAllowedError | ResourceNotFoundError,
  null
>

export class DeleteProductUseCase {
  constructor(
    private productRepo: ProductRepo,
    private organizationRepo: OrganizationRepo,
  ) {}

  public async execute(
    dto: DeleteProductUseCaseRequest,
  ): Promise<DeleteProductUseCaseResponse> {
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

    if (cannot('delete', 'Product')) {
      return left(new NotAllowedError('Not allowed to delete product'))
    }

    const product = await this.productRepo.findById(
      dto.productId,
      dto.organizationId,
    )

    if (!product) {
      return left(new ResourceNotFoundError())
    }

    this.productRepo.delete(product)

    return right(null)
  }
}
