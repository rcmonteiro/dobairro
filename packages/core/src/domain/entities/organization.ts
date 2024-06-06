import { Entity } from '../types/entity'
import type { Id } from '../types/id'
import { Slug } from '../value-objects/slug'
import { Member } from './member'

export interface IOrganization {
  ownerId: Id
  name: string
  slug: Slug
  themeId?: Id
  members?: Member[]
  createdAt?: Date
  updatedAt?: Date
}

export class Organization extends Entity<IOrganization> {
  private constructor(state: IOrganization, id?: Id) {
    super(state, id)
    this.state.members = [
      Member.create({
        organizationId: this.id,
        role: 'ADMIN',
        userId: this.state.ownerId,
      }),
    ]
  }

  public addMember(member: Member) {
    this.state?.members?.push(member)
  }

  public get slug(): Slug {
    return this.state.slug
  }

  public get name(): string {
    return this.state.name
  }

  public set name(name: string) {
    this.state.name = name
  }

  public get themeId(): Id | undefined {
    return this.state.themeId
  }

  public get members(): Member[] {
    return this.state.members ?? []
  }

  public get createdAt(): Date | undefined {
    return this.state.createdAt
  }

  public get updatedAt(): Date | undefined {
    return this.state.updatedAt
  }

  public get ownerId(): Id {
    return this.state.ownerId
  }

  public static create(state: IOrganization, id?: Id): Organization {
    state.createdAt = state.createdAt ?? new Date()
    state.slug = state.slug ?? Slug.create(state.name)
    return new Organization(state, id)
  }
}
