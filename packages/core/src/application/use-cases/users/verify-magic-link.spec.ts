import { User } from '@/domain/entities/user'
import { makeNewUser } from '@/tests/factories/make-new-user'
import { InMemoryUserRepo } from '@/tests/repositories/in-memory-user-repo'
import { FakeTokenService } from '@/tests/services/fake-token-service'

import { NotAllowedError } from '../_errors/not-allowed-error'
import { VerifyMagicLinkUseCase } from './verify-magic-link'

let userRepo: InMemoryUserRepo
let tokenService: FakeTokenService
let sut: VerifyMagicLinkUseCase

describe('Verify Magic Link Use case - unit tests', () => {
  beforeEach(() => {
    userRepo = new InMemoryUserRepo()
    tokenService = new FakeTokenService()
    sut = new VerifyMagicLinkUseCase(userRepo, tokenService)
  })

  it('should be able to verify a magic link', async () => {
    const newUser = makeNewUser()
    userRepo.create(newUser)

    const token = await tokenService.generate({
      userId: newUser.id.toString(),
    })

    const result = await sut.execute({
      token,
    })

    expect(result.isRight()).toBeTruthy()
    if (result.isRight()) {
      expect(result.value.user).toBeInstanceOf(User)
    }
  })

  it('should not be able to verify with magic link with an inexistent user', async () => {
    const result = await sut.execute({
      token: 'invalid-token',
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
