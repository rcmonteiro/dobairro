import { Id, User } from '@dobairro/core'
import type { Prisma, User as PrismaUser } from '@prisma/client'

import { Address } from '@/domain/value-objects/address'
import { Email } from '@/domain/value-objects/email'

export class PrismaUserMapper {
  static toPrisma(user: User): Prisma.UserUncheckedCreateInput {
    return {
      id: user.id.toString(),
      name: user.name,
      email: user.email.value,
      street: user.address.street,
      number: user.address.number,
      city: user.address.city,
      state: user.address.state,
      zipCode: user.address.zipCode,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }
  }

  static toDomain(raw: PrismaUser): User {
    return User.create(
      {
        name: raw.name,
        email: new Email(raw.email),
        address: new Address(
          raw.street,
          raw.number,
          raw.city,
          raw.state,
          raw.zipCode,
        ),
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt ?? undefined,
      },
      new Id(raw.id),
    )
  }
}
