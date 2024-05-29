import { Text } from '@dobairro/design-system'

export default function Hero() {
  return (
    <section className="flex w-full max-w-4xl flex-col items-center justify-between gap-8 py-16">
      <p className="text-center text-6xl font-bold">
        Transforme suas receitas
        <br />
        em <span className="text-pink-500">renda extra</span>!
      </p>
      <Text as="p" size="lg" className="text-center text-slate-500">
        Divulgue o que você faz de melhor no seu bairro
        <br />e aumente sua renda sem sair de casa!
      </Text>
      <button>Ganhe 6 meses grátis!</button>
    </section>
  )
}
