import { Invite } from '@/domain/entities/invite'
import { Email } from '@/domain/value-objects/email'
import { makeNewOrganization } from '@/tests/factories/make-new-organization'
import { makeNewUser } from '@/tests/factories/make-new-user'
import { InMemoryInviteRepo } from '@/tests/repositories/in-memory-invite-repo'
import { InMemoryOrganizationRepo } from '@/tests/repositories/in-memory-organization-repo'
import { InMemoryUserRepo } from '@/tests/repositories/in-memory-user-repo'

import { FetchUserInvitesUseCase } from './fetch-user-invites'

let userRepo: InMemoryUserRepo
let organizationRepo: InMemoryOrganizationRepo
let inviteRepo: InMemoryInviteRepo
let sut: FetchUserInvitesUseCase

describe('Fetch User Invites Use case - unit tests', () => {
  beforeEach(() => {
    userRepo = new InMemoryUserRepo()
    organizationRepo = new InMemoryOrganizationRepo()
    inviteRepo = new InMemoryInviteRepo()
    sut = new FetchUserInvitesUseCase(inviteRepo, userRepo)
  })

  it('should be able to fetch all user pending invites', async () => {
    const orgData1 = makeNewOrganization()
    const orgData2 = makeNewOrganization({
      ownerId: orgData1.newUser.id,
    })
    const sutUser = makeNewUser({ email: new Email('user1@test.com') })
    userRepo.create(sutUser)
    userRepo.create(orgData1.newUser)
    organizationRepo.create(orgData1.newOrganization)
    organizationRepo.create(orgData2.newOrganization)
    await inviteRepo.create(
      Invite.create({
        organizationId: orgData1.newOrganization.id,
        name: 'User 01',
        email: new Email('user1@test.com'),
        role: 'MEMBER',
      }),
    )
    await inviteRepo.create(
      Invite.create({
        organizationId: orgData2.newOrganization.id,
        name: 'User 01',
        email: new Email('user1@test.com'),
        role: 'ADMIN',
      }),
    )

    const result = await sut.execute({
      userId: sutUser.id.toString(),
    })

    expect(result.isRight()).toBeTruthy()
    if (result.isRight()) {
      expect(result.value?.invites).toHaveLength(2)
      expect(inviteRepo.items[1].role).toBe('ADMIN')
    }
  })
})
