import { SlugAlreadyExistsError } from '@dobairro/core/src/application/use-cases/_errors/slug-already-exists-error'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { makeCreateOrganization } from '@/application/factories/make-create-organization'

import { BadRequestError } from './_errors/bad-request-error'
import { UnauthorizedError } from './_errors/unauthorized-error'
import { auth } from './middleware/auth'

export const createOrganizationController = async (app: FastifyInstance) => {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post(
      '/organizations',
      {
        schema: {
          tags: ['Organizations'],
          summary: 'Create a new Organization',
          body: z.object({
            name: z.string().min(3),
          }),
          response: {
            201: z.object({
              organizationId: z.string().uuid(),
            }),
            400: z.object({
              message: z.string(),
            }),
            401: z.object({
              message: z.string(),
            }),
          },
        },
      },
      async (request, reply) => {
        const { userId } = await request.getCurrentUser()
        const { name } = request.body

        const createOrganization = makeCreateOrganization()
        const result = await createOrganization.execute({
          ownerId: userId,
          name,
        })

        if (result.isLeft()) {
          const error = result.value
          switch (error.constructor) {
            case SlugAlreadyExistsError:
              throw new UnauthorizedError(error.message)
            default:
              throw new BadRequestError(error.message)
          }
        }

        const organization = result.value.org

        return reply.status(201).send({
          organizationId: organization.id,
        })
      },
    )
}
