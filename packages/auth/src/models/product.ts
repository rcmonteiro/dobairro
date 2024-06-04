import { z } from 'zod'

export const productSchema = z.object({
  __typename: z.literal('Product').default('Product'),
  id: z.string().uuid(),
  ownerId: z.string().uuid(),
})

export type Product = z.infer<typeof productSchema>
