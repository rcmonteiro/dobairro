import type { OrganizationRepo } from '@/application/repositories/organization-repo'
import type { Organization } from '@/domain/entities/organization'

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
