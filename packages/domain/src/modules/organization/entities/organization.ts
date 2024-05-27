import { Entity } from '@/shared/types/entity'
import type { Id } from '@/shared/types/id'
import { Slug } from '@/shared/value-objects/slug'

export interface IOrganization {
  ownerId: Id
  name: string
  slug?: Slug
  createdAt?: Date
  updatedAt?: Date
}

export class Organization extends Entity<IOrganization> {
  private constructor(state: IOrganization, id?: Id) {
    super(state, id)
  }

  public get slug(): Slug | undefined {
    return this.state.slug
  }

  public static create(state: IOrganization, id?: Id): Organization {
    state.createdAt = state.createdAt ?? new Date()
    state.slug = state.slug ?? Slug.create(state.name)
    return new Organization(state, id)
  }
}
