import { Member } from '@/domain/entities/member'
import { Id } from '@/domain/types/id'
import { makeNewOrganization } from '@/tests/factories/make-new-organization'
import { InMemoryMemberRepo } from '@/tests/repositories/in-memory-member-repo'
import { InMemoryOrganizationRepo } from '@/tests/repositories/in-memory-organization-repo'
import { InMemoryUserRepo } from '@/tests/repositories/in-memory-user-repo'

import { RemoveMemberUseCase } from './remove-member'

let userRepo: InMemoryUserRepo
let organizationRepo: InMemoryOrganizationRepo
let memberRepo: InMemoryMemberRepo
let sut: RemoveMemberUseCase

describe('Remove member Use case - unit tests', () => {
  beforeEach(() => {
    userRepo = new InMemoryUserRepo()
    organizationRepo = new InMemoryOrganizationRepo()
    memberRepo = new InMemoryMemberRepo()
    sut = new RemoveMemberUseCase(memberRepo, organizationRepo)
  })

  it('should be able to remove member', async () => {
    const { newUser, newOrganization } = makeNewOrganization()
    userRepo.create(newUser)
    organizationRepo.create(newOrganization)
    const [member1] = await Promise.all([
      memberRepo.create(
        Member.create({
          organizationId: newOrganization.id,
          userId: new Id('user-a'),
          role: 'MEMBER',
        }),
      ),
      memberRepo.create(
        Member.create({
          organizationId: newOrganization.id,
          userId: new Id('user-b'),
          role: 'MEMBER',
        }),
      ),
      memberRepo.create(
        Member.create({
          organizationId: newOrganization.id,
          userId: new Id('user-c'),
          role: 'ADMIN',
        }),
      ),
    ])
    const result = await sut.execute({
      authenticatedUserId: newUser.id.toString(),
      organizationId: newOrganization.id.toString(),
      memberId: member1.id.toString(),
    })

    expect(result.isRight()).toBeTruthy()
    expect(memberRepo.items).toHaveLength(2)
  })
})
