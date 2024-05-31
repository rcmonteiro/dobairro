import { Heading } from '@dobairro/design-system'

interface HeaderProps {
  children: React.ReactNode
}

export default function Header({ children }: HeaderProps) {
  return (
    <header className="pb-8">
      <Heading size="lg">{children}</Heading>
    </header>
  )
}
