import { Card, Heading, Text } from '@dobairro/design-system'

export default function Testimonials() {
  return (
    <section id="testimonials-section" className="w-full shadow-md">
      <div className=" m-auto flex max-w-5xl flex-col py-32">
        <div className="m-auto flex flex-col gap-4 ">
          <Heading size="xl" className="text-center">
            Histórias de sucesso
          </Heading>
        </div>
        <div className="mt-8 grid grid-flow-row-dense grid-cols-3 grid-rows-3 gap-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <Card.Root
              key={index}
              className="rounded-2xl bg-white p-6 shadow-xl shadow-slate-900/10"
            >
              <Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Text>
              <Heading size="md">Pessoa {index}</Heading>
            </Card.Root>
          ))}
        </div>
      </div>
    </section>
  )
}
