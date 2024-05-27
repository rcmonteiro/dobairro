import type { Id } from '@/shared/types/id'

import type { OrganizationRepo } from '../repositories/organization-repo'

export interface CreateOrganizationDTO {
  ownerId: Id
  name: string
}

export class CreateOrganizationUseCase {
  constructor(private organizationRepo: OrganizationRepo) {}

  public async execute(dto: CreateOrganizationDTO) {
    const org = await this.organizationRepo.create(dto)
    return { org }
  }
}
