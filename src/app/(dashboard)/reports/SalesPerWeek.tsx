"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts"
import { useMemo } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Orders } from "@/interfaces"

const chartConfig = {
  orders: {
    label: "Pedidos",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

interface SalesPerWeekProps {
  orders: Orders[]
}

export function SalesPerWeek({ orders }: SalesPerWeekProps) {
  const { chartData, mostSalesDay } = useMemo(() => {
    // Função auxiliar para verificar se uma data está dentro da semana atual
    function isCurrentWeek(date: Date): boolean {
      const now = new Date()
      const startOfWeek = new Date(now)
      startOfWeek.setDate(now.getDate() - now.getDay())
      startOfWeek.setHours(0, 0, 0, 0)

      const endOfWeek = new Date(startOfWeek)
      endOfWeek.setDate(startOfWeek.getDate() + 6)
      endOfWeek.setHours(23, 59, 59, 999)

      return date >= startOfWeek && date <= endOfWeek
    }

    const daysOfWeek = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"]
    const weeklyOrderCount = Array(7).fill(0)

    // Filtrar pedidos para a semana atual e agrupar por dia da semana
    orders.forEach((order) => {
      const orderDate = new Date(order.createdAt)
      if (isCurrentWeek(orderDate)) {
        const dayOfWeek = orderDate.getDay()
        weeklyOrderCount[dayOfWeek]++
      }
    })

    const maxOrders = Math.max(...weeklyOrderCount) 
    const mostSalesDayIndex = weeklyOrderCount.indexOf(maxOrders) 
    const mostSalesDay = daysOfWeek[mostSalesDayIndex] 


    return {
      chartData: daysOfWeek.map((day, index) => ({
        day,
        orders: weeklyOrderCount[index],
      })),
      mostSalesDay
    }
  }, [orders])

  return (
    <Card className="w-[550px]">
      <CardHeader>
        <CardTitle>Pedidos por dia</CardTitle>
        <CardDescription>Mostrando vendas de Segunda a Domingo</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="orders" fill="var(--color-desktop)" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          {mostSalesDay !== "" ? `${mostSalesDay} foi o dia da semana que mais houve vendas`: ""}
        </div>
        <div className="leading-none text-muted-foreground">
          Total de pedidos feitos em cada dia da semana atual
        </div>
      </CardFooter>
    </Card>
  )
}
