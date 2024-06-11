'use client'

import { Button, Input, Label } from '@dobairro/design-system'
import { useRouter } from 'next/navigation'

import { useFormState } from '@/hooks/use-form-state'

import { signUpAction } from './actions'

export const SignUpForm = () => {
  const router = useRouter()

  const [{ success, message, errors }, handleSubmit, isPending] = useFormState(
    signUpAction,
    () => router.push('/sign-in'),
  )

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {!success && !!message && <p className="text-sm text-red">{message}</p>}
      <div className="space-y-2">
        <Label htmlFor="name">Nome</Label>
        <Input
          id="name"
          name="name"
          type="text"
          placeholder="Digite seu nome"
        />
        {errors?.name && (
          <p className="text-xs font-medium text-red">{errors.name[0]}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">E-mail</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Digite seu melhor e-mail"
        />
        {errors?.email && (
          <p className="text-xs font-medium text-red">{errors.email[0]}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="street">Rua</Label>
        <Input id="street" name="street" type="text" placeholder="Sua rua" />
        {errors?.street && (
          <p className="text-xs font-medium text-red">{errors.street[0]}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="number">Número</Label>
        <Input id="number" name="number" type="number" />
        {errors?.number && (
          <p className="text-xs font-medium text-red">{errors.city[0]}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="city">Cidade</Label>
        <Input id="city" name="city" type="text" placeholder="Sua cidade" />
        {errors?.city && (
          <p className="text-xs font-medium text-red">{errors.city[0]}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="state">Estado</Label>
        <Input id="state" name="state" type="text" placeholder="Seu estado" />
        {errors?.state && (
          <p className="text-xs font-medium text-red">{errors.state[0]}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="zipCode">CEP</Label>
        <Input id="zipCode" name="zipCode" type="text" placeholder="Seu CEP" />
        {errors?.zipCode && (
          <p className="text-xs font-medium text-red">{errors.zipCode[0]}</p>
        )}
      </div>
      <Button className="w-full" disabled={isPending}>
        Fazer meu cadastro
      </Button>
    </form>
  )
}
