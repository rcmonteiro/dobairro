import { faker } from '@faker-js/faker/locale/pt_BR'
import jwt from 'jsonwebtoken'

import { db } from '@/database/prisma'
import { env } from '@/env'

export const makeOrganizationWithSignedUser = async () => {
  const user = await db.user.create({
    data: {
      name: faker.person.fullName(),
      email: faker.internet.email(),
    },
  })
  const organization = await db.organization.create({
    data: {
      ownerId: user.id,
      name: faker.company.name(),
      slug: faker.internet.domainWord(),
    },
  })
  await db.member.create({
    data: {
      userId: user.id,
      organizationId: organization.id,
      role: 'ADMIN',
    },
  })
  const token = jwt.sign(
    {
      sub: user.id,
    },
    env.JWT_SECRET,
    {
      expiresIn: '4d',
    },
  )
  return { organizationId: organization.id, token }
}
