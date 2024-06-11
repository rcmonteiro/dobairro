import { UserAlreadyExistsError } from '@dobairro/core'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { makeSignInMagicLink } from '@/application/factories/make-sign-in-magic-link'

import { BadRequestError } from '../_errors/bad-request-error'
import { UnauthorizedError } from '../_errors/unauthorized-error'

export const signInController = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/sessions/magic-link',
    {
      schema: {
        tags: ['Users'],
        summary: 'Sign-in with magic link',
        body: z.object({
          email: z.string().email(),
        }),
        response: {
          200: z.object({
            token: z.string(),
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
      const { email } = request.body

      const signInMagicLink = makeSignInMagicLink()
      const result = await signInMagicLink.execute({
        email,
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

      const token = result.value.token

      return reply.status(200).send({
        token,
      })
    },
  )
}
