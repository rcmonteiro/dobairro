import { UserAlreadyExistsError } from '@dobairro/core'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { makeRegister } from '@/application/factories/make-register'

import { BadRequestError } from '../_errors/bad-request-error'
import { UnauthorizedError } from '../_errors/unauthorized-error'

export const signUpController = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/users',
    {
      schema: {
        tags: ['Users'],
        summary: 'Register a new user',
        body: z.object({
          name: z.string().min(3),
          email: z.string().email(),
          street: z.string(),
          number: z.string(),
          city: z.string(),
          state: z.string(),
          zipCode: z.string(),
        }),
        response: {
          201: z.object({
            userId: z.string().uuid(),
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
      const { name, email, street, number, city, state, zipCode } = request.body

      const signUp = makeRegister()
      const result = await signUp.execute({
        name,
        email,
        street,
        number,
        city,
        state,
        zipCode,
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

      const user = result.value.user

      return reply.status(201).send({
        userId: user.id.toString(),
      })
    },
  )
}
