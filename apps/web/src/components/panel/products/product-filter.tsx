'use client'

import { Button, Input } from '@dobairro/design-system'
import { MagnifyingGlass, Plus } from '@phosphor-icons/react'

export const ProductFilter = () => {
  return (
    <form className="flex justify-end gap-4">
      <Input placeholder="Buscar produtos" />
      <Button variant="secondary">
        <MagnifyingGlass />
        Buscar produtos
      </Button>
      <Button>
        <Plus />
        Cadastrar novo produto
      </Button>
    </form>
  )
}
