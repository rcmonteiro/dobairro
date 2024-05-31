'use client'

import '../../[store]/store.css'

import { useEffect, useState } from 'react'

import Store from '@/app/[store]/page'
import Container from '@/components/panel/container'
import Header from '@/components/panel/header'

export default function Settings() {
  const [theme, setTheme] = useState('default')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const toggleTheme = (theme: string) => {
    setTheme(theme)
  }
  return (
    <Container>
      <Header>Sua loja</Header>

      <div className="flex gap-4">
        <button
          className="rounded-full px-2 py-4"
          onClick={() => toggleTheme('default')}
        >
          default
        </button>
        <button
          className="rounded-full px-2 py-4"
          onClick={() => toggleTheme('blue-gray')}
        >
          blue-gray
        </button>
      </div>

      <div className="max-h-[700px] overflow-y-scroll rounded-xl border ring-4">
        <Store />
      </div>
    </Container>
  )
}
