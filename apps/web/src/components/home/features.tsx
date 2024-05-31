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

import feature1 from '../../assets/feature-dashboard.png'
import feature3 from '../../assets/feature-order-detail.png'
import feature2 from '../../assets/feature-orders.png'

export default function Features() {
  const images = [feature1, feature2, feature3, feature1]
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
              <Heading className="text-white">Visão Geral de Vendas</Heading>
              <Text className="mt-2 text-white">
                Acompanhe o desempenho do seu negócio com gráficos detalhados
                das vendas do mês e do dia.
              </Text>
            </FeatureTabsTab>
            <FeatureTabsTab
              data-selected={selected.index === 1}
              onClick={() => handleSelectFeature(1)}
            >
              <Heading className="text-white">
                Gerencie seus Pedidos com Eficiência
              </Heading>
              <Text className="mt-2 text-white">
                Visualize, organize e processe seus pedidos com facilidade, tudo
                em um só lugar.
              </Text>
            </FeatureTabsTab>
            <FeatureTabsTab
              data-selected={selected.index === 2}
              onClick={() => handleSelectFeature(2)}
            >
              <Heading className="text-white">
                Informações Completas de Cada Pedido
              </Heading>
              <Text className="mt-2 text-white">
                Acesse todos os detalhes de cada pedido, incluindo produtos,
                valores e status.
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
