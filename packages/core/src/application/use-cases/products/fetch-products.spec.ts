import { Product } from '@/domain/entities/product'
import { Id } from '@/domain/types/id'
import { Slug } from '@/domain/value-objects/slug'
import { makeNewOrganization } from '@/tests/factories/make-new-organization'
import { InMemoryOrganizationRepo } from '@/tests/repositories/in-memory-organization-repo'
import { InMemoryProductRepo } from '@/tests/repositories/in-memory-product-repo'
import { InMemoryUserRepo } from '@/tests/repositories/in-memory-user-repo'

import { FetchProductsUseCase } from './fetch-products'

let userRepo: InMemoryUserRepo
let organizationRepo: InMemoryOrganizationRepo
let productRepo: InMemoryProductRepo
let sut: FetchProductsUseCase

describe('Fetch Organization Products Use case - unit tests', () => {
  beforeEach(() => {
    userRepo = new InMemoryUserRepo()
    organizationRepo = new InMemoryOrganizationRepo()
    productRepo = new InMemoryProductRepo()
    sut = new FetchProductsUseCase(productRepo, organizationRepo)
  })

  it('should be able to create a new product', async () => {
    const { newUser, newOrganization } = makeNewOrganization()
    userRepo.create(newUser)
    organizationRepo.create(newOrganization)
    productRepo.create(
      Product.create({
        organizationId: newOrganization.id,
        title: 'Product A',
        slug: Slug.createFromText('Product A'),
        description: 'Product A description',
        categoryId: new Id(),
        price: 15000,
      }),
    )
    productRepo.create(
      Product.create({
        organizationId: newOrganization.id,
        title: 'Product B',
        slug: Slug.createFromText('Product B'),
        description: 'Product B description',
        categoryId: new Id(),
        price: 11000,
      }),
    )
    const result = await sut.execute({
      authenticatedUserId: newUser.id.toString(),
      organizationId: newOrganization.id.toString(),
    })

    expect(result.isRight()).toBeTruthy()
    if (result.isRight()) {
      expect(result.value.products).toHaveLength(2)
      expect(result.value.products[1].slug._value).toBe('product-b')
    }
  })
})
