import { Product } from '@/domain/entities/product'

import { type Either, left, right } from '../../either'
import type { OrganizationRepo } from '../../repositories/organization-repo'
import type { ProductRepo } from '../../repositories/product-repo'
import { getUserPermissions } from '../../shared/get-user-permissions'
import { NotAllowedError } from '../_errors/not-allowed-error'

interface FetchProductsUseCaseRequest {
  authenticatedUserId: string
  organizationId: string
}

type FetchProductsUseCaseResponse = Either<
  NotAllowedError,
  {
    products: Product[]
  }
>

export class FetchProductsUseCase {
  constructor(
    private productRepo: ProductRepo,
    private organizationRepo: OrganizationRepo,
  ) {}

  public async execute(
    dto: FetchProductsUseCaseRequest,
  ): Promise<FetchProductsUseCaseResponse> {
    const membership = await this.organizationRepo.getMembership(
      dto.authenticatedUserId,
      dto.organizationId,
    )

    if (!membership) {
      return left(new NotAllowedError())
    }

    const { cannot } = getUserPermissions(
      dto.authenticatedUserId.toString(),
      membership.role,
    )

    if (cannot('get', 'Product')) {
      return left(new NotAllowedError('Not allowed to create a product'))
    }

    const products = await this.productRepo.findManyByOrg(dto.organizationId)

    return right({ products })
  }
}
