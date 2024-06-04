import type { Member } from '@/domain/entities/member'
import type { Organization } from '@/domain/entities/organization'
import type { Id } from '@/domain/types/id'

export interface OrganizationRepo {
  create(data: Organization): Promise<Organization>
  findBySlug(slug: string): Promise<Organization | null>
  getMembership(userId: Id, organizationId: Id): Promise<Member | null>
}
