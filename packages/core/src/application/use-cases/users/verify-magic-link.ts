import type { TokenService } from '@/application/services/token-service'
import type { User } from '@/domain/entities/user'

import { type Either, left, right } from '../../either'
import type { UserRepo } from '../../repositories/user-repo'
import { NotAllowedError } from '../_errors/not-allowed-error'
import { ResourceNotFoundError } from '../_errors/resource-not-found-error'

interface VerifyMagicLinkUseCaseRequest {
  token: string
}

type VerifyMagicLinkUseCaseResponse = Either<
  NotAllowedError | ResourceNotFoundError,
  {
    user: User
  }
>

export class VerifyMagicLinkUseCase {
  constructor(
    private userRepo: UserRepo,
    private tokenService: TokenService,
  ) {}

  public async execute(
    dto: VerifyMagicLinkUseCaseRequest,
  ): Promise<VerifyMagicLinkUseCaseResponse> {
    const decodedToken = await this.tokenService.verify(dto.token)

    if (!decodedToken) {
      return left(new NotAllowedError())
    }

    const user = await this.userRepo.findById(decodedToken.userId)

    if (!user) {
      return left(new ResourceNotFoundError())
    }

    return right({ user })
  }
}
