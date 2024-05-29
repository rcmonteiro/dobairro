import { Button, Heading, Text } from '@dobairro/design-system'

export default function StartToday() {
  return (
    <section className="w-full py-32 shadow-md">
      <div className="m-auto flex flex-col items-center gap-8 ">
        <Heading size="xl" className=" text-center">
          Comece hoje mesmo!
        </Heading>
        <Text size="lg" className="text-center">
          Não precisa de cartão de crédito, comece hoje sem compromisso.
        </Text>
        <Button>Quero começar!</Button>
      </div>
    </section>
  )
}
