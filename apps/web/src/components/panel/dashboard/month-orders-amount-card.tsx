import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Heading,
} from '@dobairro/design-system'
import { ForkKnife } from '@phosphor-icons/react/dist/ssr'

import { formatNumber } from '@/utils/formatters'

export const MonthOrdersAmountCard = () => {
  const cardData = {
    amount: 203,
    diffFromLastMonth: -2,
  }
  return (
    <Card>
      <CardHeader className="pb2 flex flex-row items-center justify-between space-y-0">
        <ForkKnife className="size-10 rounded-full bg-default p-2 text-white" />
        <CardTitle className="text-md font-semibold text-default/80">
          Pedidos (mês)
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-1">
        <>
          <Heading size="lg">{formatNumber(cardData?.amount)}</Heading>
          <p className="text-xs">
            {cardData.diffFromLastMonth > 0 ? (
              <span className="font-semibold text-green">
                +{cardData?.diffFromLastMonth}%
              </span>
            ) : (
              <span className="font-semibold text-red">
                {cardData?.diffFromLastMonth}%
              </span>
            )}{' '}
            em relação ao mês passado
          </p>
        </>
      </CardContent>
    </Card>
  )
}
