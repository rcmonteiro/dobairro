import request from 'supertest'

import { app } from '@/app'
import { PrismaService } from '@/database/prisma'
import { JwtTokenService } from '@/services/jwt-token-service'

describe('Sign Up (e2e)', async () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to verify a magic link', async () => {
    const db = PrismaService.getInstance()

    const user = await db.user.create({
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

    const tokenService = new JwtTokenService()
    const token = await tokenService.generate({
      userId: user.id,
    })

    const response = await request(app.server)
      .post(`/sessions/magic-link/verify`)
      .send({
        token,
      })

    expect(response.statusCode).toEqual(200)
    expect(response.body).toHaveProperty('access_token')
  })
})
