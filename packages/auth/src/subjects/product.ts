import { z } from 'zod'

import { productSchema } from '../models/product'

export const productSubject = z.tuple([
  z.union([
    z.literal('manage'),
    z.literal('create'),
    z.literal('get'),
    z.literal('update'),
    z.literal('delete'),
  ]),
  z.union([z.literal('Product'), productSchema]),
])

export type ProductSubject = z.infer<typeof productSubject>
