import { Heart } from '@phosphor-icons/react/dist/ssr'
import Image from 'next/image'

export const ProductItem = () => {
  return (
    <div className="product-item flex flex-col gap-4 rounded-xl p-6">
      <Image
        className="w-full rounded-xl object-cover"
        alt="Produto"
        src="/products/produto.png"
        width={400}
        height={400}
      />
      <div className="product-price mr-auto rounded-xl px-4 py-2 text-lg font-semibold">
        R$ 20,00
      </div>
      <div>Bolo de milho</div>
      <div className="flex justify-between">
        <button className="product-button rounded-xl px-4 py-2">
          Adicionar no carrinho
        </button>
        <button className="product-button size-10 rounded-full">
          <Heart className="m-auto size-6" />
        </button>
      </div>
    </div>
  )
}
