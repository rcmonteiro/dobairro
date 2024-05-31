import { ShoppingCartSimple } from '@phosphor-icons/react/dist/ssr'
import Link from 'next/link'

import { ProductItem } from '@/components/store/product-item'

export default function Store() {
  return (
    <div className="dobairro-store">
      <header className="px-4 lg:px-0">
        <div className="m-auto flex max-w-6xl items-center justify-between py-8">
          <h1 className="text-4xl font-semibold">Loja da Mel</h1>
          <button className="flex items-center gap-2 font-semibold">
            <ShoppingCartSimple className="size-8" />
            Carrinho (2)
          </button>
        </div>
      </header>

      <section className="categories mb-8 px-4 lg:px-0">
        <div className="m-auto flex max-w-6xl justify-center gap-4 [&_a]:mt-2 [&_a]:rounded-t-xl [&_a]:px-4 [&_a]:py-2 [&_a]:transition [&_a]:duration-200 [&_a]:ease-in-out">
          <Link href="/">Pães</Link>
          <Link href="/">Bolos</Link>
          <Link href="/">Cucas</Link>
        </div>
      </section>

      <section className="m-auto max-w-6xl px-4 lg:px-0">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <ProductItem />
          <ProductItem />
          <ProductItem />
          <ProductItem />
          <ProductItem />
          <ProductItem />
          <ProductItem />
          <ProductItem />
          <ProductItem />
          <ProductItem />
          <ProductItem />
        </div>
      </section>
    </div>
  )
}
