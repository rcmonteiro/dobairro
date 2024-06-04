import { InMemoryUserRepo } from '@/tests/repositories/in-memory-user-repo'

import { UserAlreadyExistsError } from './_errors/user-already-exists-error'
import { RegisterUseCase } from './register'

let userRepo: InMemoryUserRepo
let sut: RegisterUseCase

describe('Register Use case - unit tests', () => {
  beforeEach(() => {
    userRepo = new InMemoryUserRepo()
    sut = new RegisterUseCase(userRepo)
  })

  it('should be able to register a new user', async () => {
    const result = await sut.execute({
      name: 'John Doe',
      email: 'john@example.com',
      street: 'Any St.',
      number: '42',
      city: 'Some city',
      state: 'Some state',
      zipCode: '00000',
    })

    expect(result.isRight).toBeTruthy()
    expect(userRepo.items[0].name).toBe('John Doe')
    expect(userRepo.items[0].address.zipCode).toBe('00000')
  })

  it('should not be able to register a new user with an existing e-mail', async () => {
    await sut.execute({
      name: 'John Doe',
      email: 'john@example.com',
      street: 'Any St.',
      number: '42',
      city: 'Some city',
      state: 'Some state',
      zipCode: '00000',
    })
    const result = await sut.execute({
      name: 'John Doe',
      email: 'john@example.com',
      street: 'Any St.',
      number: '42',
      city: 'Some city',
      state: 'Some state',
      zipCode: '00000',
    })

    expect(result.isLeft).toBeTruthy()
    expect(result.value).toBeInstanceOf(UserAlreadyExistsError)
  })
})
