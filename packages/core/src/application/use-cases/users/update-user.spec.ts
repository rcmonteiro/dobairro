import { User } from '@/domain/entities/user'
import { makeNewUser } from '@/tests/factories/make-new-user'
import { InMemoryUserRepo } from '@/tests/repositories/in-memory-user-repo'

import { NotAllowedError } from '../_errors/not-allowed-error'
import { UpdateUserUseCase } from './update-user'

let userRepo: InMemoryUserRepo
let sut: UpdateUserUseCase

describe('Update User Use case - unit tests', () => {
  beforeEach(() => {
    userRepo = new InMemoryUserRepo()
    sut = new UpdateUserUseCase(userRepo)
  })

  it('should be able to update user', async () => {
    const newUser = makeNewUser()
    userRepo.create(newUser)

    const result = await sut.execute({
      authenticatedUserId: newUser.id.toString(),
      userId: newUser.id.toString(),
      name: 'User with new name',
    })

    expect(result.isRight).toBeTruthy()
    if (result.isRight()) {
      expect(result.value.user).toBeInstanceOf(User)
      expect(result.value.user.name).toBe('User with new name')
    }
  })

  it('should not be able to update another user profile', async () => {
    const newUser = makeNewUser()
    userRepo.create(newUser)

    const anotherUser = makeNewUser()
    userRepo.create(anotherUser)

    const result = await sut.execute({
      authenticatedUserId: anotherUser.id.toString(),
      userId: newUser.id.toString(),
      name: 'User with new name',
    })

    expect(result.isLeft).toBeTruthy()
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
