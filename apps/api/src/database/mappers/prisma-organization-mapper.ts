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
      themeId: organization.themeId
        ? organization.themeId.toString()
        : undefined,
      slug: organization.slug._value,
      createdAt: organization.createdAt,
      updatedAt: organization.updatedAt,
    }
  }

  static toDomain(raw: PrismaOrganization): Organization {
    return Organization.create(
      {
        ownerId: new Id(raw.ownerId),
        name: raw.name,
        themeId: raw.themeId ? new Id(raw.themeId) : undefined,
        slug: Slug.create(raw.slug),
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt ?? undefined,
      },
      new Id(raw.id),
    )
  }
}
