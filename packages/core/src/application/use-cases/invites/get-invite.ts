import type { InviteRepo } from '@/application/repositories/invite-repo'
import type { OrganizationRepo } from '@/application/repositories/organization-repo'
import { getUserPermissions } from '@/application/shared/get-user-permissions'
import type { Invite } from '@/domain/entities/invite'

import { type Either, left, right } from '../../either'
import { NotAllowedError } from '../_errors/not-allowed-error'
import { ResourceNotFoundError } from '../_errors/resource-not-found-error'

interface GetInviteUseCaseRequest {
  authenticatedUserId: string
  organizationId: string
  inviteId: string
}

type GetInviteUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    invite: Invite
  }
>

export class GetInviteUseCase {
  constructor(
    private inviteRepo: InviteRepo,
    private organizationRepo: OrganizationRepo,
  ) {}

  public async execute(
    dto: GetInviteUseCaseRequest,
  ): Promise<GetInviteUseCaseResponse> {
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

    if (cannot('get', 'Invite')) {
      return left(new NotAllowedError('Not allowed to get invite info'))
    }

    const invite = await this.inviteRepo.findById(
      dto.inviteId,
      dto.organizationId,
    )

    if (!invite) {
      return left(new ResourceNotFoundError())
    }

    return right({ invite })
  }
}
