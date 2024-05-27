import type { OrganizationRepo } from '../repositories/organization-repo'

export class CreateAccountUseCase {
  constructor(private organizationRepo: OrganizationRepo) {}

  public async execute() {
    const org = await this.organizationRepo.create()
    return { org }
  }
}
