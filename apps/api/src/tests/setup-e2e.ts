import { execSync } from 'node:child_process'
import { randomUUID } from 'node:crypto'

import { PrismaClient } from '@prisma/client'
import { config } from 'dotenv'

import { env } from '@/env'

config()

const db = new PrismaClient()

const generateUniqueDbURL = (schemaId: string) => {
  if (!env.DB_URL) {
    throw new Error('DB_URL is not set')
  }

  const url = new URL(env.DB_URL)

  url.searchParams.set('schema', schemaId)

  return url.toString()
}

const schemaId = randomUUID()

beforeAll(async () => {
  const e2eDbURL = generateUniqueDbURL(schemaId)
  process.env.DB_URL = e2eDbURL
  execSync('pnpm run db:deploy')
  await db.$connect()
})

afterAll(async () => {
  await db.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schemaId}" CASCADE`)
  await db.$disconnect()
})
