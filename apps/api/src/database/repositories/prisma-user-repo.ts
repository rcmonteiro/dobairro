import type { User, UserRepo } from '@dobairro/core'

import { PrismaUserMapper } from '@/database/mappers/prisma-user-mapper'

import type { PrismaService } from '../prisma'

export class PrismaUserRepo implements UserRepo {
  constructor(private db: PrismaService) {}

  public async create(user: User): Promise<User> {
    const data = PrismaUserMapper.toPrisma(user)
    const dbUser = await this.db.user.create({
      data,
    })
    return PrismaUserMapper.toDomain(dbUser)
  }

  public async save(user: User): Promise<User> {
    const data = PrismaUserMapper.toPrisma(user)
    const dbUser = await this.db.user.update({
      data,
      where: {
        id: user.id.toString(),
      },
    })
    return PrismaUserMapper.toDomain(dbUser)
  }

  public async findById(userId: string): Promise<User | null> {
    const user = await this.db.user.findUnique({
      where: {
        id: userId,
      },
    })

    if (!user) {
      return null
    }

    return PrismaUserMapper.toDomain(user)
  }

  public async findByEmail(email: string): Promise<User | null> {
    const user = await this.db.user.findUnique({
      where: {
        email,
      },
    })

    if (!user) {
      return null
    }

    return PrismaUserMapper.toDomain(user)
  }
}
