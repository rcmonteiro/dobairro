import request from 'supertest'

import { app } from '@/app'
import { PrismaService } from '@/database/prisma'

describe('Sign Up (e2e)', async () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to register a new user', async () => {
    const db = PrismaService.getInstance()

    const response = await request(app.server).post(`/users`).send({
      name: 'John Doe',
      email: 'john.doe@example.com',
      city: 'Camboriú',
      state: 'SC',
      street: 'Rua Monte Alegre',
      zipCode: '88348200',
      number: '123',
    })

    expect(response.statusCode).toEqual(201)

    const user = await db.user.findUnique({
      where: {
        email: 'john.doe@example.com',
      },
    })

    expect(user).toBeTruthy()
    expect(user?.zipCode).toEqual('88348200')
  })
})
