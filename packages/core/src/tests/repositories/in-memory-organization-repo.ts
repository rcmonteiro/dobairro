import type { OrganizationRepo } from '@/application/repositories/organization-repo'
import type { Member } from '@/domain/entities/member'
import type { Organization } from '@/domain/entities/organization'
import type { Id } from '@/domain/types/id'

export class InMemoryOrganizationRepo implements OrganizationRepo {
  public items: Organization[] = []

  public async create(data: Organization): Promise<Organization> {
    this.items.push(data)
    return data
  }

  public async findBySlug(slug: string): Promise<Organization | null> {
    const organization = this.items.find((item) => item?.slug?.isEqual(slug))
    return organization ?? null
  }

  public async getMembership(
    userId: Id,
    organizationId: Id,
  ): Promise<Member | null> {
    const org = this.items.find((org) => org.id.equals(organizationId))

    if (!org) {
      return null
    }

    const member = org.members.find((member) => member.userId.equals(userId))

    if (!member) {
      return null
    }

    return member
  }
}
