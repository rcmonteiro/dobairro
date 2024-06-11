import type { EmailService } from '@/application/services/email-service'
import type { TokenService } from '@/application/services/token-service'

import { type Either, left, right } from '../../either'
import type { UserRepo } from '../../repositories/user-repo'
import { ResourceNotFoundError } from '../_errors/resource-not-found-error'

interface AuthenticateMagicLinkUseCaseRequest {
  email: string
}

type AuthenticateMagicLinkUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    token: string
  }
>

export class AuthenticateMagicLinkUseCase {
  constructor(
    private userRepo: UserRepo,
    private tokenService: TokenService,
    private emailService: EmailService,
  ) {}

  public async execute(
    dto: AuthenticateMagicLinkUseCaseRequest,
  ): Promise<AuthenticateMagicLinkUseCaseResponse> {
    const user = await this.userRepo.findByEmail(dto.email)

    if (!user) {
      return left(new ResourceNotFoundError())
    }

    const token = await this.tokenService.generate({
      userId: user.id.toString(),
    })

    const emailSent = await this.emailService.send({
      to: user.email.value,
      subject: '👋 Link de acesso - Do Bairro',
      html: `
        <p>Olá ${user.name},</p>
        <p>Para acessar sua conta, clique no link abaixo:</p>
        <p><a href="http://localhost:3000/api/callback/magic-link?token=${token}">Acessar minha conta</a></p>
      `,
    })

    if (!emailSent) {
      return left(new ResourceNotFoundError())
    }

    return right({ token })
  }
}
