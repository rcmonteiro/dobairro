import type { MemberRepo } from '@/application/repositories/member-repo'
import type { Member } from '@/domain/entities/member'
import { Id } from '@/domain/types/id'

export class InMemoryMemberRepo implements MemberRepo {
  public items: Member[] = []

  public async create(data: Member): Promise<Member> {
    this.items.push(data)
    return data
  }

  public async delete(data: Member): Promise<void> {
    const index = this.items.findIndex((item) => item.id.equals(data.id))

    if (index === -1) {
      throw new Error('Member not found')
    }

    this.items.splice(index, 1)
  }

  public async findManyByOrg(organizationId: string): Promise<Member[]> {
    return this.items.filter((item) =>
      item.organizationId.equals(new Id(organizationId)),
    )
  }

  public async findById(memberId: string): Promise<Member | null> {
    const member = this.items.find((item) => item.id.equals(new Id(memberId)))
    return member ?? null
  }
}
