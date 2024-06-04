import type { MemberRepo } from '@/application/repositories/member-repo'
import type { Member } from '@/domain/entities/member'

export class InMemoryMemberRepo implements MemberRepo {
  public items: Member[] = []

  public async create(data: Member): Promise<Member> {
    this.items.push(data)
    return data
  }
}
