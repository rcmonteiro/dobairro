import '@dobairro/design-system/styles.css'
import '../globals.css'

import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import { isAuthenticated } from '@/auth'

import logo from '../../assets/logo-dobairro.svg'

const defaultFont = Poppins({
  subsets: ['latin'],
  weight: ['100', '400', '600', '700'],
})

export const metadata: Metadata = {
  title: 'Seja do bairro você também!',
  description: 'Buscando uma renda extra? ou valorizando o nosso bairro?',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  if (isAuthenticated()) {
    return redirect('/dashboard')
  }
  return (
    <html
      className="scroll-smooth antialiased selection:bg-primary selection:text-white"
      lang="en"
    >
      <body
        className={`${defaultFont.className} flex h-screen flex-col items-center`}
      >
        <Link href="/">
          <Image
            src={logo}
            alt="Do Bairro"
            width={161}
            height={40}
            className="mt-4"
          />
        </Link>
        <div className="py-32">{children}</div>
      </body>
    </html>
  )
}
