import type { Member } from '@/domain/entities/member'

export interface MemberRepo {
  create(data: Member): Promise<Member>
  save(data: Member): Promise<Member>
  delete(data: Member): Promise<void>
  findManyByOrg(organizationId: string): Promise<Member[]>
  findById(memberId: string): Promise<Member | null>
}
