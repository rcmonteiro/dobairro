import { Entity } from '../types/entity'
import type { Id } from '../types/id'
import type { Slug } from '../value-objects/slug'

export interface ICategory {
  organizationId: Id
  title: string
  slug: Slug
  createdAt?: Date
  updatedAt?: Date
}

export class Category extends Entity<ICategory> {
  private constructor(state: ICategory, id?: Id) {
    super(state, id)
  }

  public get organizationId(): Id {
    return this.state.organizationId
  }

  public get title(): string {
    return this.state.title
  }

  public get slug(): Slug {
    return this.state.slug
  }

  public get createdAt(): Date | undefined {
    return this.state.createdAt
  }

  public get updatedAt(): Date | undefined {
    return this.state.updatedAt
  }

  public static create(state: ICategory, id?: Id): Category {
    state.createdAt = state.createdAt ?? new Date()
    return new Category(state, id)
  }
}
