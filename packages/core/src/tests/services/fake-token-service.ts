import type { IToken, TokenService } from '@/application/services/token-service'

export class FakeTokenService implements TokenService {
  public async generate(data: Record<string, unknown>): Promise<string> {
    const expirationDate = new Date()
    expirationDate.setMinutes(new Date().getMinutes() + 45)
    return JSON.stringify({
      ...data,
      expirationDate,
    })
  }

  public async verify(token: string): Promise<IToken | null> {
    try {
      return JSON.parse(token)
    } catch (error) {
      return null
    }
  }
}
