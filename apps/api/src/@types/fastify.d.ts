import 'fastify'

import type { Role } from '@dobairro/core/src/domain/types/role'

export interface ICurrentUser {
  userId: string
  organizationId: string
  role: Role
}

declare module 'fastify' {
  export interface FastifyRequest {
    getCurrentUser: () => Promise<ICurrentUser>
  }
}
