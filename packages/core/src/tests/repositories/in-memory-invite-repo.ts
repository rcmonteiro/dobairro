import type { InviteRepo } from '@/application/repositories/invite-repo'
import type { Invite } from '@/domain/entities/invite'
import type { Id } from '@/domain/types/id'

export class InMemoryInviteRepo implements InviteRepo {
  public items: Invite[] = []

  public async create(data: Invite): Promise<Invite> {
    this.items.push(data)
    return data
  }

  public async delete(data: Invite): Promise<void> {
    this.items = this.items.filter((item) => !item.id.equals(data.id))
  }

  public async findByEmail(
    email: string,
    organizationId: Id,
  ): Promise<Invite | null> {
    const invite = this.items.find(
      (item) =>
        item.email.isEqual(email) && item.organizationId.equals(organizationId),
    )
    return invite ?? null
  }

  public async findById(
    inviteId: Id,
    organizationId: Id,
  ): Promise<Invite | null> {
    const invite = this.items.find(
      (item) =>
        item.organizationId.equals(organizationId) && item.id.equals(inviteId),
    )
    return invite ?? null
  }

  public async findManyByOrg(organizationId: Id): Promise<Invite[]> {
    const invites = this.items.filter((item) =>
      item.organizationId.equals(organizationId),
    )
    return invites
  }
}
