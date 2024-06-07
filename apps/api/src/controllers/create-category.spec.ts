import request from 'supertest'

import { app } from '@/app'
import { db } from '@/database/prisma'
import { makeOrganizationWithSignedUser } from '@/tests/factories/make-organization-with-signed-user'

describe('Create Category (e2e)', async () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a new category', async () => {
    const { organizationId, token } = await makeOrganizationWithSignedUser()

    const response = await request(app.server)
      .post(`/organizations/${organizationId}/categories`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'New Category',
      })

    console.log(response.body)
    expect(response.statusCode).toEqual(201)

    const category = await db.category.findUnique({
      where: {
        id: response.body.categoryId,
      },
    })

    expect(category).toBeTruthy()
    expect(category?.title).toEqual('New Category')
  })
})
