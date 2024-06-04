import { faker } from '@faker-js/faker/locale/pt_BR'

import { Organization } from '@/domain/entities/organization'
import { Theme } from '@/domain/entities/theme'
import { Slug } from '@/domain/value-objects/slug'

import { makeNewUser } from './make-new-user'

export const makeNewOrganization = () => {
  const newUser = makeNewUser()
  const orgName = faker.company.name()
  const newOrganization = Organization.create({
    name: orgName,
    ownerId: newUser.id,
    theme: Theme.create({
      name: 'default',
      colors: ['#3E7E6C', '#FCBD18', '#F6F5F2'],
    }),
    slug: Slug.createFromText(orgName),
  })
  return { newUser, newOrganization }
}
