import type { UserRepo } from '@/application/repositories/user-repo'
import type { User } from '@/domain/entities/user'
import { Id } from '@/domain/types/id'

export class InMemoryUserRepo implements UserRepo {
  public items: User[] = []

  public async create(data: User): Promise<User> {
    this.items.push(data)
    return data
  }

  public async save(data: User): Promise<User> {
    const index = this.items.findIndex((item) => item.id.equals(data.id))
    this.items[index] = data
    return data
  }

  public async findByEmail(email: string): Promise<User | null> {
    const user = this.items.find((item) => item.email.isEqual(email))
    return user ?? null
  }

  public async findById(userId: string): Promise<User | null> {
    const user = this.items.find((item) => item.id.equals(new Id(userId)))
    return user ?? null
  }
}
