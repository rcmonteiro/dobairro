import type { Invite } from '@/domain/entities/invite'

export interface InviteRepo {
  create(data: Invite): Promise<Invite>
  delete(data: Invite): Promise<void>
  findByEmail(email: string, organizationId: string): Promise<Invite | null>
  findById(inviteId: string, organizationId: string): Promise<Invite | null>
  findManyByOrg(organizationId: string): Promise<Invite[]>
}
