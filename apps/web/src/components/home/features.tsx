'use client'

import {
  FeatureTabs,
  FeatureTabsContent,
  FeatureTabsOptions,
  FeatureTabsTab,
  Heading,
  Text,
} from '@dobairro/design-system'
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
      className="flex w-full items-center bg-gradient-to-r from-secondary via-primary to-secondary px-4 py-16 sm:px-0 sm:py-32"
    >
      <div className="m-auto flex flex-col items-center gap-4  overflow-hidden">
        <Heading size="xl" className="text-center text-white">
          A gente descomplica para você!
        </Heading>
        <Text size="lg" className="text-center text-white">
          Tudo o que você precisa para divulgar e gerenciar as suas vendas
        </Text>
        <FeatureTabs className="mt-8">
          <FeatureTabsOptions>
            {Array.from({ length: 4 }).map((_, index) => (
              <FeatureTabsTab
                key={index}
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
              </FeatureTabsTab>
            ))}
          </FeatureTabsOptions>
          <FeatureTabsContent>
            <Image src={feature1} alt="Features" width={1200} height={808} />
          </FeatureTabsContent>
        </FeatureTabs>
      </div>
    </section>
  )
}
