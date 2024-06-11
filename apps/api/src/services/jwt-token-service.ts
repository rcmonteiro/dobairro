import type { IToken, TokenService } from '@dobairro/core'
import jwt from 'jsonwebtoken'

import { env } from '@/env'

export class JwtTokenService implements TokenService {
  public async generate(data: Record<string, unknown>): Promise<string> {
    const token = jwt.sign(data, env.JWT_SECRET as string, {
      expiresIn: '45m',
    })
    return token
  }

  public async sign(data: Record<string, unknown>): Promise<string> {
    const token = jwt.sign(data, env.JWT_SECRET as string, {
      expiresIn: '2d',
    })
    return token
  }

  public async verify(token: string): Promise<IToken | null> {
    try {
      const decodedToken = jwt.verify(token, env.JWT_SECRET as string) as IToken
      return decodedToken
    } catch (error) {
      return null
    }
  }
}
