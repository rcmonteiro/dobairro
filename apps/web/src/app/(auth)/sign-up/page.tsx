import { Button, Heading, Text } from '@dobairro/design-system'
import Link from 'next/link'

import { SignUpForm } from './sign-up-form'

export default function SignUp() {
  return (
    <>
      <div className="p-8">
        <Button variant={'ghost'} asChild className="absolute right-8 top-8">
          <Link href="/sign-in">Já tenho cadastro</Link>
        </Button>
        <div className="flex w-[350px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <Heading size="lg">Crie sua conta</Heading>
            <Text>Comece a vender hoje mesmo!</Text>
          </div>
          <SignUpForm />
        </div>
      </div>
    </>
  )
}
