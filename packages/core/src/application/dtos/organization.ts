import type { Id } from '@dobairro/core/src/domain/types/id'

export interface CreateOrganizationDTO {
  ownerId: Id
  name: string
}
