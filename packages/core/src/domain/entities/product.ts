import { Entity } from '../types/entity'
import type { Id } from '../types/id'
import type { Slug } from '../value-objects/slug'

export interface IProduct {
  organizationId: Id
  categoryId: Id
  title: string
  slug: Slug
  description: string
  price: number
  image?: string
  createdAt?: Date
  updatedAt?: Date
}

export class Product extends Entity<IProduct> {
  private constructor(state: IProduct, id?: Id) {
    super(state, id)
  }

  public get organizationId(): Id {
    return this.state.organizationId
  }

  public get title(): string {
    return this.state.title
  }

  public set title(title: string) {
    this.state.title = title
  }

  public get slug(): Slug {
    return this.state.slug
  }

  public get description(): string {
    return this.state.description
  }

  public set description(description: string) {
    this.state.description = description
  }

  public get categoryId(): Id {
    return this.state.categoryId
  }

  public set categoryId(categoryId: Id) {
    this.state.categoryId = categoryId
  }

  public get image(): string | undefined {
    return this.state.image
  }

  public get price(): number {
    return this.state.price
  }

  public set price(price: number) {
    this.state.price = price
  }

  public get createdAt(): Date | undefined {
    return this.state.createdAt
  }

  public static create(state: IProduct, id?: Id): Product {
    state.createdAt = state.createdAt ?? new Date()
    return new Product(state, id)
  }
}
