import { UserAlreadyExistsError } from '@dobairro/core'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { makeVerifyMagicLink } from '@/application/factories/make-verify-magic-link'

import { BadRequestError } from '../_errors/bad-request-error'
import { UnauthorizedError } from '../_errors/unauthorized-error'

export const verifyMagicLinkController = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/sessions/magic-link/verify',
    {
      schema: {
        tags: ['Users'],
        summary: 'Verify magic link',
        body: z.object({
          token: z.string(),
        }),
        response: {
          200: z.object({
            access_token: z.string(),
          }),
          400: z.object({
            message: z.unknown(),
          }),
          401: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { token } = request.body

      const verifyMagicLink = makeVerifyMagicLink()
      const result = await verifyMagicLink.execute({
        token,
      })

      if (result.isLeft()) {
        const error = result.value
        switch (error.constructor) {
          case UserAlreadyExistsError:
            throw new UnauthorizedError(error.message)
          default:
            throw new BadRequestError(error.message)
        }
      }

      const access_token = result.value.token

      return reply.status(200).send({
        access_token,
      })
    },
  )
}
