import { makeNewOrganization } from '@/tests/factories/make-new-organization'
import { InMemoryCategoryRepo } from '@/tests/repositories/in-memory-category-repo'
import { InMemoryOrganizationRepo } from '@/tests/repositories/in-memory-organization-repo'
import { InMemoryUserRepo } from '@/tests/repositories/in-memory-user-repo'

import { ResourceAlreadyExistsError } from '../_errors/resource-already-exists-error'
import { CreateCategoryUseCase } from './create-category'

let userRepo: InMemoryUserRepo
let organizationRepo: InMemoryOrganizationRepo
let categoryRepo: InMemoryCategoryRepo
let sut: CreateCategoryUseCase

describe('Create Category Use case - unit tests', () => {
  beforeEach(() => {
    userRepo = new InMemoryUserRepo()
    organizationRepo = new InMemoryOrganizationRepo()
    categoryRepo = new InMemoryCategoryRepo()
    sut = new CreateCategoryUseCase(categoryRepo, organizationRepo)
  })

  it('should be able to create a new category', async () => {
    const { newUser, newOrganization } = makeNewOrganization()
    userRepo.create(newUser)
    organizationRepo.create(newOrganization)
    const result = await sut.execute({
      userId: newUser.id.toString(),
      organizationId: newOrganization.id.toString(),
      title: 'Category A',
    })

    expect(result.isRight()).toBeTruthy()
    expect(categoryRepo.items[0].slug._value).toBe('category-a')
  })

  it('should not be able to create a category with the same name', async () => {
    const { newUser, newOrganization } = makeNewOrganization()
    userRepo.create(newUser)
    organizationRepo.create(newOrganization)
    await sut.execute({
      userId: newUser.id.toString(),
      organizationId: newOrganization.id.toString(),
      title: 'Category A',
    })
    const result = await sut.execute({
      userId: newUser.id.toString(),
      organizationId: newOrganization.id.toString(),
      title: 'Category A',
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(ResourceAlreadyExistsError)
  })
})
