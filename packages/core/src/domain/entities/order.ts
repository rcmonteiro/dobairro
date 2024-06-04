import { Entity } from '../types/entity'
import type { Id } from '../types/id'
import type { Customer } from './customer'
import type { Organization } from './organization'
import type { Product } from './product'

export interface IOrder {
  organization: Organization
  customer: Customer
  products: Product[]
  createdAt?: Date
}

export class Order extends Entity<IOrder> {
  private constructor(state: IOrder, id?: Id) {
    super(state, id)
  }

  public get organization(): Organization {
    return this.state.organization
  }

  public get customer(): Customer {
    return this.state.customer
  }

  public get products(): Product[] {
    return this.state.products
  }

  public get createdAt(): Date | undefined {
    return this.state.createdAt
  }

  public static create(state: IOrder, id?: Id): Order {
    state.createdAt = state.createdAt ?? new Date()
    return new Order(state, id)
  }
}
