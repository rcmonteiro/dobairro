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

import feature1 from '../../assets/home/feature-dashboard.png'
import feature2 from '../../assets/home/feature-orders.png'
import feature3 from '../../assets/home/feature-products.png'
import feature4 from '../../assets/home/feature-store.png'

export default function Features() {
  const images = [feature1, feature2, feature3, feature4]
  const [selected, setSelected] = useState({
    index: 0,
    image: images[0],
  })

  const handleSelectFeature = (feature: number) => {
    setSelected({
      index: feature,
      image: images[feature],
    })
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
            <FeatureTabsTab
              data-selected={selected.index === 0}
              onClick={() => handleSelectFeature(0)}
            >
              <Heading className="text-white">Resultados de vendas</Heading>
              <Text className="mt-2 text-white">
                Acompanhe os resultados de suas vendas com facilidade
              </Text>
            </FeatureTabsTab>
            <FeatureTabsTab
              data-selected={selected.index === 1}
              onClick={() => handleSelectFeature(1)}
            >
              <Heading className="text-white">Gerencie seus Pedidos</Heading>
              <Text className="mt-2 text-white">
                Controle todo o fluxo de pedidos com facilidade
              </Text>
            </FeatureTabsTab>
            <FeatureTabsTab
              data-selected={selected.index === 2}
              onClick={() => handleSelectFeature(2)}
            >
              <Heading className="text-white">Gerenciar produtos</Heading>
              <Text className="mt-2 text-white">
                Controle total dos produtos que você está vendendo
              </Text>
            </FeatureTabsTab>
            <FeatureTabsTab
              data-selected={selected.index === 3}
              onClick={() => handleSelectFeature(3)}
            >
              <Heading className="text-white">Sua presença digital</Heading>
              <Text className="mt-2 text-white">
                Personalize sua loja virtual com simplicidade e rapidez
              </Text>
            </FeatureTabsTab>
          </FeatureTabsOptions>
          <FeatureTabsContent>
            <Image
              src={selected.image}
              alt="Features"
              width={1200}
              height={808}
            />
          </FeatureTabsContent>
        </FeatureTabs>
      </div>
    </section>
  )
}
