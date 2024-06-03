import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@dobairro/design-system'

import Container from '@/components/panel/container'
import Header from '@/components/panel/header'
import { ProductFilter } from '@/components/panel/products/product-filter'
import { ProductItem } from '@/components/panel/store/product-item'

export default function Store() {
  return (
    <Container>
      <Header>Sua loja</Header>

      <div className="mb-8">
        <ProductFilter />
      </div>

      <div className="overflow-hidden rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[140px]">Identificador</TableHead>
              <TableHead className="w-[180px]">Produto</TableHead>
              <TableHead className="w-[140px]">Categoria</TableHead>
              <TableHead className="w-[140px]">Preço</TableHead>
              <TableHead className="w-[64px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 10 }).map((_, index) => {
              const product = {
                productId: `N000${index}`,
                title: `Produto - ${index}`,
                category: 'Categoria X',
                total: index * 30411,
              }
              return <ProductItem key={index} product={product} />
            })}
          </TableBody>
        </Table>
      </div>
    </Container>
  )
}
