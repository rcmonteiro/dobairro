'use client'

import { Heading, Text } from '@dobairro/design-system'
import Image from 'next/image'
import { useState } from 'react'

import feature1 from '../../assets/payroll.webp'

export default function Features() {
  const [selected, setSelected] = useState(0)

  const handleSelectFeature = (feature: number) => {
    setSelected(feature)
  }

  return (
    <section
      id="features-section"
      className="from-secondary to-secondary via-primary flex w-full items-center bg-gradient-to-r py-32"
    >
      <div className="m-auto flex flex-col gap-4 ">
        <Heading size="xl" className="text-center text-white">
          A gente descomplica para você!
        </Heading>
        <p className="text-center text-xl text-slate-100">
          Tudo o que você precisa para divulgar e gerenciar as suas vendas
        </p>
        <div className="mt-8 grid grid-cols-[40rem_1fr]">
          <div className="ml-12 flex flex-col justify-center">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="cursor-pointer rounded-l-xl rounded-r-none px-6 py-4 text-white hover:bg-white/5 data-[selected=true]:bg-white/10 data-[selected=true]:ring-1 data-[selected=true]:ring-inset data-[selected=true]:ring-white/10"
                data-selected={selected === index}
                onClick={() => handleSelectFeature(index)}
              >
                <Heading className="text-white">
                  Funcionalidade {index + 1}
                </Heading>
                <Text className="mt-2 text-white">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </Text>
              </div>
            ))}
          </div>
          <div className="mt-10 w-[45rem] overflow-hidden rounded-xl sm:w-auto lg:mt-0 lg:w-[67.8125rem]">
            <Image
              className="shadow-lg shadow-white/10"
              src={feature1}
              alt="Features"
              width={1200}
              height={808}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
