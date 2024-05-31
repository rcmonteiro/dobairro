import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@dobairro/design-system'

import Container from '@/components/panel/container'
import Header from '@/components/panel/header'
import { OrderItem } from '@/components/panel/orders/order-item'
import type { TOrderStatus } from '@/components/panel/orders/order-status'

export default function Orders() {
  return (
    <Container>
      <Header>Gerenciar pedidos</Header>
      <div className="overflow-hidden rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[64px]"></TableHead>
              <TableHead className="w-[140px]">Idenfificador</TableHead>
              <TableHead className="w-[180px]">Realizado há</TableHead>
              <TableHead className="w-[140px]">Status</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead className="w-[140px]">Total do pedido</TableHead>
              <TableHead className="w-[164px]"></TableHead>
              <TableHead className="w-[132px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 10 }).map((_, index) => {
              const order = {
                orderId: `N000${index}`,
                createdAt: new Date().toISOString(),
                status:
                  index % 3 === 0
                    ? 'processing'
                    : index % 4 === 0
                      ? 'pending'
                      : index % 5 === 0
                        ? 'canceled'
                        : ('delivered' as TOrderStatus),
                customerName: `Customer Name ${index}`,
                total: index * 10000,
              }
              return <OrderItem key={index} order={order} />
            })}
          </TableBody>
        </Table>
      </div>
    </Container>
  )
}
