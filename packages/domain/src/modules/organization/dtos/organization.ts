import type { Id } from '@/shared/types/id'

export interface CreateOrganizationDTO {
  ownerId: Id
  name: string
}
