import { type Either, right } from '@dobairro/core'

import type { Id } from '@/shared/types/id'
import { Slug } from '@/shared/value-objects/slug'

import { Organization } from '../entities/organization'
import type { OrganizationRepo } from '../repositories/organization-repo'
import { SlugAlreadyExistsError } from './_errors/slug-already-exists-error'

interface CreateOrganizationUseCaseRequest {
  ownerId: Id
  name: string
}

type CreateOrganizationUseCaseResponse = Either<
  SlugAlreadyExistsError,
  {
    org: Organization
  }
>

export class CreateOrganizationUseCase {
  constructor(private organizationRepo: OrganizationRepo) {}

  public async execute(
    dto: CreateOrganizationUseCaseRequest,
  ): Promise<CreateOrganizationUseCaseResponse> {
    const slug = Slug.createFromText(dto.name)._value
    const orgExists = await this.organizationRepo.findBySlug(slug)

    if (orgExists) {
      throw new SlugAlreadyExistsError()
    }

    const org = await this.organizationRepo.create(Organization.create(dto))
    return right({ org })
  }
}
