import { Entity } from '@/shared/types/entity'
import type { Id } from '@/shared/types/id'
import type { Slug } from '@/shared/value-objects/slug'

export interface IOrganization {
  id: Id
  name: string
  slug: Slug
  createdAt: Date
  updatedAt: Date
}

export class Organization extends Entity<IOrganization> {
  private constructor(state: IOrganization, id?: Id) {
    super(state, id)
  }

  public static create(state: IOrganization, id?: Id): Organization {
    return new Organization(state, id)
  }
}
