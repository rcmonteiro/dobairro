'use client'

import { Button, TableCell, TableRow } from '@dobairro/design-system'
import { ArrowRight, MagnifyingGlass, X } from '@phosphor-icons/react/dist/ssr'
import * as Dialog from '@radix-ui/react-dialog'
import { useState } from 'react'

import { currency, distanceToNow } from '@/utils/formatters'

import { OrderDetail } from './order-detail'
import { OrderStatus, type TOrderStatus } from './order-status'

export interface OrderItemProps {
  order: {
    orderId: string
    createdAt: string
    status: TOrderStatus
    customerName: string
    total: number
  }
}

export const OrderItem = ({ order }: OrderItemProps) => {
  const [isOrderDetailsOpen, setOrderDetailsOpen] = useState(false)

  return (
    <TableRow>
      <TableCell>
        <Dialog.Root
          open={isOrderDetailsOpen}
          onOpenChange={setOrderDetailsOpen}
        >
          <Dialog.Trigger asChild>
            <Button size="icon">
              <MagnifyingGlass size={16} />
              <span className="sr-only">Detalhes do pedido</span>
            </Button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <OrderDetail order={order} />
          </Dialog.Portal>
        </Dialog.Root>
      </TableCell>
      <TableCell> {order.orderId} </TableCell>
      <TableCell>{distanceToNow(order.createdAt)}</TableCell>
      <TableCell>
        <OrderStatus status={order.status} />
      </TableCell>
      <TableCell> {order.customerName} </TableCell>
      <TableCell>{currency(order.total / 100)}</TableCell>
      <TableCell>
        {order.status === 'pending' && (
          <Button variant="outline" size="small">
            Aprovar
            <ArrowRight className="ml-2 h-3 w-3" />
          </Button>
        )}

        {order.status === 'processing' && (
          <Button variant="outline" size="small">
            Em entrega
            <ArrowRight className="ml-2 h-3 w-3" />
          </Button>
        )}

        {order.status === 'delivering' && (
          <Button variant="outline" size="small">
            Entregue
            <ArrowRight className="ml-2 h-3 w-3" />
          </Button>
        )}
      </TableCell>
      <TableCell>
        <Button
          variant="ghost"
          size="small"
          disabled={!['pending', 'processing'].includes(order.status)}
        >
          <X className="mr-2 h-3 w-3" />
          Cancelar
        </Button>
      </TableCell>
    </TableRow>
  )
}
