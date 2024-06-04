import type { Member } from '@/domain/entities/member'

export interface MemberRepo {
  create(data: Member): Promise<Member>
}
