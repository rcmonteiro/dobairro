import { Button, Heading, Text } from '@dobairro/design-system'
import Image from 'next/image'

import heroImage from '../../assets/banner-hero.png'

export default function Hero() {
  return (
    <section className="w-full max-w-4xl py-16 sm:px-0 sm:py-32">
      <div className="flex items-center">
        <div className="flex flex-col gap-6">
          <Heading as="h1" size="xl">
            Transforme suas <Text className="text-primary">receitas</Text>
            <br />
            em <Text className="text-primary">renda extra</Text>
          </Heading>
          <Button size="large" className="mr-auto">
            Comece hoje, é gratuito!
          </Button>
        </div>
        <Image src={heroImage} width={500} height={500} alt="" />
      </div>
    </section>
  )
}
