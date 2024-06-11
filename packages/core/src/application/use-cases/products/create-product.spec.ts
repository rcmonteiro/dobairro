import { Id } from '@/domain/types/id'
import { makeNewOrganization } from '@/tests/factories/make-new-organization'
import { InMemoryOrganizationRepo } from '@/tests/repositories/in-memory-organization-repo'
import { InMemoryProductRepo } from '@/tests/repositories/in-memory-product-repo'
import { InMemoryUserRepo } from '@/tests/repositories/in-memory-user-repo'

import { ResourceAlreadyExistsError } from '../_errors/resource-already-exists-error'
import { CreateProductUseCase } from './create-product'

let userRepo: InMemoryUserRepo
let organizationRepo: InMemoryOrganizationRepo
let productRepo: InMemoryProductRepo
let sut: CreateProductUseCase

describe('Create Product Use case - unit tests', () => {
  beforeEach(() => {
    userRepo = new InMemoryUserRepo()
    organizationRepo = new InMemoryOrganizationRepo()
    productRepo = new InMemoryProductRepo()
    sut = new CreateProductUseCase(productRepo, organizationRepo)
  })

  it('should be able to create a new product', async () => {
    const { newUser, newOrganization } = makeNewOrganization()
    userRepo.create(newUser)
    organizationRepo.create(newOrganization)
    const result = await sut.execute({
      authenticatedUserId: newUser.id.toString(),
      organizationId: newOrganization.id.toString(),
      title: 'Product A',
      description: 'Product A description',
      categoryId: new Id().toString(),
      price: 15000,
    })

    expect(result.isRight()).toBeTruthy()
    expect(productRepo.items[0].slug._value).toBe('product-a')
  })

  it('should not be able to create a product with the same name', async () => {
    const { newUser, newOrganization } = makeNewOrganization()
    userRepo.create(newUser)
    organizationRepo.create(newOrganization)
    await sut.execute({
      authenticatedUserId: newUser.id.toString(),
      organizationId: newOrganization.id.toString(),
      title: 'Product A',
      description: 'Product A description',
      categoryId: new Id().toString(),
      price: 15000,
    })
    const result = await sut.execute({
      authenticatedUserId: newUser.id.toString(),
      organizationId: newOrganization.id.toString(),
      title: 'Product A',
      description: 'Product A description',
      categoryId: new Id().toString(),
      price: 15000,
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(ResourceAlreadyExistsError)
  })
})
