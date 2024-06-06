import type { User } from '@/domain/entities/user'

import { type Either, left, right } from '../../either'
import type { UserRepo } from '../../repositories/user-repo'
import { ResourceNotFoundError } from '../_errors/resource-not-found-error'

interface GetUserProfileUseCaseRequest {
  userId: string
}

type GetUserProfileUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    user: User
  }
>

export class GetUserProfileUseCase {
  constructor(private userRepo: UserRepo) {}

  public async execute(
    dto: GetUserProfileUseCaseRequest,
  ): Promise<GetUserProfileUseCaseResponse> {
    const user = await this.userRepo.findById(dto.userId)

    if (!user) {
      return left(new ResourceNotFoundError())
    }

    return right({ user })
  }
}
