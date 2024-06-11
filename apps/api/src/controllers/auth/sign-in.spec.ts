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

  it('should be able to sign-in with a magic link', async () => {
    const db = PrismaService.getInstance()

    await db.user.create({
      data: {
        name: 'John Doe',
        email: 'john.doe@example.com',
        city: 'Camboriú',
        state: 'SC',
        street: 'Rua Monte Alegre',
        zipCode: '88348200',
        number: '123',
      },
    })

    const response = await request(app.server)
      .post(`/sessions/magic-link`)
      .send({
        email: 'john.doe@example.com',
      })

    expect(response.statusCode).toEqual(200)
    expect(response.body).toHaveProperty('token')
  })
})
