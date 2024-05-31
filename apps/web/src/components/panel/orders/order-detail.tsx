import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@dobairro/design-system'
import * as Dialog from '@radix-ui/react-dialog'

import { currency, distanceToNow } from '@/utils/formatters'

import type { OrderItemProps } from './order-item'
import { OrderStatus } from './order-status'

export const OrderDetail = ({ order }: OrderItemProps) => {
  return (
    <>
      <Dialog.Overlay className="fixed inset-0 z-20 bg-black/50" />
      <Dialog.Content className="fixed left-1/2 top-8 z-30 w-full max-w-xl -translate-x-1/2 rounded-lg bg-white p-6 shadow-lg">
        <Dialog.Title className="text-xl font-bold">
          Pedido #{order.orderId}
        </Dialog.Title>
        <Dialog.Description className="mt-2 text-sm text-default/80">
          Aqui você pode ver os detalhes do pedido.
        </Dialog.Description>
        <div className="space-y-6">
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="text-default/80">Status</TableCell>
                <TableCell className="flex justify-end">
                  <OrderStatus status={order.status} />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-default/80">Cliente</TableCell>
                <TableCell className="flex justify-end">
                  {order.customerName}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-default/80">Telefone</TableCell>
                <TableCell className="flex justify-end">xxx</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-default/80">E-mail</TableCell>
                <TableCell className="flex justify-end">xxx</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-default/80">Realizado há</TableCell>
                <TableCell className="flex justify-end">
                  {distanceToNow(order.createdAt)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produto</TableHead>
                <TableHead className="text-right">Qtd.</TableHead>
                <TableHead className="text-right">Preço</TableHead>
                <TableHead className="text-right">Subtotal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 4 }).map((_, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>xxx</TableCell>
                    <TableCell className="text-right">1</TableCell>
                    <TableCell className="text-right">
                      {currency(order.total / 100)}
                    </TableCell>
                    <TableCell className="text-right">
                      {currency((order.total / 100) * (index + 1))}
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>Total do pedido</TableCell>
                <TableCell className="text-right font-medium">
                  {currency(order.total / 100)}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </Dialog.Content>
    </>
  )
}
