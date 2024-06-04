import type { Member } from '@/domain/entities/member'
import type { Id } from '@/domain/types/id'

export interface MemberRepo {
  getMembership(userId: Id, organizationId: Id): Promise<Member | null>
}
