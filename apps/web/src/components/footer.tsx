import { Text } from '@dobairro/design-system'
import Image from 'next/image'

import logo from '../assets/logo-dobairro-white.svg'

export default function Footer() {
  return (
    <footer className="flex w-full flex-col items-center justify-center gap-8 bg-default py-16">
      <Image src={logo} alt="Do Bairro" width={161} height={40} />
      <Text size="sm" className="text-white/80">
        Copyright &copy; 2024 DoBairro. All rights reserved.
      </Text>
    </footer>
  )
}
