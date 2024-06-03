'use client'

import {
  Button,
  Input,
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
} from '@dobairro/design-system'

import { orderStatusMap, type TOrderStatus } from './order-status'

export const OrderFilter = () => {
  return (
    <form className="flex gap-4">
      <Input placeholder="Identificador" />
      <SelectRoot>
        <SelectTrigger label="Status" />
        <SelectContent>
          <>
            {Object.keys(orderStatusMap).map((status) => (
              <SelectItem key={status} value={status}>
                {orderStatusMap[status as TOrderStatus]}
              </SelectItem>
            ))}
          </>
        </SelectContent>
      </SelectRoot>

      <Input placeholder="Nome cliente" />
      <Button>Filtrar pedidos</Button>
    </form>
  )
}
