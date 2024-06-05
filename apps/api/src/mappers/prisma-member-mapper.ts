import { Id, Member } from '@dobairro/core'
import type { Member as PrismaMember, Prisma } from '@prisma/client'

export class PrismaMemberMapper {
  static toPrisma(member: Member): Prisma.MemberUncheckedCreateInput {
    return {
      id: member.id.toString(),
      organizationId: member.organizationId.toString(),
      userId: member.userId.toString(),
      role: member.role,
      createdAt: member.createdAt,
    }
  }

  static toDomain(raw: PrismaMember): Member {
    return Member.create(
      {
        organizationId: new Id(raw.organizationId),
        userId: new Id(raw.userId),
        role: raw.role,
        createdAt: raw.createdAt,
      },
      new Id(raw.id),
    )
  }
}
