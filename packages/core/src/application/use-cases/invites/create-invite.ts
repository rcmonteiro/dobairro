import { Invite } from '@/domain/entities/invite'
import { Id } from '@/domain/types/id'
import type { Role } from '@/domain/types/role'
import { Email } from '@/domain/value-objects/email'

import { type Either, left, right } from '../../either'
import type { InviteRepo } from '../../repositories/invite-repo'
import type { OrganizationRepo } from '../../repositories/organization-repo'
import { getUserPermissions } from '../../shared/get-user-permissions'
import { NotAllowedError } from '../_errors/not-allowed-error'
import { ResourceAlreadyExistsError } from '../_errors/resource-already-exists-error'

interface CreateInviteUseCaseRequest {
  userId: string
  organizationId: string
  name: string
  email: string
  role: Role
}

type CreateInviteUseCaseResponse = Either<
  ResourceAlreadyExistsError | NotAllowedError,
  {
    invite: Invite
  }
>

export class CreateInviteUseCase {
  constructor(
    private inviteRepo: InviteRepo,
    private organizationRepo: OrganizationRepo,
  ) {}

  public async execute(
    dto: CreateInviteUseCaseRequest,
  ): Promise<CreateInviteUseCaseResponse> {
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

    if (cannot('create', 'Invite')) {
      return left(new NotAllowedError('Not allowed to revoke an invite'))
    }

    const inviteWithSameEmail = await this.inviteRepo.findByEmail(
      dto.email,
      dto.organizationId,
    )

    if (inviteWithSameEmail) {
      return left(new ResourceAlreadyExistsError())
    }

    const newInvite = Invite.create({
      organizationId: new Id(dto.organizationId),
      name: dto.name,
      email: new Email(dto.email),
      role: dto.role,
    })

    const invite = await this.inviteRepo.create(newInvite)

    return right({ invite })
  }
}
