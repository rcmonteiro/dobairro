import type { Organization, OrganizationRepo } from '@dobairro/core'

import { db } from '@/lib/prisma'
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
}
