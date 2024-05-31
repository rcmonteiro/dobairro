import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Heading,
} from '@dobairro/design-system'
import { ForkKnife } from '@phosphor-icons/react/dist/ssr'

import { formatNumber } from '@/utils/formatters'

export const DayOrdersAmountCard = () => {
  const cardData = {
    amount: 25,
    diffFromYesterday: 2,
  }

  return (
    <Card>
      <CardHeader className="pb2 flex flex-row items-center justify-between space-y-0">
        <ForkKnife className="size-10 rounded-full bg-secondary p-2 text-white" />
        <CardTitle className="text-md font-semibold text-default/80">
          Pedidos (dia)
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-1">
        <>
          <Heading size="lg">{formatNumber(cardData?.amount)}</Heading>
          <p className="text-muted-foreground text-xs">
            {cardData.diffFromYesterday > 0 ? (
              <span className="text-green font-semibold">
                +{cardData?.diffFromYesterday}%
              </span>
            ) : (
              <span className="text-red font-semibold">
                {cardData?.diffFromYesterday}%
              </span>
            )}{' '}
            em relação a ontem
          </p>
        </>
      </CardContent>
    </Card>
  )
}
