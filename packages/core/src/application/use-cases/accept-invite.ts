import { Member } from '@/domain/entities/member'
import { Id } from '@/domain/types/id'

import { type Either, left, right } from '../either'
import type { InviteRepo } from '../repositories/invite-repo'
import type { MemberRepo } from '../repositories/member-repo'
import type { UserRepo } from '../repositories/user-repo'
import { NotAllowedError } from './_errors/not-allowed-error'
import { ResourceNotFoundError } from './_errors/resource-not-found-error'

interface AcceptInviteUseCaseRequest {
  userId: string
  organizationId: string
  inviteId: string
}

type AcceptInviteUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    member: Member
  }
>

export class AcceptInviteUseCase {
  constructor(
    private inviteRepo: InviteRepo,
    private memberRepo: MemberRepo,
    private userRepo: UserRepo,
  ) {}

  public async execute(
    dto: AcceptInviteUseCaseRequest,
  ): Promise<AcceptInviteUseCaseResponse> {
    const invite = await this.inviteRepo.findById(
      dto.inviteId,
      dto.organizationId,
    )

    if (!invite) {
      return left(new ResourceNotFoundError())
    }

    const user = await this.userRepo.findById(dto.userId)

    if (!user) {
      return left(new ResourceNotFoundError())
    }

    if (!user.email.equals(invite.email)) {
      return left(new NotAllowedError('This invite belongs to another user'))
    }

    const member = await Member.create({
      organizationId: new Id(dto.organizationId),
      userId: new Id(dto.userId),
      role: invite.role,
    })

    const newMember = await this.memberRepo.create(member)

    await this.inviteRepo.delete(invite)

    return right({ member: newMember })
  }
}
