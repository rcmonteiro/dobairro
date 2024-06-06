import type { TokenService } from '@/application/services/token-service'

import { type Either, left, right } from '../../either'
import type { UserRepo } from '../../repositories/user-repo'
import { ResourceNotFoundError } from '../_errors/resource-not-found-error'

interface AuthenticateMagicLinkUseCaseRequest {
  email: string
}

type AuthenticateMagicLinkUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    token: string
  }
>

export class AuthenticateMagicLinkUseCase {
  constructor(
    private userRepo: UserRepo,
    private tokenService: TokenService,
  ) {}

  public async execute(
    dto: AuthenticateMagicLinkUseCaseRequest,
  ): Promise<AuthenticateMagicLinkUseCaseResponse> {
    const user = await this.userRepo.findByEmail(dto.email)

    if (!user) {
      return left(new ResourceNotFoundError())
    }

    const token = await this.tokenService.generate({
      userId: user.id.toString(),
    })

    return right({ token })
  }
}
