import { Button, Heading, Text } from '@dobairro/design-system'
import Link from 'next/link'

import { SignInForm } from './sign-in-form'

export default function SignIn() {
  return (
    <>
      <div className="p-8">
        <Button variant={'ghost'} asChild className="absolute right-8 top-8">
          <Link href="/sign-up">Criar minha conta</Link>
        </Button>
        <div className="flex w-[350px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <Heading size="lg">Acessar painel</Heading>
            <Text>Acompanhe suas vendas pelo painel Do Bairro</Text>
          </div>
          <SignInForm />
        </div>
      </div>
    </>
  )
}
