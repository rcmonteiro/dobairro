import {
  Heading,
  PricingCard,
  PricingCardCTA,
  PricingCardDescription,
  PricingCardFeatures,
  PricingCardPrice,
  PricingCardTitle,
} from '@dobairro/design-system'

export default function Pricing() {
  return (
    <section
      id="pricing-section"
      className="w-full bg-secondary px-4 py-16 sm:px-0 sm:py-32"
    >
      <div className="m-auto flex max-w-5xl flex-col">
        <div className="flex flex-col items-center gap-4 ">
          <Heading size="xl" className="text-white">
            Invista em você!
          </Heading>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <PricingCard>
            <PricingCardPrice>R$9</PricingCardPrice>
            <PricingCardTitle>Pequeno</PricingCardTitle>
            <PricingCardDescription>Teste teste...</PricingCardDescription>
            <PricingCardCTA>Iniciar agora</PricingCardCTA>
            <PricingCardFeatures>
              <ul>
                <li>Feature #1</li>
                <li>Feature #2</li>
              </ul>
            </PricingCardFeatures>
          </PricingCard>

          <PricingCard variant="highlight">
            <PricingCardPrice>R$18</PricingCardPrice>
            <PricingCardTitle>Pequeno</PricingCardTitle>
            <PricingCardDescription>Teste teste...</PricingCardDescription>
            <PricingCardCTA>Iniciar agora</PricingCardCTA>
            <PricingCardFeatures>
              <ul>
                <li>Feature #1</li>
                <li>Feature #2</li>
              </ul>
            </PricingCardFeatures>
          </PricingCard>

          <PricingCard>
            <PricingCardPrice>R$89</PricingCardPrice>
            <PricingCardTitle>Pequeno</PricingCardTitle>
            <PricingCardDescription>Teste teste...</PricingCardDescription>
            <PricingCardCTA>Iniciar agora</PricingCardCTA>
            <PricingCardFeatures>
              <ul>
                <li>Feature #1</li>
                <li>Feature #2</li>
              </ul>
            </PricingCardFeatures>
          </PricingCard>
        </div>
      </div>
    </section>
  )
}
