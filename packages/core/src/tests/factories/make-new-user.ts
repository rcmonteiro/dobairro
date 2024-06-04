import { faker } from '@faker-js/faker/locale/pt_BR'

import { User } from '@/domain/entities/user'
import { Address } from '@/domain/value-objects/address'
import { Email } from '@/domain/value-objects/email'

export const makeNewUser = (override: Partial<User> = {}) => {
  const newUser = User.create({
    name: faker.person.fullName(),
    email: new Email(faker.internet.email()),
    address: new Address(
      faker.location.street(),
      faker.number.int({ min: 12, max: 99 }).toString(),
      faker.location.city(),
      faker.location.state(),
      faker.location.zipCode(),
    ),
    ...override,
  })
  return newUser
}
