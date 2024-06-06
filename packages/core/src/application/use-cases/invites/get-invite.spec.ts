import { Invite } from '@/domain/entities/invite'
import { Email } from '@/domain/value-objects/email'
import { makeNewOrganization } from '@/tests/factories/make-new-organization'
import { makeNewUser } from '@/tests/factories/make-new-user'
import { InMemoryInviteRepo } from '@/tests/repositories/in-memory-invite-repo'
import { InMemoryOrganizationRepo } from '@/tests/repositories/in-memory-organization-repo'
import { InMemoryUserRepo } from '@/tests/repositories/in-memory-user-repo'

import { NotAllowedError } from '../_errors/not-allowed-error'
import { GetInviteUseCase } from './get-invite'

let inviteRepo: InMemoryInviteRepo
let userRepo: InMemoryUserRepo
let organizationRepo: InMemoryOrganizationRepo
let sut: GetInviteUseCase

describe('Get Invite Use case - unit tests', () => {
  beforeEach(() => {
    inviteRepo = new InMemoryInviteRepo()
    userRepo = new InMemoryUserRepo()
    organizationRepo = new InMemoryOrganizationRepo()
    sut = new GetInviteUseCase(inviteRepo, organizationRepo)
  })

  it('should be able to get invite details', async () => {
    const { newUser, newOrganization } = makeNewOrganization()
    userRepo.create(newUser)
    organizationRepo.create(newOrganization)
    const newInvite = await inviteRepo.create(
      Invite.create({
        organizationId: newOrganization.id,
        name: 'User 01',
        email: new Email('user1@test.com'),
        role: 'MEMBER',
      }),
    )

    const result = await sut.execute({
      authenticatedUserId: newUser.id.toString(),
      organizationId: newOrganization.id.toString(),
      inviteId: newInvite.id.toString(),
    })

    expect(result.isRight).toBeTruthy()
    if (result.isRight()) {
      expect(result.value.invite).toBeInstanceOf(Invite)
      expect(result.value.invite.name).toBe(newInvite.name)
    }
  })

  it('should not be able to get invite outside of organization', async () => {
    const { newUser, newOrganization } = makeNewOrganization()
    userRepo.create(newUser)
    organizationRepo.create(newOrganization)
    const anotherUser = makeNewUser()
    const newInvite = await inviteRepo.create(
      Invite.create({
        organizationId: newOrganization.id,
        name: 'User 01',
        email: new Email('user1@test.com'),
        role: 'MEMBER',
      }),
    )

    const result = await sut.execute({
      authenticatedUserId: anotherUser.id.toString(),
      organizationId: newOrganization.id.toString(),
      inviteId: newInvite.id.toString(),
    })

    expect(result.isLeft).toBeTruthy()
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
