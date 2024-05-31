import {
  Avatar,
  AvatarImage,
  AvatarName,
  AvatarRole,
  Card,
  Heading,
  Text,
} from '@dobairro/design-system'

export default function Testimonials() {
  return (
    <section
      id="testimonials-section"
      className="w-full px-4 py-16 shadow-md sm:py-32 lg:px-0"
    >
      <div className=" m-auto flex max-w-5xl flex-col">
        <div className="m-auto flex flex-col gap-4 ">
          <Heading size="xl" className="text-center">
            Histórias de sucesso
          </Heading>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <Card key={index} className="p-6">
              <Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Text>
              <Avatar size="full" className="mt-4">
                <AvatarImage src="/images/avatar.png" />
                <AvatarName>Ricardo Monteiro</AvatarName>
                <AvatarRole>Developer</AvatarRole>
              </Avatar>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
