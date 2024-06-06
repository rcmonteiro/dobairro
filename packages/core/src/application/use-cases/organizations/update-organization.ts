import type { OrganizationRepo } from '@/application/repositories/organization-repo'
import type { Organization } from '@/domain/entities/organization'
import { Id } from '@/domain/types/id'

import { type Either, left, right } from '../../either'
import { NotAllowedError } from '../_errors/not-allowed-error'
import { ResourceNotFoundError } from '../_errors/resource-not-found-error'

interface UpdateOrganizationUseCaseRequest {
  authenticatedUserId: string
  organizationId: string
  name: string
}

type UpdateOrganizationUseCaseResponse = Either<
  NotAllowedError | ResourceNotFoundError,
  {
    organization: Organization
  }
>

export class UpdateOrganizationUseCase {
  constructor(private organizationRepo: OrganizationRepo) {}

  public async execute(
    dto: UpdateOrganizationUseCaseRequest,
  ): Promise<UpdateOrganizationUseCaseResponse> {
    const organization = await this.organizationRepo.findById(
      dto.organizationId,
    )

    if (!organization) {
      return left(new ResourceNotFoundError())
    }

    if (!organization.ownerId.equals(new Id(dto.authenticatedUserId))) {
      return left(new NotAllowedError())
    }

    organization.name = dto.name

    this.organizationRepo.save(organization)

    return right({ organization })
  }
}
