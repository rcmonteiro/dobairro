import type { CategoryRepo } from '@/application/repositories/category-repo'
import type { Category } from '@/domain/entities/category'
import { Id } from '@/domain/types/id'

export class InMemoryCategoryRepo implements CategoryRepo {
  public items: Category[] = []

  public async create(data: Category): Promise<Category> {
    this.items.push(data)
    return data
  }

  public async delete(data: Category): Promise<void> {
    this.items = this.items.filter((item) => !item.id.equals(data.id))
  }

  public async findBySlug(
    slug: string,
    organizationId: string,
  ): Promise<Category | null> {
    const category = this.items.find(
      (item) =>
        item.slug.isEqual(slug) &&
        item.organizationId.equals(new Id(organizationId)),
    )
    return category ?? null
  }

  public async findById(
    categoryId: string,
    organizationId: string,
  ): Promise<Category | null> {
    const category = this.items.find(
      (item) =>
        item.organizationId.equals(new Id(organizationId)) &&
        item.id.equals(new Id(categoryId)),
    )
    return category ?? null
  }

  public async findManyByOrg(organizationId: string): Promise<Category[]> {
    const categories = this.items.filter((item) =>
      item.organizationId.equals(new Id(organizationId)),
    )
    return categories
  }
}
