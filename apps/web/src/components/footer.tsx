import { Button, NavLink, Text } from '@dobairro/design-system'
import {
  FacebookLogo,
  InstagramLogo,
  XLogo,
} from '@phosphor-icons/react/dist/ssr'
import Image from 'next/image'
import Link from 'next/link'

import logo from '../assets/dobairro-small.png'

export default function Footer() {
  return (
    <footer className="w-full px-4 py-16 sm:py-32 lg:px-0">
      <div className="m-auto flex w-full max-w-5xl flex-col items-center justify-center gap-8">
        <Image src={logo} alt="Do Bairro" width={161} height={40} />
        <div className="flex gap-8">
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
        <div className="flex w-full flex-col-reverse items-center justify-between gap-8 sm:flex-row">
          <Text size="sm">
            Copyright &copy; 2024 DoBairro. All rights reserved.
          </Text>
          <div className="flex gap-4">
            <Button size="icon">
              <InstagramLogo size={32} weight="light" />
            </Button>
            <Button size="icon">
              <XLogo size={32} weight="light" />
            </Button>
            <Button size="icon">
              <FacebookLogo size={32} weight="light" />
            </Button>
          </div>
        </div>
      </div>
    </footer>
  )
}
