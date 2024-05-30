import '@dobairro/design-system/styles.css'
import '../globals.css'

import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'

import { Sidebar } from '@/components/panel/sidebar'

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
    <html
      className="scroll-smooth antialiased selection:bg-primary selection:text-white"
      lang="en"
    >
      <body className={`${defaultFont.className}`}>
        <div className="lg:grid-cols-app relative min-h-screen lg:grid">
          <Sidebar />
          <main className="max-w-[100vw] pt-16 lg:col-start-2 lg:pt-0">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
