import type { Category, CategoryRepo } from '@dobairro/core'

import { PrismaCategoryMapper } from '@/database/mappers/prisma-category-mapper'

import type { PrismaService } from '../prisma'

export class PrismaCategoryRepo implements CategoryRepo {
  constructor(private db: PrismaService) {}

  public async create(category: Category): Promise<Category> {
    const data = PrismaCategoryMapper.toPrisma(category)
    const dbCategory = await this.db.category.create({
      data,
    })
    return PrismaCategoryMapper.toDomain(dbCategory)
  }

  public async delete(category: Category): Promise<void> {
    await this.db.category.delete({
      where: {
        id: category.id.toString(),
        organizationId: category.organizationId.toString(),
      },
    })
  }

  public async findBySlug(slug: string): Promise<Category | null> {
    const category = await this.db.category.findUnique({
      where: {
        slug,
      },
    })

    if (!category) {
      return null
    }

    return PrismaCategoryMapper.toDomain(category)
  }

  public async findById(categoryId: string): Promise<Category | null> {
    const category = await this.db.category.findUnique({
      where: {
        id: categoryId,
      },
    })

    if (!category) {
      return null
    }

    return PrismaCategoryMapper.toDomain(category)
  }

  public async findManyByOrg(organizationId: string): Promise<Category[]> {
    const categories = await this.db.category.findMany({
      where: {
        organizationId,
      },
    })

    return categories.map(PrismaCategoryMapper.toDomain)
  }
}
