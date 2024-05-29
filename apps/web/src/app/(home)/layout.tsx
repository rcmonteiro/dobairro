import '@dobairro/design-system/styles.css'
import '../globals.css'

import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'

const defaultFont = Poppins({
  subsets: ['latin'],
  weight: ['100', '400', '700'],
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
  return (
    <html className="scroll-smooth" lang="en">
      <body
        className={`${defaultFont.className} flex h-screen flex-col items-center`}
      >
        {children}
      </body>
    </html>
  )
}
