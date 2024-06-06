import { faker } from '@faker-js/faker/locale/pt_BR'

import { Organization } from '@/domain/entities/organization'
import { Id } from '@/domain/types/id'
import { Slug } from '@/domain/value-objects/slug'

import { makeNewUser } from './make-new-user'

export const makeNewOrganization = (override: Partial<Organization> = {}) => {
  const newUser = makeNewUser()
  const orgName = faker.company.name()
  const newOrganization = Organization.create({
    name: orgName,
    ownerId: newUser.id,
    themeId: new Id(),
    slug: Slug.createFromText(orgName),
    ...override,
  })
  return { newUser, newOrganization }
}
