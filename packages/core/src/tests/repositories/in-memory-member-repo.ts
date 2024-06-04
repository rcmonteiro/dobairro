import type { MemberRepo } from '@/application/repositories/member-repo'
import type { Member } from '@/domain/entities/member'
import type { Id } from '@/domain/types/id'

export class InMemoryMemberRepo implements MemberRepo {
  public items: Member[] = []

  public async getMembership(
    userId: Id,
    organizationId: Id,
  ): Promise<Member | null> {
    const member = this.items.find(
      (item) =>
        item.organizationId.equals(organizationId) &&
        item.userId.equals(userId),
    )
    return member ?? null
  }
}
