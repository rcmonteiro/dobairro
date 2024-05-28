import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  server: {
    API_PORT: z.coerce.number().default(4000),
    API_URL: z.string().url(),
    DB_URL: z.string().url(),
    JWT_SECRET: z.string(),
  },
  client: {},
  shared: {},
  runtimeEnv: {
    API_PORT: process.env.API_PORT,
    API_URL: process.env.API_URL,
    DB_URL: process.env.DB_URL,
    JWT_SECRET: process.env.JWT_SECRET,
  },
  emptyStringAsUndefined: true,
})
