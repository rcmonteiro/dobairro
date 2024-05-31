'use client'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@dobairro/design-system'
import { useMemo } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts'
import twColors from 'tailwindcss/colors'

export const SalesChart = () => {
  const revenueByPeriod = [
    { date: '20/03', receipt: 45100, amount: 120 },
    { date: '19/03', receipt: 70100, amount: 170 },
    { date: '18/03', receipt: 50900, amount: 124 },
    { date: '17/03', receipt: 10050, amount: 67 },
    { date: '16/03', receipt: 40090, amount: 121 },
    { date: '15/03', receipt: 30090, amount: 110 },
    { date: '14/03', receipt: 21090, amount: 71 },
  ]

  const cardData = useMemo(() => {
    return revenueByPeriod?.map((item) => {
      return {
        date: item.date,
        receipt: item.receipt / 100,
        amount: item.amount,
      }
    })
  }, [revenueByPeriod])

  return (
    <Card className="col-span-2">
      <CardHeader className="pb8 flex flex-row items-center justify-between">
        <div className="space-y-1">
          <CardTitle className="text-base font-medium">
            Vendas nos últimos dias
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={360}>
          <BarChart data={cardData} style={{ fontSize: 12 }}>
            <XAxis dataKey="date" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Bar dataKey="amount" stackId="a" fill={twColors.blue['400']} />
            <Bar dataKey="receipt" stackId="a" fill={twColors.green['400']} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
