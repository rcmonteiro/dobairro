import type { User } from '@/domain/entities/user'

export interface UserRepo {
  create(data: User): Promise<User>
  save(data: User): Promise<User>
  findByEmail(email: string): Promise<User | null>
  findById(userId: string): Promise<User | null>
}
