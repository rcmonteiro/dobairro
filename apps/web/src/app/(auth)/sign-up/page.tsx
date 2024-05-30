'use client'

import { Button, Heading, Input, Label, Text } from '@dobairro/design-system'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type { FormEvent } from 'react'
import { useFormState, useFormStatus } from 'react-dom'

import { register } from '@/actions/auth/register'

export default function SignUp() {
  const [errorMessage, dispatch] = useFormState(register, undefined)
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
          <Link href="/sign-in">Já tenho cadastro</Link>
        </Button>
        <div className="flex w-[350px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <Heading size="lg">Crie sua conta</Heading>
            <Text>Comece a vender hoje mesmo!</Text>
          </div>
          <form className="space-y-6" action={dispatch}>
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <Input id="name" type="text" placeholder="Digite seu nome" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="Digite seu melhor e-mail"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Senha</Label>
              <Input
                id="email"
                type="password"
                placeholder="Crie sua senha de acesso"
              />
            </div>
            <div>{errorMessage ? <p>{errorMessage}</p> : null}</div>
            <Button className="w-full" onClick={handleSubmit}>
              Fazer meu cadastro
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}
