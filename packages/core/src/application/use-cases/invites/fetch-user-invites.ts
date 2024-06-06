import type { UserRepo } from '@/application/repositories/user-repo'
import { Invite } from '@/domain/entities/invite'

import { type Either, left, right } from '../../either'
import type { InviteRepo } from '../../repositories/invite-repo'
import { NotAllowedError } from '../_errors/not-allowed-error'

interface FetchUserInvitesUseCaseRequest {
  userId: string
}

type FetchUserInvitesUseCaseResponse = Either<
  NotAllowedError,
  {
    invites: Invite[]
  }
>

export class FetchUserInvitesUseCase {
  constructor(
    private inviteRepo: InviteRepo,
    private userRepo: UserRepo,
  ) {}

  public async execute(
    dto: FetchUserInvitesUseCaseRequest,
  ): Promise<FetchUserInvitesUseCaseResponse> {
    const user = await this.userRepo.findById(dto.userId)

    if (!user) {
      return left(new NotAllowedError())
    }

    const invites = await this.inviteRepo.findManyByEmail(user.email.value)

    return right({ invites })
  }
}
