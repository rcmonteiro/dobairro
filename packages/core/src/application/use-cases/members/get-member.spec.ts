import { Member } from '@/domain/entities/member'
import { Id } from '@/domain/types/id'
import { makeNewOrganization } from '@/tests/factories/make-new-organization'
import { makeNewUser } from '@/tests/factories/make-new-user'
import { InMemoryMemberRepo } from '@/tests/repositories/in-memory-member-repo'
import { InMemoryOrganizationRepo } from '@/tests/repositories/in-memory-organization-repo'
import { InMemoryUserRepo } from '@/tests/repositories/in-memory-user-repo'

import { NotAllowedError } from '../_errors/not-allowed-error'
import { GetMemberUseCase } from './get-member'

let memberRepo: InMemoryMemberRepo
let userRepo: InMemoryUserRepo
let organizationRepo: InMemoryOrganizationRepo
let sut: GetMemberUseCase

describe('Get Member Use case - unit tests', () => {
  beforeEach(() => {
    memberRepo = new InMemoryMemberRepo()
    userRepo = new InMemoryUserRepo()
    organizationRepo = new InMemoryOrganizationRepo()
    sut = new GetMemberUseCase(memberRepo, organizationRepo)
  })

  it('should be able to get member details', async () => {
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
    })

    expect(result.isRight()).toBeTruthy()
    if (result.isRight()) {
      expect(result.value.member).toBeInstanceOf(Member)
      expect(result.value.member.role).toBe('MEMBER')
    }
  })

  it('should not be able to get member outside of organization', async () => {
    const { newUser, newOrganization } = makeNewOrganization()
    userRepo.create(newUser)
    organizationRepo.create(newOrganization)
    const anotherUser = makeNewUser()
    const newMember = await memberRepo.create(
      Member.create({
        organizationId: newOrganization.id,
        userId: new Id('user-01'),
        role: 'MEMBER',
      }),
    )

    const result = await sut.execute({
      authenticatedUserId: anotherUser.id.toString(),
      organizationId: newOrganization.id.toString(),
      memberId: newMember.id.toString(),
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
