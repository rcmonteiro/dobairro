import { Button } from '@dobairro/design-system'
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
        <Link
          href="#features-section"
          className="underline-offset-8 hover:underline"
        >
          Funcionalidades
        </Link>
        <Link href="#testimonials-section">Depoimentos</Link>
        <Link href="#pricing-section">Planos</Link>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="ghost">Entrar</Button>
        <Button>Iniciar agora</Button>
      </div>
    </header>
  )
}
