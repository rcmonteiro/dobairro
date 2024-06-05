import { Category } from '@/domain/entities/category'
import { Slug } from '@/domain/value-objects/slug'
import { makeNewOrganization } from '@/tests/factories/make-new-organization'
import { InMemoryCategoryRepo } from '@/tests/repositories/in-memory-category-repo'
import { InMemoryOrganizationRepo } from '@/tests/repositories/in-memory-organization-repo'
import { InMemoryUserRepo } from '@/tests/repositories/in-memory-user-repo'

import { FetchCategoriesUseCase } from './fetch-categories'

let userRepo: InMemoryUserRepo
let organizationRepo: InMemoryOrganizationRepo
let categoryRepo: InMemoryCategoryRepo
let sut: FetchCategoriesUseCase

describe('Fetch Organization Categories Use case - unit tests', () => {
  beforeEach(() => {
    userRepo = new InMemoryUserRepo()
    organizationRepo = new InMemoryOrganizationRepo()
    categoryRepo = new InMemoryCategoryRepo()
    sut = new FetchCategoriesUseCase(categoryRepo, organizationRepo)
  })

  it('should be able to create a new category', async () => {
    const { newUser, newOrganization } = makeNewOrganization()
    userRepo.create(newUser)
    organizationRepo.create(newOrganization)
    categoryRepo.create(
      Category.create({
        organizationId: newOrganization.id,
        title: 'Category A',
        slug: Slug.createFromText('Category A'),
      }),
    )
    categoryRepo.create(
      Category.create({
        organizationId: newOrganization.id,
        title: 'Category B',
        slug: Slug.createFromText('Category B'),
      }),
    )
    const result = await sut.execute({
      userId: newUser.id.toString(),
      organizationId: newOrganization.id.toString(),
    })

    expect(result.isRight).toBeTruthy()
    if (result.isRight()) {
      expect(result.value.categories).toHaveLength(2)
      expect(result.value.categories[1].slug._value).toBe('category-b')
    }
  })
})
