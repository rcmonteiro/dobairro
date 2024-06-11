import { Product } from '@/domain/entities/product'
import { Id } from '@/domain/types/id'
import { Slug } from '@/domain/value-objects/slug'
import { makeNewOrganization } from '@/tests/factories/make-new-organization'
import { InMemoryOrganizationRepo } from '@/tests/repositories/in-memory-organization-repo'
import { InMemoryProductRepo } from '@/tests/repositories/in-memory-product-repo'
import { InMemoryUserRepo } from '@/tests/repositories/in-memory-user-repo'

import { GetProductUseCase } from './get-product'

let productRepo: InMemoryProductRepo
let userRepo: InMemoryUserRepo
let organizationRepo: InMemoryOrganizationRepo
let sut: GetProductUseCase

describe('Get Product Use case - unit tests', () => {
  beforeEach(() => {
    productRepo = new InMemoryProductRepo()
    userRepo = new InMemoryUserRepo()
    organizationRepo = new InMemoryOrganizationRepo()
    sut = new GetProductUseCase(productRepo, organizationRepo)
  })

  it('should be able to get product details', async () => {
    const { newUser, newOrganization } = makeNewOrganization()
    userRepo.create(newUser)
    organizationRepo.create(newOrganization)
    const newProduct = await productRepo.create(
      Product.create({
        organizationId: newOrganization.id,
        title: 'Product A',
        slug: Slug.createFromText('Product A'),
        description: 'Product A description',
        categoryId: new Id(),
        price: 15000,
      }),
    )

    const result = await sut.execute({
      authenticatedUserId: newUser.id.toString(),
      organizationId: newOrganization.id.toString(),
      productId: newProduct.id.toString(),
    })

    expect(result.isRight()).toBeTruthy()
    if (result.isRight()) {
      expect(result.value.product).toBeInstanceOf(Product)
      expect(result.value.product.slug._value).toBe('product-a')
    }
  })
})
