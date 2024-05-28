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
    <footer className="flex w-full max-w-5xl flex-col items-center justify-center gap-8 py-4">
      <Image src={logo} alt="Do Bairro" width={161} height={40} />
      <div className="flex gap-8">
        <Link href="/features">Funcionalidades</Link>
        <Link href="/testimonials">Depoimentos</Link>
        <Link href="/pricing">Planos</Link>
      </div>
      <div className="flex w-full justify-between">
        <span>Copyright &copy; 2024 DoBairro. All rights reserved.</span>
        <div className="flex gap-4">
          <Link href="https://instagram.comn">
            <InstagramLogo size={32} weight="light" />
          </Link>
          <Link href="https://x.comn">
            <XLogo size={32} weight="light" />
          </Link>
          <Link href="https://x.comn">
            <FacebookLogo size={32} weight="light" />
          </Link>
        </div>
      </div>
    </footer>
  )
}
