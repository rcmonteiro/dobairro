import type { Organization } from '@dobairro/core'

export class OrganizationPresenter {
  static toHTTP(organization: Organization) {
    return {
      id: organization.id.toString(),
      name: organization.name,
      slug: organization.slug,
      createdAt: organization.createdAt,
      updatedAt: organization.updatedAt,
    }
  }
}
