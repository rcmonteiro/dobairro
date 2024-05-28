import Image from 'next/image'
import Link from 'next/link'

import logo from '../assets/dobairro-small.png'

export default function Header() {
  return (
    <header className="my-8 flex w-full max-w-5xl items-center justify-between gap-8">
      <div className="flex items-center gap-8">
        <Link href="/">
          <Image src={logo} alt="Do Bairro" width={161} height={40} />
        </Link>
        <Link href="/features">Funcionalidades</Link>
        <Link href="/testimonials">Depoimentos</Link>
        <Link href="/pricing">Planos</Link>
      </div>
      <div className="flex items-center gap-4">
        <button>Entrar</button>
        <button>Iniciar agora</button>
      </div>
    </header>
  )
}
