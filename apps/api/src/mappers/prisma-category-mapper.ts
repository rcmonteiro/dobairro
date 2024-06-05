import { Category, Id, Slug } from '@dobairro/core'
import type { Category as PrismaCategory, Prisma } from '@prisma/client'

export class PrismaCategoryMapper {
  static toPrisma(category: Category): Prisma.CategoryUncheckedCreateInput {
    return {
      id: category.id.toString(),
      organizationId: category.organizationId.toString(),
      title: category.title,
      slug: category.slug._value,
    }
  }

  static toDomain(raw: PrismaCategory): Category {
    return Category.create(
      {
        organizationId: new Id(raw.organizationId),
        title: raw.title,
        slug: Slug.create(raw.slug),
      },
      new Id(raw.id),
    )
  }
}
