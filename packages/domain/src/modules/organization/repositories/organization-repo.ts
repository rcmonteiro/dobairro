import type { Organization } from '../entities/organization'

export interface OrganizationRepo {
  create(): Promise<Organization>
}
