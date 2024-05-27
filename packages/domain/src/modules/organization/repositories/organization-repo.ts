import type { Organization } from '../entities/organization'

export interface OrganizationRepo {
  create(data: Organization): Promise<Organization>
  findBySlug(slug: string): Promise<Organization | null>
}
