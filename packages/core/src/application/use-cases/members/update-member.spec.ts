import { Member } from '@/domain/entities/member'
import { Id } from '@/domain/types/id'
import { makeNewOrganization } from '@/tests/factories/make-new-organization'
import { InMemoryMemberRepo } from '@/tests/repositories/in-memory-member-repo'
import { InMemoryOrganizationRepo } from '@/tests/repositories/in-memory-organization-repo'
import { InMemoryUserRepo } from '@/tests/repositories/in-memory-user-repo'

import { UpdateMemberUseCase } from './update-member'

let userRepo: InMemoryUserRepo
let memberRepo: InMemoryMemberRepo
let organizationRepo: InMemoryOrganizationRepo
let sut: UpdateMemberUseCase

describe('Update Member Use case - unit tests', () => {
  beforeEach(() => {
    userRepo = new InMemoryUserRepo()
    memberRepo = new InMemoryMemberRepo()
    organizationRepo = new InMemoryOrganizationRepo()
    sut = new UpdateMemberUseCase(memberRepo, organizationRepo)
  })

  it('should be able to update member', async () => {
    const { newUser, newOrganization } = makeNewOrganization()
    userRepo.create(newUser)
    organizationRepo.create(newOrganization)

    const newMember = await memberRepo.create(
      Member.create({
        organizationId: newOrganization.id,
        userId: new Id('user-01'),
        role: 'MEMBER',
      }),
    )

    const result = await sut.execute({
      authenticatedUserId: newUser.id.toString(),
      organizationId: newOrganization.id.toString(),
      memberId: newMember.id.toString(),
      role: 'ADMIN',
    })

    expect(result.isRight()).toBeTruthy()
    if (result.isRight()) {
      expect(result.value.member).toBeInstanceOf(Member)
      expect(result.value.member.role).toBe('ADMIN')
    }
  })
})
