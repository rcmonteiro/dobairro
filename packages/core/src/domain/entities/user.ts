import { Entity } from '../types/entity'
import type { Id } from '../types/id'
import type { Address } from '../value-objects/address'
import type { Email } from '../value-objects/email'

export interface IUser {
  name: string
  email: Email
  address: Address
  avatarUrl?: string
  createdAt?: Date
  updatedAt?: Date
}

export class User extends Entity<IUser> {
  private constructor(state: IUser, id?: Id) {
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

  public get avatarUrl(): string | undefined {
    return this.state.avatarUrl
  }

  public static create(state: IUser, id?: Id): User {
    state.createdAt = state.createdAt ?? new Date()
    return new User(state, id)
  }
}
