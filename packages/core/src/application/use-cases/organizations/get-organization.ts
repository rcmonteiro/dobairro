import type { OrganizationRepo } from '@/application/repositories/organization-repo'
import { getUserPermissions } from '@/application/shared/get-user-permissions'
import type { Organization } from '@/domain/entities/organization'

import { type Either, left, right } from '../../either'
import { NotAllowedError } from '../_errors/not-allowed-error'
import { ResourceNotFoundError } from '../_errors/resource-not-found-error'

interface GetOrganizationUseCaseRequest {
  authenticatedUserId: string
  organizationId: string
}

type GetOrganizationUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    organization: Organization
  }
>

export class GetOrganizationUseCase {
  constructor(private organizationRepo: OrganizationRepo) {}

  public async execute(
    dto: GetOrganizationUseCaseRequest,
  ): Promise<GetOrganizationUseCaseResponse> {
    const membership = await this.organizationRepo.getMembership(
      dto.authenticatedUserId,
      dto.organizationId,
    )

    if (!membership) {
      return left(new NotAllowedError())
    }

    const { cannot } = getUserPermissions(
      dto.authenticatedUserId,
      membership.role,
    )

    if (cannot('get', 'Organization')) {
      return left(new NotAllowedError('Not allowed to get organization info'))
    }

    const organization = await this.organizationRepo.findById(
      dto.organizationId,
    )

    if (!organization) {
      return left(new ResourceNotFoundError())
    }

    return right({ organization })
  }
}
