import { Id, Organization, Slug } from '@dobairro/core'
import type { Organization as PrismaOrganization, Prisma } from '@prisma/client'

export class PrismaOrganizationMapper {
  static toPrisma(
    organization: Organization,
  ): Prisma.OrganizationUncheckedCreateInput {
    return {
      id: organization.id.toString(),
      ownerId: organization.ownerId.toString(),
      name: organization.name,
      slug: organization.slug._value,
      avatarUrl: organization.avatarUrl,
      createdAt: organization.createdAt,
      updatedAt: organization.updatedAt,
    }
  }

  static toDomain(raw: PrismaOrganization): Organization {
    return Organization.create({
      ownerId: new Id(raw.ownerId),
      name: raw.name,
      avatarUrl: raw.avatarUrl ?? '',
      slug: Slug.create(raw.slug),
    })
  }
}
