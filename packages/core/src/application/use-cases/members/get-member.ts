import type { MemberRepo } from '@/application/repositories/member-repo'
import type { OrganizationRepo } from '@/application/repositories/organization-repo'
import { getUserPermissions } from '@/application/shared/get-user-permissions'
import type { Member } from '@/domain/entities/member'

import { type Either, left, right } from '../../either'
import { NotAllowedError } from '../_errors/not-allowed-error'
import { ResourceNotFoundError } from '../_errors/resource-not-found-error'

interface GetMemberUseCaseRequest {
  authenticatedUserId: string
  organizationId: string
  memberId: string
}

type GetMemberUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    member: Member
  }
>

export class GetMemberUseCase {
  constructor(
    private memberRepo: MemberRepo,
    private organizationRepo: OrganizationRepo,
  ) {}

  public async execute(
    dto: GetMemberUseCaseRequest,
  ): Promise<GetMemberUseCaseResponse> {
    const membership = await this.organizationRepo.getMembership(
      dto.authenticatedUserId,
      dto.organizationId,
    )

    if (!membership) {
      return left(new NotAllowedError())
    }

    const { cannot } = getUserPermissions(
      dto.authenticatedUserId,
      membership.role,
    )

    if (cannot('get', 'Member')) {
      return left(new NotAllowedError('Not allowed to get member info'))
    }

    const member = await this.memberRepo.findById(dto.memberId)

    if (!member) {
      return left(new ResourceNotFoundError())
    }

    return right({ member })
  }
}
