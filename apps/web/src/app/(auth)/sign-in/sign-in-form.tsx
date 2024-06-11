'use client'

import { Button, Input, Label } from '@dobairro/design-system'

import { useFormState } from '@/hooks/use-form-state'

import { signInAction } from './actions'

export const SignInForm = () => {
  const [{ success, message, errors }, handleSubmit, isPending] =
    useFormState(signInAction)
  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {!success && !!message && <p className="text-sm text-red">{message}</p>}
      {success && !!message && <p className="text-sm text-green">{message}</p>}
      <div className="space-y-2">
        <Label htmlFor="email">Seu e-mail</Label>
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
      <Button className="w-full" disabled={isPending}>
        {isPending ? 'Enviando...' : 'Enviar'}
      </Button>
    </form>
  )
}
