import { Organization } from '@/domain/entities/organization'
import { Theme } from '@/domain/entities/theme'
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

    const newOrg = Organization.create({
      ownerId: dto.ownerId,
      name: dto.name,
      theme: Theme.create({
        name: 'default',
        colors: ['#3E7E6C', '#FCBD18', '#F6F5F2'],
      }),
      slug,
    })

    const org = await this.organizationRepo.create(newOrg)

    return right({ org })
  }
}
