import type { FastifyInstance } from 'fastify'
import fastifyPlugin from 'fastify-plugin'

import { UnauthorizedError } from '../_errors/unauthorized-error'

interface IToken {
  sub: string
}

export const auth = fastifyPlugin(async (app: FastifyInstance) => {
  app.addHook('preHandler', async (request) => {
    request.getCurrentUser = async () => {
      try {
        const { sub: userId } = await request.jwtVerify<IToken>()
        return {
          userId,
        }
      } catch {
        throw new UnauthorizedError('Invalid auth token')
      }
    }
  })
})
