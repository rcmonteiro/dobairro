'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@dobairro/design-system'
import { useMemo } from 'react'
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts'
import twColors from 'tailwindcss/colors'

export const RevenueChart = () => {
  const revenueByPeriod = [
    { date: '20/03', receipt: 45100 },
    { date: '19/03', receipt: 70100 },
    { date: '18/03', receipt: 50900 },
    { date: '17/03', receipt: 10050 },
    { date: '16/03', receipt: 40090 },
    { date: '15/03', receipt: 30090 },
    { date: '14/03', receipt: 21090 },
  ]

  const cardData = useMemo(() => {
    return revenueByPeriod?.map((item) => {
      return {
        date: item.date,
        receipt: item.receipt / 100,
      }
    })
  }, [revenueByPeriod])

  return (
    <Card className="col-span-2">
      <CardHeader className="pb8 flex flex-row items-center justify-between">
        <div className="space-y-1">
          <CardTitle className="text-base font-medium">
            Receita no período
          </CardTitle>
          <CardDescription>Receita diária no período</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={360}>
          <LineChart data={cardData} style={{ fontSize: 12 }}>
            <YAxis
              axisLine={false}
              width={80}
              tickLine={false}
              tickFormatter={(value: number) =>
                value.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })
              }
            />
            <XAxis
              dataKey="date"
              axisLine={false}
              width={80}
              tickLine={false}
              dy={16}
            />
            <CartesianGrid vertical={false} className=" stroke-muted" />
            <Line
              type="linear"
              stroke={twColors.blue['400']}
              strokeWidth={2}
              dataKey="receipt"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
