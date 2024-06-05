import type { Organization, OrganizationRepo } from '@dobairro/core'
import type { Member } from '@dobairro/core/src/domain/entities/member'

import { db } from '@/lib/prisma'
import { PrismaMemberMapper } from '@/mappers/prisma-member-mapper'
import { PrismaOrganizationMapper } from '@/mappers/prisma-organization-mapper'

export class PrismaOrganizationRepo implements OrganizationRepo {
  public async create(organization: Organization): Promise<Organization> {
    const data = PrismaOrganizationMapper.toPrisma(organization)
    const dbOrganization = await db.organization.create({
      data,
    })
    return PrismaOrganizationMapper.toDomain(dbOrganization)
  }

  public async findBySlug(slug: string): Promise<Organization | null> {
    const organization = await db.organization.findUnique({
      where: {
        slug,
      },
    })

    if (!organization) {
      return null
    }

    return PrismaOrganizationMapper.toDomain(organization)
  }

  public async getMembership(
    userId: string,
    organizationId: string,
  ): Promise<Member | null> {
    const org = await db.organization.findUnique({
      where: {
        id: organizationId,
      },
    })

    if (!org) {
      return null
    }

    const member = await db.member.findUnique({
      where: {
        organizationId_userId: {
          organizationId,
          userId,
        },
      },
    })

    if (!member) {
      return null
    }

    return PrismaMemberMapper.toDomain(member)
  }
}
