import type { MemberRepo } from '@/application/repositories/member-repo'
import type { OrganizationRepo } from '@/application/repositories/organization-repo'
import { getUserPermissions } from '@/application/shared/get-user-permissions'
import type { Member } from '@/domain/entities/member'
import type { Role } from '@/domain/types/role'

import { type Either, left, right } from '../../either'
import { NotAllowedError } from '../_errors/not-allowed-error'
import { ResourceNotFoundError } from '../_errors/resource-not-found-error'

interface UpdateMemberUseCaseRequest {
  authenticatedUserId: string
  organizationId: string
  memberId: string
  role: Role
}

type UpdateMemberUseCaseResponse = Either<
  NotAllowedError | ResourceNotFoundError,
  {
    member: Member
  }
>

export class UpdateMemberUseCase {
  constructor(
    private memberRepo: MemberRepo,
    private organizationRepo: OrganizationRepo,
  ) {}

  public async execute(
    dto: UpdateMemberUseCaseRequest,
  ): Promise<UpdateMemberUseCaseResponse> {
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

    if (cannot('update', 'Member')) {
      return left(new NotAllowedError('Not allowed to update member'))
    }

    const member = await this.memberRepo.findById(dto.memberId)

    if (!member) {
      return left(new ResourceNotFoundError())
    }

    member.role = dto.role

    this.memberRepo.save(member)

    return right({ member })
  }
}
