'use client'

import Image from 'next/image'
import { useState } from 'react'

import feature1 from '../../assets/payroll.webp'

export default function Features() {
  const [selected, setSelected] = useState(0)

  const handleSelectFeature = (feature: number) => {
    setSelected(feature)
  }

  return (
    <section className="flex w-full items-center bg-gradient-to-r from-blue-600 via-blue-700 to-blue-400 py-16">
      <div className="m-auto flex flex-col gap-4 ">
        <p className="text-center text-5xl font-bold text-white">
          A gente descomplica para você!
        </p>
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
                <h3 className="text-lg">Funcionalidade {index + 1}</h3>
                <p className="mt-2 text-sm">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
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
