'use client'

import { Button, TableCell, TableRow, Text } from '@dobairro/design-system'
import { Pencil, Trash } from '@phosphor-icons/react'
import Image from 'next/image'

import { currency } from '@/utils/formatters'

export interface ProductItemProps {
  product: {
    productId: string
    title: string
    category: string
    total: number
  }
}

export const ProductItem = ({ product }: ProductItemProps) => {
  return (
    <TableRow>
      <TableCell>
        <Image
          src="/products/produto.png"
          alt={product.title}
          className="rounded-lg"
          width={160}
          height={40}
        />{' '}
      </TableCell>
      <TableCell>
        <Text as="p" size="sm" className="text-default/80">
          {product.productId}
        </Text>
        <Text size="lg" as="span">
          {product.title}
        </Text>
      </TableCell>
      <TableCell> {product.category} </TableCell>
      <TableCell>
        <Text size="lg" as="span">
          {currency(product.total / 100)}
        </Text>
      </TableCell>
      <TableCell className="flex flex-col gap-4">
        <Button variant="outline" size="small" className="bg-white">
          <Pencil className="mr-2 h-3 w-3" />
          Cancelar
        </Button>
        <Button variant="outline" size="small" className="bg-white">
          <Trash className="mr-2 h-3 w-3" />
          Apagar
        </Button>
      </TableCell>
    </TableRow>
  )
}
