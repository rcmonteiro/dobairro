import 'fastify'

export interface ICurrentUser {
  userId: string
}

declare module 'fastify' {
  export interface FastifyRequest {
    getCurrentUser: () => Promise<ICurrentUser>
  }
}
