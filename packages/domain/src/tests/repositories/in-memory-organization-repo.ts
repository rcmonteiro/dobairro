import type { Organization } from '@/modules/organization/entities/organization'
import type { OrganizationRepo } from '@/modules/organization/repositories/organization-repo'

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
}
