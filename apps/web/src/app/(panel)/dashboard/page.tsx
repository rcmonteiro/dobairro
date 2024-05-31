import Container from '@/components/panel/container'
import { DayOrdersAmountCard } from '@/components/panel/dashboard/day-orders-amount-card'
import { MonthCanceledCard } from '@/components/panel/dashboard/month-canceled-card'
import { MonthOrdersAmountCard } from '@/components/panel/dashboard/month-orders-amount-card'
import { MonthRevenueCard } from '@/components/panel/dashboard/month-revenue-card'
import { RevenueChart } from '@/components/panel/dashboard/revenue-chart'
import { SalesChart } from '@/components/panel/dashboard/sales-chart'
import Header from '@/components/panel/header'

export default function Dashboard() {
  return (
    <Container>
      <Header>Resultados</Header>
      <div className="space-y-4">
        <div className="grid grid-cols-4 gap-4">
          <MonthRevenueCard />
          <MonthOrdersAmountCard />
          <DayOrdersAmountCard />
          <MonthCanceledCard />
        </div>
        <div className="grid grid-cols-4 gap-4">
          <SalesChart />
          <RevenueChart />
        </div>
      </div>
    </Container>
  )
}
