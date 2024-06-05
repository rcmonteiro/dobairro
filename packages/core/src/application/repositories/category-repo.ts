import type { Category } from '@/domain/entities/category'

export interface CategoryRepo {
  create(data: Category): Promise<Category>
  delete(data: Category): Promise<void>
  findBySlug(slug: string, organizationId: string): Promise<Category | null>
  findById(categoryId: string, organizationId: string): Promise<Category | null>
  findManyByOrg(organizationId: string): Promise<Category[]>
}
