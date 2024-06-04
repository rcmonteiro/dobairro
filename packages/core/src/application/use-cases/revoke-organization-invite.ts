import { type Either, left, right } from '../either'
import type { InviteRepo } from '../repositories/invite-repo'
import type { OrganizationRepo } from '../repositories/organization-repo'
import { getUserPermissions } from '../shared/get-user-permissions'
import { NotAllowedError } from './_errors/not-allowed-error'
import { ResourceNotFoundError } from './_errors/resource-not-found-error'

interface RevokeOrganizationInviteUseCaseRequest {
  userId: string
  inviteId: string
  organizationId: string
}

type RevokeOrganizationInviteUseCaseResponse = Either<
  ResourceNotFoundError,
  null
>

export class RevokeOrganizationInviteUseCase {
  constructor(
    private inviteRepo: InviteRepo,
    private organizationRepo: OrganizationRepo,
  ) {}

  public async execute(
    dto: RevokeOrganizationInviteUseCaseRequest,
  ): Promise<RevokeOrganizationInviteUseCaseResponse> {
    const membership = await this.organizationRepo.getMembership(
      dto.userId,
      dto.organizationId,
    )

    if (!membership) {
      return left(new NotAllowedError())
    }

    const { cannot } = getUserPermissions(
      dto.userId.toString(),
      membership.role,
    )

    if (cannot('delete', 'Invite')) {
      return left(new NotAllowedError('Not allowed to revoke an invite'))
    }

    const invite = await this.inviteRepo.findById(
      dto.inviteId,
      dto.organizationId,
    )

    if (!invite) {
      return left(new ResourceNotFoundError())
    }

    this.inviteRepo.delete(invite)

    return right(null)
  }
}
