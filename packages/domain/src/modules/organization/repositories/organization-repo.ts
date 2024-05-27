import type { Organization } from '../entities/organization'
import type { CreateOrganizationDTO } from '../use-cases/create-organization'

export interface OrganizationRepo {
  create(dto: CreateOrganizationDTO): Promise<Organization>
}
