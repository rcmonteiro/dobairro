import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@dobairro/design-system'

import Header from '@/components/panel/header'

export default function Orders() {
  return (
    <>
      <Header>Gerenciar pedidos</Header>

      <div className="rounded-md border">
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
              return <div key={index}>{index}</div>
            })}
          </TableBody>
        </Table>
      </div>
    </>
  )
}
