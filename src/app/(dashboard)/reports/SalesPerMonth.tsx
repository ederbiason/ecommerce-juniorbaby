"use client"

import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts"
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
import { useMemo, useState } from "react"

const chartConfig = {
  desktop: {
    label: "Pedidos",
    color: "hsl(var(--chart-1))",
  },
  label: {
    color: "hsl(var(--background))",
  },
} satisfies ChartConfig

interface SalesByCategoryProps {
  orders: Orders[]
}

export function SalesPerMonth({ orders }: SalesByCategoryProps) {
  const [topMonth, setTopMonth] = useState<string | null>(null)

  const chartData = useMemo(() => {
    const monthlyOrderCount: Record<string, number> = {}
    let maxOrders = 0
    let maxMonth = ""

    orders.forEach((order) => {
      const orderDate = new Date(order.createdAt)
      const monthYear = `${orderDate.getFullYear()}-${orderDate.getMonth()}`

      if (!monthlyOrderCount[monthYear]) {
        monthlyOrderCount[monthYear] = 0
      }
      monthlyOrderCount[monthYear]++

      if (monthlyOrderCount[monthYear] > maxOrders) {
        maxOrders = monthlyOrderCount[monthYear]
        maxMonth = monthYear
      }
    })

    setTopMonth(
      `${new Date(Number(maxMonth.split("-")[0]), Number(maxMonth.split("-")[1])).toLocaleString(
        "default",
        { month: "long", year: "numeric" }
      )}`
    )

    return Object.entries(monthlyOrderCount).map(([monthYear, count]) => {
      const [year, month] = monthYear.split("-")
      const monthName = new Date(Number(year), Number(month)).toLocaleString("default", { month: "long" }).toLocaleUpperCase()
      return {
        month: `${monthName} ${year}`,
        orders: count,
      }
    })
  }, [orders])

  return (
    <Card className="w-[550px]">
      <CardHeader>
        <CardTitle>Pedidos por mês</CardTitle>
        <CardDescription>Dados de mês e vendas</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              right: 16,
            }}
            barSize={30}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="month"
              type="category"
              tickLine={false}
              tickMargin={10}
              width={90}
              axisLine={false}
            />
            <XAxis dataKey="orders" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar
              dataKey="orders"
              layout="vertical"
              fill="var(--color-desktop)"
              radius={4}
            >
              <LabelList
                dataKey="orders"
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none">
          O mês de <span className="font-bold">{topMonth}</span> possui o maior número de vendas.
        </div>
        <div className="leading-none text-muted-foreground">
          Mostrando a quantidade de pedidos por mês
        </div>
      </CardFooter>
    </Card>
  )
}
