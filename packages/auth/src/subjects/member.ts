import { z } from 'zod'

export const memberSubject = z.tuple([
  z.union([
    z.literal('manage'),
    z.literal('create'),
    z.literal('get'),
    z.literal('update'),
    z.literal('delete'),
  ]),
  z.literal('Member'),
])

export type MemberSubject = z.infer<typeof memberSubject>
