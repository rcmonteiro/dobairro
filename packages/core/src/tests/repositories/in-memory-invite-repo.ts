import type { InviteRepo } from '@/application/repositories/invite-repo'
import type { Invite } from '@/domain/entities/invite'
import { Id } from '@/domain/types/id'

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
    organizationId: string,
  ): Promise<Invite | null> {
    const invite = this.items.find(
      (item) =>
        item.email.isEqual(email) &&
        item.organizationId.equals(new Id(organizationId)),
    )
    return invite ?? null
  }

  public async findById(
    inviteId: string,
    organizationId: string,
  ): Promise<Invite | null> {
    const invite = this.items.find(
      (item) =>
        item.organizationId.equals(new Id(organizationId)) &&
        item.id.equals(new Id(inviteId)),
    )
    return invite ?? null
  }

  public async findManyByOrg(organizationId: string): Promise<Invite[]> {
    const invites = this.items.filter((item) =>
      item.organizationId.equals(new Id(organizationId)),
    )
    return invites
  }

  public async findManyByEmail(email: string): Promise<Invite[]> {
    const invites = this.items.filter((item) => item.email.isEqual(email))
    return invites
  }
}
