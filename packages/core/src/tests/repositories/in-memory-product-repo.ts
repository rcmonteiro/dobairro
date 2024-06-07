import type { ProductRepo } from '@/application/repositories/product-repo'
import type { Product } from '@/domain/entities/product'
import { Id } from '@/domain/types/id'

export class InMemoryProductRepo implements ProductRepo {
  public items: Product[] = []

  public async create(data: Product): Promise<Product> {
    this.items.push(data)
    return data
  }

  public async delete(data: Product): Promise<void> {
    this.items = this.items.filter((item) => !item.id.equals(data.id))
  }

  public async findBySlug(
    slug: string,
    organizationId: string,
  ): Promise<Product | null> {
    const product = this.items.find(
      (item) =>
        item.slug.isEqual(slug) &&
        item.organizationId.equals(new Id(organizationId)),
    )
    return product ?? null
  }

  public async findById(
    productId: string,
    organizationId: string,
  ): Promise<Product | null> {
    const product = this.items.find(
      (item) =>
        item.organizationId.equals(new Id(organizationId)) &&
        item.id.equals(new Id(productId)),
    )
    return product ?? null
  }

  public async findManyByOrg(organizationId: string): Promise<Product[]> {
    const categories = this.items.filter((item) =>
      item.organizationId.equals(new Id(organizationId)),
    )
    return categories
  }
}
