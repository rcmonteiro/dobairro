import { Invite } from '@/domain/entities/invite'

import { type Either, left, right } from '../../either'
import type { InviteRepo } from '../../repositories/invite-repo'
import type { OrganizationRepo } from '../../repositories/organization-repo'
import { getUserPermissions } from '../../shared/get-user-permissions'
import { NotAllowedError } from '../_errors/not-allowed-error'

interface FetchOrganizationInvitesUseCaseRequest {
  userId: string
  organizationId: string
}

type FetchOrganizationInvitesUseCaseResponse = Either<
  NotAllowedError,
  {
    invites: Invite[]
  }
>

export class FetchOrganizationInvitesUseCase {
  constructor(
    private inviteRepo: InviteRepo,
    private organizationRepo: OrganizationRepo,
  ) {}

  public async execute(
    dto: FetchOrganizationInvitesUseCaseRequest,
  ): Promise<FetchOrganizationInvitesUseCaseResponse> {
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

    const invites = await this.inviteRepo.findManyByOrg(dto.organizationId)

    return right({ invites })
  }
}
