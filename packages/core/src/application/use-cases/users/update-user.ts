import type { User } from '@/domain/entities/user'

import { type Either, left, right } from '../../either'
import type { UserRepo } from '../../repositories/user-repo'
import { NotAllowedError } from '../_errors/not-allowed-error'
import { ResourceNotFoundError } from '../_errors/resource-not-found-error'

interface UpdateUserUseCaseRequest {
  authenticatedUserId: string
  userId: string
  name?: string
  email?: string
  street?: string
  number?: string
  city?: string
  state?: string
  zipCode?: string
}

type UpdateUserUseCaseResponse = Either<
  NotAllowedError | ResourceNotFoundError,
  {
    user: User
  }
>

export class UpdateUserUseCase {
  constructor(private userRepo: UserRepo) {}

  public async execute(
    dto: UpdateUserUseCaseRequest,
  ): Promise<UpdateUserUseCaseResponse> {
    if (dto.authenticatedUserId !== dto.userId) {
      return left(new NotAllowedError())
    }

    const user = await this.userRepo.findById(dto.userId)

    if (!user) {
      return left(new ResourceNotFoundError())
    }

    user.name = dto.name ?? user.name
    user.email = dto.email ?? user.email.value
    user.address = {
      street: dto.street ?? user.address.street,
      number: dto.number ?? user.address.number,
      city: dto.city ?? user.address.city,
      state: dto.state ?? user.address.state,
      zipCode: dto.zipCode ?? user.address.zipCode,
    }

    this.userRepo.save(user)

    return right({ user })
  }
}
