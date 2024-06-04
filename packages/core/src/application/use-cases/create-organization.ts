import { Organization } from '@/domain/entities/organization'
import type { Id } from '@/domain/types/id'
import { Slug } from '@/domain/value-objects/slug'

import { type Either, left, right } from '../either'
import type { OrganizationRepo } from '../repositories/organization-repo'
import { SlugAlreadyExistsError } from './_errors/slug-already-exists-error copy'

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
    const slug = Slug.createFromText(dto.name)
    const orgWithSameSlug = await this.organizationRepo.findBySlug(slug._value)

    if (orgWithSameSlug) {
      return left(new SlugAlreadyExistsError())
    }

    const org = await this.organizationRepo.create(
      Organization.create({ ...dto, slug }),
    )

    return right({ org })
  }
}
