import { makeNewUser } from '@/tests/factories/make-new-user'
import { InMemoryUserRepo } from '@/tests/repositories/in-memory-user-repo'
import { FakeTokenService } from '@/tests/services/fake-token-service'

import { ResourceNotFoundError } from '../_errors/resource-not-found-error'
import { AuthenticateMagicLinkUseCase } from './authenticate-magic-link'

let userRepo: InMemoryUserRepo
let tokenService: FakeTokenService
let sut: AuthenticateMagicLinkUseCase

describe('Authenticate with Magic Link Use case - unit tests', () => {
  beforeEach(() => {
    userRepo = new InMemoryUserRepo()
    tokenService = new FakeTokenService()
    sut = new AuthenticateMagicLinkUseCase(userRepo, tokenService)
  })

  it('should be able to authenticate with magic link', async () => {
    const newUser = makeNewUser()
    userRepo.create(newUser)

    const result = await sut.execute({
      email: newUser.email.value,
    })

    expect(result.isRight).toBeTruthy()
    if (result.isRight()) {
      expect(result.value.token).toBeDefined()
    }
  })

  it('should not be able to authenticate with magic link with an inexistent user', async () => {
    const result = await sut.execute({
      email: 'john@example.com',
    })

    expect(result.isLeft).toBeTruthy()
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
