import { Product } from '@/domain/entities/product'
import { Id } from '@/domain/types/id'
import { Slug } from '@/domain/value-objects/slug'

import { type Either, left, right } from '../../either'
import type { OrganizationRepo } from '../../repositories/organization-repo'
import type { ProductRepo } from '../../repositories/product-repo'
import { getUserPermissions } from '../../shared/get-user-permissions'
import { NotAllowedError } from '../_errors/not-allowed-error'
import { ResourceAlreadyExistsError } from '../_errors/resource-already-exists-error'

interface CreateProductUseCaseRequest {
  authenticatedUserId: string
  organizationId: string
  title: string
  description: string
  categoryId: string
  image?: string
  price: number
}

type CreateProductUseCaseResponse = Either<
  ResourceAlreadyExistsError | NotAllowedError,
  {
    product: Product
  }
>

export class CreateProductUseCase {
  constructor(
    private productRepo: ProductRepo,
    private organizationRepo: OrganizationRepo,
  ) {}

  public async execute(
    dto: CreateProductUseCaseRequest,
  ): Promise<CreateProductUseCaseResponse> {
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

    if (cannot('create', 'Product')) {
      return left(new NotAllowedError('Not allowed to create a product'))
    }

    const slug = Slug.createFromText(dto.title)

    const productWithSameSlug = await this.productRepo.findBySlug(
      slug._value,
      dto.organizationId,
    )

    if (productWithSameSlug) {
      return left(new ResourceAlreadyExistsError())
    }

    const newProduct = Product.create({
      organizationId: new Id(dto.organizationId),
      title: dto.title,
      slug,
      description: dto.description,
      categoryId: new Id(dto.categoryId),
      price: dto.price,
    })

    const product = await this.productRepo.create(newProduct)

    return right({ product })
  }
}
