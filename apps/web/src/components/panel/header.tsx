import { Heading } from '@dobairro/design-system'

interface HeaderProps {
  children: React.ReactNode
}

export default function Header({ children }: HeaderProps) {
  return (
    <header className="bg-default px-8 py-8 shadow-md shadow-default/50">
      <Heading className="text-white">{children}</Heading>
    </header>
  )
}
