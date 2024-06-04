import { makeNewOrganization } from '@/tests/factories/make-new-organization'
import { InMemoryInviteRepo } from '@/tests/repositories/in-memory-invite-repo'
import { InMemoryOrganizationRepo } from '@/tests/repositories/in-memory-organization-repo'
import { InMemoryUserRepo } from '@/tests/repositories/in-memory-user-repo'

import { ResourceAlreadyExistsError } from './_errors/user-already-exists-error copy'
import { CreateInviteUseCase } from './create-invite'

let userRepo: InMemoryUserRepo
let organizationRepo: InMemoryOrganizationRepo
let inviteRepo: InMemoryInviteRepo
let sut: CreateInviteUseCase

describe('Create Invite Use case - unit tests', () => {
  beforeEach(() => {
    userRepo = new InMemoryUserRepo()
    organizationRepo = new InMemoryOrganizationRepo()
    inviteRepo = new InMemoryInviteRepo()
    sut = new CreateInviteUseCase(inviteRepo)
  })

  it('should be able to create a new invite', async () => {
    const { newUser, newOrganization } = makeNewOrganization()
    userRepo.create(newUser)
    organizationRepo.create(newOrganization)
    const result = await sut.execute({
      name: newUser.name,
      email: newUser.email.value,
      organizationId: newOrganization.id,
      role: 'ADMIN',
    })

    expect(result.isRight).toBeTruthy()
    expect(inviteRepo.items[0].role).toBe('ADMIN')
  })

  it('should not be able to create a invite with the same e-mail', async () => {
    const { newUser, newOrganization } = makeNewOrganization()
    userRepo.create(newUser)
    organizationRepo.create(newOrganization)
    await sut.execute({
      name: newUser.name,
      email: newUser.email.value,
      organizationId: newOrganization.id,
      role: 'ADMIN',
    })
    const result = await sut.execute({
      name: newUser.name,
      email: newUser.email.value,
      organizationId: newOrganization.id,
      role: 'MEMBER',
    })

    expect(result.isLeft).toBeTruthy()
    expect(result.value).toBeInstanceOf(ResourceAlreadyExistsError)
  })
})
