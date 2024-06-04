import type { Member } from '@/domain/entities/member'
import type { Organization } from '@/domain/entities/organization'

export interface OrganizationRepo {
  create(data: Organization): Promise<Organization>
  findBySlug(slug: string): Promise<Organization | null>
  getMembership(userId: string, organizationId: string): Promise<Member | null>
}
