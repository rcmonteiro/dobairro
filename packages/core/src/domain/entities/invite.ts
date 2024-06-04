import { Entity } from '../types/entity'
import type { Id } from '../types/id'
import type { Role } from '../types/role'
import type { Email } from '../value-objects/email'

export interface IInvite {
  organizationId: Id
  name: string
  email: Email
  role: Role
  createdAt?: Date
}

export class Invite extends Entity<IInvite> {
  private constructor(state: IInvite, id?: Id) {
    super(state, id)
  }

  public get organizationId(): Id {
    return this.state.organizationId
  }

  public get name(): string {
    return this.state.name
  }

  public get email(): Email {
    return this.state.email
  }

  public get role(): Role {
    return this.state.role
  }

  public get createdAt(): Date | undefined {
    return this.state.createdAt
  }

  public static create(state: IInvite, id?: Id): Invite {
    state.createdAt = state.createdAt ?? new Date()
    return new Invite(state, id)
  }
}
