import { Button, Heading, Text } from '@dobairro/design-system'

export default function Hero() {
  return (
    <section className="flex w-full max-w-4xl flex-col items-center justify-between gap-8 px-4 py-16 sm:px-0 sm:py-32">
      <Heading as="h1" size="xl" className="text-center">
        Transforme suas receitas
        <br />
        em <Text className="text-primary">renda extra</Text>!
      </Heading>
      <Text as="p" size="lg" className="text-center">
        Divulgue o que você faz de melhor no seu bairro
        <br />e aumente sua renda sem sair de casa!
      </Text>
      <Button>Ganhe 6 meses grátis!</Button>
    </section>
  )
}
