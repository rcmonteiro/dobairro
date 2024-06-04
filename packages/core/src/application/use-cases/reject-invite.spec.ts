import { Invite } from '@/domain/entities/invite'
import { Member } from '@/domain/entities/member'
import { Email } from '@/domain/value-objects/email'
import { makeNewOrganization } from '@/tests/factories/make-new-organization'
import { makeNewUser } from '@/tests/factories/make-new-user'
import { InMemoryInviteRepo } from '@/tests/repositories/in-memory-invite-repo'
import { InMemoryOrganizationRepo } from '@/tests/repositories/in-memory-organization-repo'
import { InMemoryUserRepo } from '@/tests/repositories/in-memory-user-repo'

import { NotAllowedError } from './_errors/not-allowed-error'
import { RejectInviteUseCase } from './reject-invite'

let userRepo: InMemoryUserRepo
let organizationRepo: InMemoryOrganizationRepo
let inviteRepo: InMemoryInviteRepo
let sut: RejectInviteUseCase

describe('Reject Invite Use case - unit tests', () => {
  beforeEach(() => {
    userRepo = new InMemoryUserRepo()
    organizationRepo = new InMemoryOrganizationRepo()
    inviteRepo = new InMemoryInviteRepo()
    sut = new RejectInviteUseCase(inviteRepo, userRepo)
  })

  it('should be able to reject a pending invite', async () => {
    const { newUser, newOrganization } = makeNewOrganization()
    userRepo.create(newUser)
    organizationRepo.create(newOrganization)
    const { id: inviteId } = await inviteRepo.create(
      Invite.create({
        organizationId: newOrganization.id,
        name: 'User 01',
        email: new Email('user1@test.com'),
        role: 'MEMBER',
      }),
    )
    const anotherUser = makeNewUser({ email: new Email('user1@test.com') })
    userRepo.create(anotherUser)
    const result = await sut.execute({
      userId: anotherUser.id.toString(),
      inviteId: inviteId.toString(),
      organizationId: newOrganization.id.toString(),
    })

    expect(result.isRight).toBeTruthy()
    expect(inviteRepo.items).toHaveLength(0)
  })

  it('should not be able to accept a reject invite as a different user', async () => {
    const { newUser, newOrganization } = makeNewOrganization()
    userRepo.create(newUser)

    const anotherUser = makeNewUser()
    userRepo.create(anotherUser)

    const newMember = Member.create({
      organizationId: newOrganization.id,
      userId: anotherUser.id,
      role: 'MEMBER',
    })
    newOrganization.addMember(newMember)
    organizationRepo.create(newOrganization)

    const { id: inviteId } = await inviteRepo.create(
      Invite.create({
        organizationId: newOrganization.id,
        name: 'User 01',
        email: new Email('user1@test.com'),
        role: 'MEMBER',
      }),
    )
    const result = await sut.execute({
      userId: anotherUser.id.toString(),
      inviteId: inviteId.toString(),
      organizationId: newOrganization.id.toString(),
    })

    expect(result.isLeft).toBeTruthy()
    expect(result.value).toBeInstanceOf(NotAllowedError)
    expect(inviteRepo.items).toHaveLength(1)
  })
})
