import type { Organization } from '@/domain/entities/organization'

export interface OrganizationRepo {
  create(data: Organization): Promise<Organization>
  findBySlug(slug: string): Promise<Organization | null>
}
