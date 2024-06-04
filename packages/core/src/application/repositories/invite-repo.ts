import type { Invite } from '@/domain/entities/invite'
import type { Id } from '@/domain/types/id'

export interface InviteRepo {
  create(data: Invite): Promise<Invite>
  findByEmail(email: string, organizationId: Id): Promise<Invite | null>
  findManyByOrg(organizationId: Id): Promise<Invite[]>
}
