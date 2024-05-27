import { Entity } from '@/shared/types/entity'
import type { Id } from '@/shared/types/id'
import type { Slug } from '@/shared/value-objects/slug'

export interface IOrganization {
  id: Id
  name: string
  slug: Slug
  createdAt: Date
  updatedAt: Date
}

export class Organization extends Entity<IOrganization> {}
