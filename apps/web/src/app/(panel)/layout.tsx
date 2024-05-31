import '@dobairro/design-system/styles.css'
import '../globals.css'

import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google'

import { Sidebar } from '@/components/panel/sidebar'

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
    <html
      className="scroll-smooth antialiased selection:bg-primary selection:text-white"
      lang="en"
    >
      <body className={`${defaultFont.className}`}>
        <div className="relative min-h-screen lg:grid lg:grid-cols-app">
          <Sidebar />
          <main className="max-w-[100vw] bg-default/10 pt-16 lg:col-start-2 lg:pt-0">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
