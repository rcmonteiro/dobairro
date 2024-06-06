import { makeNewUser } from '@/tests/factories/make-new-user'
import { InMemoryOrganizationRepo } from '@/tests/repositories/in-memory-organization-repo'
import { InMemoryUserRepo } from '@/tests/repositories/in-memory-user-repo'

import { SlugAlreadyExistsError } from '../_errors/slug-already-exists-error'
import { CreateOrganizationUseCase } from './create-organization'

let userRepo: InMemoryUserRepo
let organizationRepo: InMemoryOrganizationRepo
let sut: CreateOrganizationUseCase

describe('Create Organization Use case - unit tests', () => {
  beforeEach(() => {
    userRepo = new InMemoryUserRepo()
    organizationRepo = new InMemoryOrganizationRepo()
    sut = new CreateOrganizationUseCase(organizationRepo)
  })

  it('should be able to create a new organization', async () => {
    const newUser = makeNewUser()
    userRepo.create(newUser)
    const result = await sut.execute({
      name: 'Cakes from Doe',
      ownerId: newUser.id.toString(),
    })

    expect(result.isRight()).toBeTruthy()
    expect(organizationRepo.items[0].name).toBe('Cakes from Doe')
    expect(organizationRepo.items[0].members[0].role).toBe('ADMIN')
  })

  it('should not be able to create an organization with the same slug', async () => {
    const newUser = makeNewUser()
    userRepo.create(newUser)
    await sut.execute({
      name: 'Cakes from Doe',
      ownerId: newUser.id.toString(),
    })
    const result = await sut.execute({
      name: 'Cakes from Doe',
      ownerId: newUser.id.toString(),
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(SlugAlreadyExistsError)
  })
})
