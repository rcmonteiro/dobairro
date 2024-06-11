export interface IToken {
  userId: string
  expirationDate: Date
}

export abstract class TokenService {
  abstract generate(data: Record<string, unknown>): Promise<string>
  abstract verify(token: string): Promise<IToken | null>
  abstract sign(data: Record<string, unknown>): Promise<string>
}
