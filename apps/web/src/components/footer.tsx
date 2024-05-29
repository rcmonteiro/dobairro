import { Button, Text } from '@dobairro/design-system'
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
    <footer className="bg-primary/10 w-full py-32">
      <div className="m-auto flex w-full max-w-5xl flex-col items-center justify-center gap-8">
        <Image src={logo} alt="Do Bairro" width={161} height={40} />
        <div className="flex gap-8">
          <Link
            href="#features-section"
            className="underline-offset-8 hover:underline"
          >
            Funcionalidades
          </Link>
          <Link href="#testimonials-section">Depoimentos</Link>
          <Link href="#pricing-section">Planos</Link>
        </div>
        <div className="flex w-full items-center justify-between">
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
