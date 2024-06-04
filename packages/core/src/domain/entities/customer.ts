import { Entity } from '../types/entity'
import type { Id } from '../types/id'
import type { Address } from '../value-objects/address'
import type { Email } from '../value-objects/email'

export interface ICustomer {
  name: string
  email: Email
  address: Address
  createdAt?: Date
  updatedAt?: Date
}

export class Customer extends Entity<ICustomer> {
  private constructor(state: ICustomer, id?: Id) {
    super(state, id)
  }

  public get name(): string {
    return this.state.name
  }

  public get email(): Email {
    return this.state.email
  }

  public get address(): Address {
    return this.state.address
  }

  public get createdAt(): Date | undefined {
    return this.state.createdAt
  }

  public get updatedAt(): Date | undefined {
    return this.state.updatedAt
  }

  public static create(state: ICustomer, id?: Id): Customer {
    state.createdAt = state.createdAt ?? new Date()
    return new Customer(state, id)
  }
}
