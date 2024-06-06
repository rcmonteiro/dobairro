import { Organization } from '@/domain/entities/organization'
import { makeNewOrganization } from '@/tests/factories/make-new-organization'
import { makeNewUser } from '@/tests/factories/make-new-user'
import { InMemoryOrganizationRepo } from '@/tests/repositories/in-memory-organization-repo'
import { InMemoryUserRepo } from '@/tests/repositories/in-memory-user-repo'

import { NotAllowedError } from '../_errors/not-allowed-error'
import { GetOrganizationUseCase } from './get-organization'

let organizationRepo: InMemoryOrganizationRepo
let userRepo: InMemoryUserRepo
let sut: GetOrganizationUseCase

describe('Get Organization Use case - unit tests', () => {
  beforeEach(() => {
    organizationRepo = new InMemoryOrganizationRepo()
    userRepo = new InMemoryUserRepo()
    sut = new GetOrganizationUseCase(organizationRepo)
  })

  it('should be able to get organization', async () => {
    const { newUser, newOrganization } = makeNewOrganization()
    userRepo.create(newUser)
    organizationRepo.create(newOrganization)

    const result = await sut.execute({
      authenticatedUserId: newUser.id.toString(),
      organizationId: newOrganization.id.toString(),
    })

    expect(result.isRight()).toBeTruthy()
    if (result.isRight()) {
      expect(result.value.organization).toBeInstanceOf(Organization)
      expect(result.value.organization.name).toBe(newOrganization.name)
    }
  })

  it('should not be able to get organization outside of organization', async () => {
    const newUser = makeNewUser()
    userRepo.create(newUser)
    const result = await sut.execute({
      authenticatedUserId: newUser.id.toString(),
      organizationId: 'inexistent-organization-id',
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
