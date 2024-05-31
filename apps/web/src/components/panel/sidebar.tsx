'use client'

import { Button, NavItem } from '@dobairro/design-system'
import {
  ChartLineUp,
  List,
  Package,
  Sliders,
  Storefront,
  Users,
} from '@phosphor-icons/react'
import * as Collapsible from '@radix-ui/react-collapsible'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

import logo from '../../assets/dobairro-small-white.png'

export const Sidebar = () => {
  const path = usePathname()

  return (
    <Collapsible.Root className="fixed left-0 right-0 top-0 z-10 flex flex-col gap-6 bg-default p-4 data-[state=open]:bottom-0 lg:bottom-0 lg:right-auto lg:h-auto lg:w-80 lg:px-5 lg:py-8">
      <div className="flex items-center justify-between">
        <Image
          src={logo}
          className="ml-2"
          alt="Do Bairro"
          width={161}
          height={40}
        />
        <Collapsible.Trigger asChild className="lg:hidden">
          <Button variant="ghost">
            <List className="size-6" />
          </Button>
        </Collapsible.Trigger>
      </div>

      <Collapsible.Content
        forceMount
        className="flex flex-col gap-6 data-[state=closed]:hidden lg:data-[state=closed]:flex"
      >
        <nav className="max-w-72 space-y-4">
          <NavItem
            href="/dashboard"
            current={path === '/dashboard'}
            icon={ChartLineUp}
            title="Resultados"
          />
          <NavItem
            href="/orders"
            current={path === '/orders'}
            icon={Package}
            title="Gerenciar pedidos"
          />
          <NavItem
            href="/store"
            current={path === '/store'}
            icon={Storefront}
            title="Sua loja"
          />
          <NavItem
            href="/settings"
            current={path === '/settings'}
            icon={Sliders}
            title="Configurações"
          />
          <NavItem
            href="/users"
            current={path === '/users'}
            icon={Users}
            title="Usuários"
          />
        </nav>
      </Collapsible.Content>
    </Collapsible.Root>
  )
}
