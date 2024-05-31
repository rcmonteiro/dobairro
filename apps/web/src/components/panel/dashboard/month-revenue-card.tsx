import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Heading,
} from '@dobairro/design-system'
import { CurrencyDollar } from '@phosphor-icons/react/dist/ssr'

import { currency } from '@/utils/formatters'

export const MonthRevenueCard = () => {
  const cardData = {
    amount: 1478,
    diffFromLastMonth: 20,
  }
  return (
    <Card>
      <CardHeader className="pb2 flex flex-row items-center justify-between space-y-0">
        <CurrencyDollar className="size-10 rounded-full bg-secondary p-2 text-white" />
        <CardTitle className="text-md font-semibold text-default/80">
          Receita total (mês)
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-1">
        <>
          <Heading size="lg">{currency(cardData?.amount / 100)}</Heading>
          <p className="text-xs">
            {cardData.diffFromLastMonth > 0 ? (
              <span className="text-green font-semibold">
                +{cardData?.diffFromLastMonth}%
              </span>
            ) : (
              <span className="text-red font-semibold">
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
