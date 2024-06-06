import { Invite } from '@/domain/entities/invite'
import { Email } from '@/domain/value-objects/email'
import { makeNewOrganization } from '@/tests/factories/make-new-organization'
import { InMemoryInviteRepo } from '@/tests/repositories/in-memory-invite-repo'
import { InMemoryOrganizationRepo } from '@/tests/repositories/in-memory-organization-repo'
import { InMemoryUserRepo } from '@/tests/repositories/in-memory-user-repo'

import { FetchOrganizationInvitesUseCase } from './fetch-user-invites'

let userRepo: InMemoryUserRepo
let organizationRepo: InMemoryOrganizationRepo
let inviteRepo: InMemoryInviteRepo
let sut: FetchOrganizationInvitesUseCase

describe('Fetch Organization Invites Use case - unit tests', () => {
  beforeEach(() => {
    userRepo = new InMemoryUserRepo()
    organizationRepo = new InMemoryOrganizationRepo()
    inviteRepo = new InMemoryInviteRepo()
    sut = new FetchOrganizationInvitesUseCase(inviteRepo, organizationRepo)
  })

  it('should be able to fetch all organization invites', async () => {
    const { newUser, newOrganization } = makeNewOrganization()
    userRepo.create(newUser)
    organizationRepo.create(newOrganization)
    inviteRepo.create(
      Invite.create({
        organizationId: newOrganization.id,
        name: 'User 01',
        email: new Email('user1@test.com'),
        role: 'MEMBER',
      }),
    )
    inviteRepo.create(
      Invite.create({
        organizationId: newOrganization.id,
        name: 'User 02',
        email: new Email('user2@test.com'),
        role: 'ADMIN',
      }),
    )
    inviteRepo.create(
      Invite.create({
        organizationId: newOrganization.id,
        name: 'User 03',
        email: new Email('user3@test.com'),
        role: 'MEMBER',
      }),
    )
    const result = await sut.execute({
      userId: newUser.id.toString(),
      organizationId: newOrganization.id.toString(),
    })

    expect(result.isRight).toBeTruthy()
    if (result.isRight()) {
      expect(result.value?.invites).toHaveLength(3)
      expect(inviteRepo.items[1].role).toBe('ADMIN')
    }
  })
})
