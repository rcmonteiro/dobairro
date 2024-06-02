import { Button } from '@dobairro/design-system'
import Image from 'next/image'
import Link from 'next/link'

import logo from '../assets/logo-dobairro.svg'

export default function Header() {
  return (
    <header className="my-8 flex w-full  max-w-5xl flex-col items-center justify-between gap-8 px-4 sm:flex-row lg:px-0">
      <div className="flex items-center gap-8">
        <Link href="/">
          <Image src={logo} alt="Do Bairro" width={161} height={40} />
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="ghost">
          <Link href="/sign-in">Entrar</Link>
        </Button>
        <Button>
          <Link href="/sign-up">Iniciar agora</Link>
        </Button>
      </div>
    </header>
  )
}
