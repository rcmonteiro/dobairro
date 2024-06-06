import { Member } from '@/domain/entities/member'

import { type Either, left, right } from '../../either'
import type { MemberRepo } from '../../repositories/member-repo'
import type { OrganizationRepo } from '../../repositories/organization-repo'
import { getUserPermissions } from '../../shared/get-user-permissions'
import { NotAllowedError } from '../_errors/not-allowed-error'

interface FetchMembersUseCaseRequest {
  authenticatedUserId: string
  organizationId: string
}

type FetchMembersUseCaseResponse = Either<
  NotAllowedError,
  {
    members: Member[]
  }
>

export class FetchMembersUseCase {
  constructor(
    private memberRepo: MemberRepo,
    private organizationRepo: OrganizationRepo,
  ) {}

  public async execute(
    dto: FetchMembersUseCaseRequest,
  ): Promise<FetchMembersUseCaseResponse> {
    const membership = await this.organizationRepo.getMembership(
      dto.authenticatedUserId,
      dto.organizationId,
    )

    if (!membership) {
      return left(new NotAllowedError())
    }

    const { cannot } = getUserPermissions(
      dto.authenticatedUserId.toString(),
      membership.role,
    )

    if (cannot('get', 'Member')) {
      return left(
        new NotAllowedError('Not allowed to get organization members'),
      )
    }

    const members = await this.memberRepo.findManyByOrg(dto.organizationId)

    return right({ members })
  }
}
