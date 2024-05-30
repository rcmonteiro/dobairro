import { Button, NavLink } from '@dobairro/design-system'
import Image from 'next/image'
import Link from 'next/link'

import logo from '../assets/dobairro-small.png'

export default function Header() {
  return (
    <header className="my-8 flex w-full  max-w-5xl flex-col items-center justify-between gap-8 px-4 sm:flex-row lg:px-0">
      <div className="flex items-center gap-8">
        <Link href="/">
          <Image src={logo} alt="Do Bairro" width={161} height={40} />
        </Link>

        <div className="hidden gap-4 md:flex">
          <NavLink asChild={true}>
            <Link href="#features-section">Funcionalidades</Link>
          </NavLink>
          <NavLink asChild={true}>
            <Link href="#testimonials-section">Depoimentos</Link>
          </NavLink>
          <NavLink asChild={true}>
            <Link href="#pricing-section">Planos</Link>
          </NavLink>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="ghost">Entrar</Button>
        <Button>Iniciar agora</Button>
      </div>
    </header>
  )
}
