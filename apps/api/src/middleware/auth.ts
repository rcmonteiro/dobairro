import type { Role } from '@dobairro/core/src/domain/types/role'
import type { FastifyInstance } from 'fastify'
import fastifyPlugin from 'fastify-plugin'

import { UnauthorizedError } from '../controllers/_errors/unauthorized-error'

interface IToken {
  sub: string
  org: string
  role: Role
}

export const auth = fastifyPlugin(async (app: FastifyInstance) => {
  app.addHook('preHandler', async (request) => {
    request.getCurrentUser = async () => {
      try {
        const {
          sub: userId,
          org: organizationId,
          role,
        } = await request.jwtVerify<IToken>()
        return {
          userId,
          organizationId,
          role,
        }
      } catch {
        throw new UnauthorizedError('Invalid auth token')
      }
    }
  })
})
