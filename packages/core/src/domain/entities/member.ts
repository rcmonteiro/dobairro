import { Entity } from '../types/entity'
import type { Id } from '../types/id'
import type { Role } from '../types/role'
import type { Organization } from './organization'
import type { User } from './user'

export interface IMember {
  organization: Organization
  user: User
  role: Role
  createdAt?: Date
}

export class Member extends Entity<IMember> {
  private constructor(state: IMember, id?: Id) {
    super(state, id)
  }

  public get organization(): Organization {
    return this.state.organization
  }

  public get user(): User {
    return this.state.user
  }

  public get role(): Role {
    return this.state.role
  }

  public get createdAt(): Date | undefined {
    return this.state.createdAt
  }

  public static create(state: IMember, id?: Id): Member {
    state.createdAt = state.createdAt ?? new Date()
    return new Member(state, id)
  }
}
