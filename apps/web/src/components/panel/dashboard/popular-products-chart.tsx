'use client'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@dobairro/design-system'
import { ChartBar } from '@phosphor-icons/react'
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts'
import twColors from 'tailwindcss/colors'

const COLORS = [
  twColors.sky[500],
  twColors.amber[500],
  twColors.violet[500],
  twColors.emerald[500],
  twColors.rose[500],
]

export const PopularProductsChart = () => {
  const cardData = [
    { product: 'Bolo de cenoura', amount: 150 },
    { product: 'Pão Sovado', amount: 101 },
    { product: 'Bolo de milho', amount: 89 },
    { product: 'Cuca de goiabada', amount: 75 },
    { product: 'Biscoito de polvilho', amount: 29 },
  ]

  return (
    <Card className="col-span-3">
      <CardHeader className="pb8">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">
            Produtos populares
          </CardTitle>
          <ChartBar className="h4 w-4" />
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={240}>
          <PieChart style={{ fontSize: 12 }}>
            <Pie
              data={cardData}
              dataKey="amount"
              nameKey="product"
              cx="50%"
              cy="50%"
              outerRadius={84}
              innerRadius={64}
              strokeWidth={8}
              fill={twColors.emerald[500]}
              labelLine={false}
              label={({
                cx,
                cy,
                midAngle,
                innerRadius,
                outerRadius,
                value,
                index,
              }) => {
                const RADIAN = Math.PI / 180
                const radius = 12 + innerRadius + (outerRadius - innerRadius)
                const x = cx + radius * Math.cos(-midAngle * RADIAN)
                const y = cy + radius * Math.sin(-midAngle * RADIAN)

                return cardData[index].product ? (
                  <text
                    x={x}
                    y={y}
                    className="fill-muted-foreground text-xs"
                    textAnchor={x > cx ? 'start' : 'end'}
                    dominantBaseline="central"
                  >
                    {cardData[index].product.length > 12
                      ? cardData[index].product?.substring(0, 12).concat('...')
                      : cardData[index].product}{' '}
                    ({value})
                  </text>
                ) : null
              }}
            >
              {cardData.map((_, index) => {
                return (
                  <Cell
                    key={index}
                    fill={COLORS[index]}
                    className="stroke-background hover:opacity-50"
                  />
                )
              })}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
