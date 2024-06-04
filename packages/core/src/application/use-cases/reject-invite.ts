import { type Either, left, right } from '../either'
import type { InviteRepo } from '../repositories/invite-repo'
import type { UserRepo } from '../repositories/user-repo'
import { NotAllowedError } from './_errors/not-allowed-error'
import { ResourceNotFoundError } from './_errors/resource-not-found-error'

interface RejectInviteUseCaseRequest {
  userId: string
  organizationId: string
  inviteId: string
}

type RejectInviteUseCaseResponse = Either<ResourceNotFoundError, null>

export class RejectInviteUseCase {
  constructor(
    private inviteRepo: InviteRepo,
    private userRepo: UserRepo,
  ) {}

  public async execute(
    dto: RejectInviteUseCaseRequest,
  ): Promise<RejectInviteUseCaseResponse> {
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

    await this.inviteRepo.delete(invite)

    return right(null)
  }
}
