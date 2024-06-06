import { User } from '@/domain/entities/user'
import { makeNewUser } from '@/tests/factories/make-new-user'
import { InMemoryUserRepo } from '@/tests/repositories/in-memory-user-repo'

import { ResourceNotFoundError } from '../_errors/resource-not-found-error'
import { GetUserProfileUseCase } from './get-user-profile'

let userRepo: InMemoryUserRepo
let sut: GetUserProfileUseCase

describe('Get User Profile Use case - unit tests', () => {
  beforeEach(() => {
    userRepo = new InMemoryUserRepo()
    sut = new GetUserProfileUseCase(userRepo)
  })

  it('should be able to get user profile', async () => {
    const newUser = makeNewUser()
    userRepo.create(newUser)

    const result = await sut.execute({
      userId: newUser.id.toString(),
    })

    expect(result.isRight).toBeTruthy()
    if (result.isRight()) {
      expect(result.value.user).toBeInstanceOf(User)
      expect(result.value.user.id).toBe(newUser.id)
    }
  })

  it('should not be able to get user profile from inexistent user', async () => {
    const result = await sut.execute({
      userId: 'inexistent-user-id',
    })

    expect(result.isLeft).toBeTruthy()
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
