import { Entity } from '../types/entity'
import type { Id } from '../types/id'
import type { Slug } from '../value-objects/slug'

export interface ICategory {
  organizationId: Id
  title: string
  slug: Slug
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

  public static create(state: ICategory, id?: Id): Category {
    return new Category(state, id)
  }
}
