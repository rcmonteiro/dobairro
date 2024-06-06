import { Organization } from '@/domain/entities/organization'
import { makeNewOrganization } from '@/tests/factories/make-new-organization'
import { InMemoryOrganizationRepo } from '@/tests/repositories/in-memory-organization-repo'

import { NotAllowedError } from '../_errors/not-allowed-error'
import { UpdateOrganizationUseCase } from './update-organization'

let organizationRepo: InMemoryOrganizationRepo
let sut: UpdateOrganizationUseCase

describe('Update Organization Use case - unit tests', () => {
  beforeEach(() => {
    organizationRepo = new InMemoryOrganizationRepo()
    sut = new UpdateOrganizationUseCase(organizationRepo)
  })

  it('should be able to update organization', async () => {
    const { newOrganization, newUser } = makeNewOrganization()
    organizationRepo.create(newOrganization)

    const result = await sut.execute({
      authenticatedUserId: newUser.id.toString(),
      organizationId: newOrganization.id.toString(),
      name: 'Organization with new name',
    })

    expect(result.isRight()).toBeTruthy()
    if (result.isRight()) {
      expect(result.value.organization).toBeInstanceOf(Organization)
      expect(result.value.organization.name).toBe('Organization with new name')
    }
  })

  it('should not be able to update another organization profile', async () => {
    const { newOrganization } = makeNewOrganization()
    organizationRepo.create(newOrganization)

    const { newOrganization: anotherOrganization, newUser: anotherUser } =
      makeNewOrganization()
    organizationRepo.create(anotherOrganization)

    const result = await sut.execute({
      authenticatedUserId: anotherUser.id.toString(),
      organizationId: newOrganization.id.toString(),
      name: 'Organization with new name',
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
