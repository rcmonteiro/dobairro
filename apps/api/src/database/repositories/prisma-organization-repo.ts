import type { Organization, OrganizationRepo } from '@dobairro/core'
import type { Member } from '@dobairro/core/src/domain/entities/member'

import { PrismaMemberMapper } from '@/database/mappers/prisma-member-mapper'
import { PrismaOrganizationMapper } from '@/database/mappers/prisma-organization-mapper'

import type { PrismaService } from '../prisma'

export class PrismaOrganizationRepo implements OrganizationRepo {
  constructor(private db: PrismaService) {}

  public async create(organization: Organization): Promise<Organization> {
    const data = PrismaOrganizationMapper.toPrisma(organization)
    const dbOrganization = await this.db.organization.create({
      data,
    })
    return PrismaOrganizationMapper.toDomain(dbOrganization)
  }

  public async save(organization: Organization): Promise<Organization> {
    const data = PrismaOrganizationMapper.toPrisma(organization)
    const dbOrganization = await this.db.organization.update({
      data,
      where: {
        id: organization.id.toString(),
      },
    })
    return PrismaOrganizationMapper.toDomain(dbOrganization)
  }

  public async findById(organizationId: string): Promise<Organization | null> {
    const organization = await this.db.organization.findUnique({
      where: {
        id: organizationId,
      },
    })

    if (!organization) {
      return null
    }

    return PrismaOrganizationMapper.toDomain(organization)
  }

  public async findBySlug(slug: string): Promise<Organization | null> {
    const organization = await this.db.organization.findUnique({
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
    const org = await this.db.organization.findUnique({
      where: {
        id: organizationId,
      },
    })

    if (!org) {
      return null
    }

    const member = await this.db.member.findUnique({
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
