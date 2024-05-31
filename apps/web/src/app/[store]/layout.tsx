import '@dobairro/design-system/styles.css'
import '../globals.css'
import './store.css'

import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google'

const defaultFont = Open_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
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
    <html className="scroll-smooth antialiased" lang="en">
      <body className={`${defaultFont.className}`} data-theme="default">
        {children}
      </body>
    </html>
  )
}
