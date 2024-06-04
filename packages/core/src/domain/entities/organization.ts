import { Entity } from '../types/entity'
import type { Id } from '../types/id'
import { Slug } from '../value-objects/slug'
import type { Theme } from './theme'

export interface IOrganization {
  ownerId: Id
  name: string
  theme: Theme
  slug: Slug
  createdAt?: Date
  updatedAt?: Date
}

export class Organization extends Entity<IOrganization> {
  private constructor(state: IOrganization, id?: Id) {
    super(state, id)
  }

  public get slug(): Slug {
    return this.state.slug
  }

  public get name(): string {
    return this.state.name
  }

  public get theme(): Theme {
    return this.state.theme
  }

  public get createdAt(): Date | undefined {
    return this.state.createdAt
  }

  public get updatedAt(): Date | undefined {
    return this.state.updatedAt
  }

  public get ownerId(): Id {
    return this.state.ownerId
  }

  public static create(state: IOrganization, id?: Id): Organization {
    state.createdAt = state.createdAt ?? new Date()
    state.slug = state.slug ?? Slug.create(state.name)
    return new Organization(state, id)
  }
}
