import { User } from '@/domain/entities/user'
import { Address } from '@/domain/value-objects/address'
import { Email } from '@/domain/value-objects/email'

import { type Either, left, right } from '../../either'
import type { UserRepo } from '../../repositories/user-repo'
import { UserAlreadyExistsError } from '../_errors/user-already-exists-error'

interface RegisterUseCaseRequest {
  name: string
  email: string
  street: string
  number: string
  city: string
  state: string
  zipCode: string
}

type RegisterUseCaseResponse = Either<
  UserAlreadyExistsError,
  {
    user: User
  }
>

export class RegisterUseCase {
  constructor(private userRepo: UserRepo) {}

  public async execute(
    dto: RegisterUseCaseRequest,
  ): Promise<RegisterUseCaseResponse> {
    const userWithSameEmail = await this.userRepo.findByEmail(dto.email)

    if (userWithSameEmail) {
      return left(new UserAlreadyExistsError())
    }

    const newUser = User.create({
      name: dto.name,
      email: new Email(dto.email),
      address: new Address(
        dto.street,
        dto.number,
        dto.city,
        dto.state,
        dto.zipCode,
      ),
    })

    const user = await this.userRepo.create(newUser)

    return right({ user })
  }
}
