import { NotAllowedError } from '@dobairro/core/src/application/use-cases/_errors/not-allowed-error'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { makeCreateCategory } from '@/application/factories/make-create-category'

import { BadRequestError } from './_errors/bad-request-error'
import { UnauthorizedError } from './_errors/unauthorized-error'
import { auth } from './middleware/auth'

export const createCategoryController = async (app: FastifyInstance) => {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post(
      '/organizations/:organizationId/categories',
      {
        schema: {
          tags: ['Category'],
          summary: 'Create a new Category',
          params: z.object({
            organizationId: z.string().uuid(),
          }),
          body: z.object({
            title: z.string().min(3),
          }),
          response: {
            201: z.object({
              categoryId: z.string().uuid(),
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
        const { userId } = await request.getCurrentUser()
        const { title } = request.body
        const { organizationId } = request.params

        const createCategory = makeCreateCategory()
        const result = await createCategory.execute({
          authenticatedUserId: userId,
          organizationId,
          title,
        })

        if (result.isLeft()) {
          const error = result.value
          switch (error.constructor) {
            case NotAllowedError:
              throw new UnauthorizedError(error.message)
            default:
              throw new BadRequestError(error.message)
          }
        }

        const category = result.value.category

        return reply.status(201).send({
          categoryId: category.id.toString(),
        })
      },
    )
}
