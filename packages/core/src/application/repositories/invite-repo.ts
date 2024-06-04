import type { Invite } from '@/domain/entities/invite'
import type { Id } from '@/domain/types/id'

export interface InviteRepo {
  create(data: Invite): Promise<Invite>
  delete(data: Invite): Promise<void>
  findByEmail(email: string, organizationId: Id): Promise<Invite | null>
  findById(inviteId: Id, organizationId: Id): Promise<Invite | null>
  findManyByOrg(organizationId: Id): Promise<Invite[]>
}
