import { Invite } from '@/domain/entities/invite'
import type { Id } from '@/domain/types/id'

import { type Either, right } from '../either'
import type { InviteRepo } from '../repositories/invite-repo'

interface FetchOrganizationInvitesUseCaseRequest {
  organizationId: Id
}

type FetchOrganizationInvitesUseCaseResponse = Either<
  null,
  {
    invites: Invite[]
  }
>

export class FetchOrganizationInvitesUseCase {
  constructor(private inviteRepo: InviteRepo) {}

  public async execute(
    dto: FetchOrganizationInvitesUseCaseRequest,
  ): Promise<FetchOrganizationInvitesUseCaseResponse> {
    const invites = await this.inviteRepo.findManyByOrg(dto.organizationId)

    return right({ invites })
  }
}
