import { Button, Heading, Text } from '@dobairro/design-system'

export default function StartToday() {
  return (
    <section className="w-full px-4 py-16 shadow-md sm:px-0 sm:py-32">
      <div className="m-auto flex  max-w-4xl flex-col items-center gap-8 ">
        <Heading size="xl" className=" text-center">
          Comece hoje mesmo!
        </Heading>
        <Text size="lg" className="text-center leading-9">
          <Text as="strong" className="text-primary">
            DoBairro
          </Text>{' '}
          é a plataforma que transforma o comércio local. Aqui, você não só
          ganha uma{' '}
          <Text as="strong" className="text-primary">
            presença digital profissional
          </Text>{' '}
          que destaca seu negócio, mas também contribui para que a comunidade
          local prospere. Junte-se a nós e veja as vendas do seu bairro
          florescerem, entregando receitas incríveis bem na porta dos seus
          vizinhos.
        </Text>
        <Button size="large">Quero começar!</Button>
      </div>
    </section>
  )
}
