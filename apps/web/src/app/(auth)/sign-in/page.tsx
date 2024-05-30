'use client'

import { Button, Heading, Input, Label, Text } from '@dobairro/design-system'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type { FormEvent } from 'react'
import { useFormState, useFormStatus } from 'react-dom'

import { authenticate } from '@/actions/auth/authenticate'

export default function SignIn() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined)
  const { pending } = useFormStatus()
  const router = useRouter()

  const handleSubmit = (event: FormEvent) => {
    if (pending) {
      event.preventDefault()
    }
    router.push('/dashboard')
  }
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
          <form className="space-y-6" action={dispatch}>
            <div className="space-y-2">
              <Label htmlFor="email">Seu e-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="Digite seu melhor e-mail"
              />
            </div>
            <div>{errorMessage ? <p>{errorMessage}</p> : null}</div>
            <Button className="w-full" onClick={handleSubmit}>
              Acessar painel
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}
