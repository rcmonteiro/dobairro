export type TOrderStatus =
  | 'pending'
  | 'canceled'
  | 'processing'
  | 'delivering'
  | 'delivered'

interface OrderStatusProps {
  status: TOrderStatus
}

const orderStatusMap: Record<TOrderStatus, string> = {
  pending: 'Pendente',
  canceled: 'Cancelado',
  processing: 'Em preparo',
  delivering: 'Em entrega',
  delivered: 'Entregue',
}

const orderStatusColors: Record<TOrderStatus, string> = {
  pending: 'bg-gray',
  canceled: 'bg-red',
  processing: 'bg-yellow',
  delivering: 'bg-blue',
  delivered: 'bg-green',
}

export const OrderStatus = ({ status }: OrderStatusProps) => {
  return (
    <div className="flex items-center gap-2">
      <span
        data-testid="badge"
        className={`h-3 w-3 rounded-full ring-1 ring-default ${orderStatusColors[status]}`}
      />
      <span className="font-medium text-default">{orderStatusMap[status]}</span>
    </div>
  )
}
