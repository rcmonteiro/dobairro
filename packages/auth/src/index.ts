import {
  AbilityBuilder,
  CreateAbility,
  createMongoAbility,
  MongoAbility,
} from '@casl/ability'
import { z } from 'zod'

import { User } from './models/user'
import { permissions } from './permissions'
import { inviteSubject } from './subjects/invite'
import { organizationSubject } from './subjects/organization'
import { productSubject } from './subjects/product'
import { userSubject } from './subjects/user'
export * from './models/organization'
export * from './models/product'
export * from './models/user'
export * from './roles'

const AppAbilitiesSchema = z.union([
  userSubject,
  organizationSubject,
  inviteSubject,
  productSubject,
  z.tuple([z.literal('manage'), z.literal('all')]),
])

type AppAbilities = z.infer<typeof AppAbilitiesSchema>

export type AppAbility = MongoAbility<AppAbilities>
export const createAppAbility = createMongoAbility as CreateAbility<AppAbility>

export const defineAbilityFor = (user: User) => {
  const builder = new AbilityBuilder(createAppAbility)

  if (typeof permissions[user.role] !== 'function') {
    throw new Error(`Invalid role: ${user.role}`)
  }

  permissions[user.role](user, builder)

  const ability = builder.build({
    detectSubjectType(subject) {
      return subject.__typename
    },
  })

  ability.can = ability.can.bind(ability)
  ability.cannot = ability.cannot.bind(ability)

  return ability
}
