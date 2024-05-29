import '@dobairro/design-system/styles.css'
import '../globals.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

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
    <html lang="en">
      <body
        className={`${inter.className} flex h-screen flex-col items-center`}
      >
        {children}
      </body>
    </html>
  )
}
