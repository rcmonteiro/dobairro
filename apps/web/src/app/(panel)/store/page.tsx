'use client'

import '../../[store]/store.css'

import { Button } from '@dobairro/design-system'
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

      <div className="mb-8 flex gap-4">
        <Button
          variant="ghost"
          className="flex flex-col bg-[#F6F5F2] px-4 py-2 ring ring-primary"
          onClick={() => toggleTheme('default')}
        >
          <span>Padrão</span>
          <div className="flex gap-2">
            <div className="h-6 w-16 rounded-full bg-[#FCBD18] shadow" />
            <div className="h-6 w-16 rounded-full bg-[#3E7E6C] shadow" />
          </div>
        </Button>
        <Button
          variant="ghost"
          className="flex flex-col bg-[#C6D1FF] px-4 py-2"
          onClick={() => toggleTheme('default')}
        >
          <span>Inverno</span>
          <div className="flex gap-2">
            <div className="h-6 w-16 rounded-full bg-[#7994FF] shadow" />
            <div className="h-6 w-16 rounded-full bg-[#3D4A80] shadow" />
          </div>
        </Button>
        <Button
          variant="ghost"
          className="flex flex-col bg-[#FFE7CC] px-4 py-2"
          onClick={() => toggleTheme('default')}
        >
          <span>Verão</span>
          <div className="flex gap-2">
            <div className="h-6 w-16 rounded-full bg-[#71D3D0] shadow" />
            <div className="h-6 w-16 rounded-full bg-[#F38882] shadow" />
          </div>
        </Button>
      </div>

      <div className="max-h-[700px] overflow-y-scroll rounded-xl border ring-4">
        <Store />
      </div>
    </Container>
  )
}
