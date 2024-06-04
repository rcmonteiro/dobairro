import type { UserRepo } from '@/application/repositories/user-repo'
import type { User } from '@/domain/entities/user'

export class InMemoryUserRepo implements UserRepo {
  public items: User[] = []

  public async create(data: User): Promise<User> {
    this.items.push(data)
    return data
  }

  public async findByEmail(email: string): Promise<User | null> {
    const user = this.items.find((item) => item?.email?.isEqual(email))
    return user ?? null
  }
}
