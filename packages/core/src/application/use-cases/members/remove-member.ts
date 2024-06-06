import { type Either, left, right } from '../../either'
import type { MemberRepo } from '../../repositories/member-repo'
import type { OrganizationRepo } from '../../repositories/organization-repo'
import { getUserPermissions } from '../../shared/get-user-permissions'
import { NotAllowedError } from '../_errors/not-allowed-error'
import { ResourceNotFoundError } from '../_errors/resource-not-found-error'

interface RemoveMemberUseCaseRequest {
  authenticatedUserId: string
  memberId: string
  organizationId: string
}

type RemoveMemberUseCaseResponse = Either<
  NotAllowedError | ResourceNotFoundError,
  null
>

export class RemoveMemberUseCase {
  constructor(
    private memberRepo: MemberRepo,
    private organizationRepo: OrganizationRepo,
  ) {}

  public async execute(
    dto: RemoveMemberUseCaseRequest,
  ): Promise<RemoveMemberUseCaseResponse> {
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

    if (cannot('delete', 'Member')) {
      return left(
        new NotAllowedError('Not allowed to delete organization members'),
      )
    }

    const member = await this.memberRepo.findById(dto.memberId)

    if (!member) {
      return left(new ResourceNotFoundError())
    }

    await this.memberRepo.delete(member)

    return right(null)
  }
}
