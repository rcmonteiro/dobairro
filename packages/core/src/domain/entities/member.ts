import { Entity } from '../types/entity'
import type { Id } from '../types/id'
import type { Role } from '../types/role'

export interface IMember {
  organizationId: Id
  userId: Id
  role: Role
  createdAt?: Date
}

export class Member extends Entity<IMember> {
  private constructor(state: IMember, id?: Id) {
    super(state, id)
  }

  public get organizationId(): Id {
    return this.state.organizationId
  }

  public get userId(): Id {
    return this.state.userId
  }

  public get role(): Role {
    return this.state.role
  }

  public set role(role: Role) {
    this.state.role = role
  }

  public get createdAt(): Date | undefined {
    return this.state.createdAt
  }

  public static create(state: IMember, id?: Id): Member {
    state.createdAt = state.createdAt ?? new Date()
    return new Member(state, id)
  }
}
