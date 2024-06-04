import { Invite } from '@/domain/entities/invite'
import type { Id } from '@/domain/types/id'
import type { Role } from '@/domain/types/role'
import { Email } from '@/domain/value-objects/email'

import { type Either, left, right } from '../either'
import type { InviteRepo } from '../repositories/invite-repo'
import { ResourceAlreadyExistsError } from './_errors/user-already-exists-error copy'

interface CreateInviteUseCaseRequest {
  organizationId: Id
  name: string
  email: string
  role: Role
}

type CreateInviteUseCaseResponse = Either<
  ResourceAlreadyExistsError,
  {
    invite: Invite
  }
>

export class CreateInviteUseCase {
  constructor(private inviteRepo: InviteRepo) {}

  public async execute(
    dto: CreateInviteUseCaseRequest,
  ): Promise<CreateInviteUseCaseResponse> {
    const inviteWithSameEmail = await this.inviteRepo.findByEmail(
      dto.email,
      dto.organizationId,
    )

    if (inviteWithSameEmail) {
      return left(new ResourceAlreadyExistsError())
    }

    const newInvite = Invite.create({
      organizationId: dto.organizationId,
      name: dto.name,
      email: new Email(dto.email),
      role: dto.role,
    })

    const invite = await this.inviteRepo.create(newInvite)

    return right({ invite })
  }
}
