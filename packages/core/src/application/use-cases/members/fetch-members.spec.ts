import { Member } from '@/domain/entities/member'
import { Id } from '@/domain/types/id'
import { makeNewOrganization } from '@/tests/factories/make-new-organization'
import { InMemoryMemberRepo } from '@/tests/repositories/in-memory-member-repo'
import { InMemoryOrganizationRepo } from '@/tests/repositories/in-memory-organization-repo'
import { InMemoryUserRepo } from '@/tests/repositories/in-memory-user-repo'

import { NotAllowedError } from '../_errors/not-allowed-error'
import { FetchMembersUseCase } from './fetch-members'

let userRepo: InMemoryUserRepo
let organizationRepo: InMemoryOrganizationRepo
let memberRepo: InMemoryMemberRepo
let sut: FetchMembersUseCase

describe('Fetch Organization Members Use case - unit tests', () => {
  beforeEach(() => {
    userRepo = new InMemoryUserRepo()
    organizationRepo = new InMemoryOrganizationRepo()
    memberRepo = new InMemoryMemberRepo()
    sut = new FetchMembersUseCase(memberRepo, organizationRepo)
  })

  it('should be able to fetch organization members', async () => {
    const { newUser, newOrganization } = makeNewOrganization()
    userRepo.create(newUser)
    organizationRepo.create(newOrganization)
    await Promise.all([
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
    })

    expect(result.isRight()).toBeTruthy()
    if (result.isRight()) {
      expect(result.value.members).toHaveLength(3)
      expect(result.value.members[1].role).toBe('MEMBER')
    }
  })

  it('should not be able to fetch organization members outside of organization', async () => {
    const { newUser, newOrganization } = makeNewOrganization()
    userRepo.create(newUser)
    organizationRepo.create(newOrganization)
    await Promise.all([
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
      authenticatedUserId: 'invalid-user-id',
      organizationId: newOrganization.id.toString(),
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
