import { Entity } from '../types/entity'
import type { Id } from '../types/id'
import type { Category } from './category'

export interface IProduct {
  title: string
  description: string
  category: Category
  image: string
  price: number
  createdAt?: Date
  updatedAt?: Date
}

export class Product extends Entity<IProduct> {
  private constructor(state: IProduct, id?: Id) {
    super(state, id)
  }

  public get title(): string {
    return this.state.title
  }

  public get description(): string {
    return this.state.description
  }

  public get category(): Category {
    return this.state.category
  }

  public get image(): string {
    return this.state.image
  }

  public get price(): number {
    return this.state.price
  }

  public get createdAt(): Date | undefined {
    return this.state.createdAt
  }

  public static create(state: IProduct, id?: Id): Product {
    state.createdAt = state.createdAt ?? new Date()
    return new Product(state, id)
  }
}
