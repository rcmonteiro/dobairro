import type { Product } from '@/domain/entities/product'

export interface ProductRepo {
  create(data: Product): Promise<Product>
  delete(data: Product): Promise<void>
  findBySlug(slug: string, organizationId: string): Promise<Product | null>
  findById(productId: string, organizationId: string): Promise<Product | null>
  findManyByOrg(organizationId: string): Promise<Product[]>
}
