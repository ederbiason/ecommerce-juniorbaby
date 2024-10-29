"use client"

import { TrendingUp } from "lucide-react"
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
import { useMemo } from "react"

export const description = "A bar chart with a custom label"

const chartConfig = {
  desktop: {
    label: "Orders",
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
  const chartData = useMemo(() => {
    const monthlyOrderCount: Record<string, number> = {}

    orders.forEach((order) => {
      const orderDate = new Date(order.createdAt)
      const monthYear = `${orderDate.getFullYear()}-${orderDate.getMonth()}`

      if (!monthlyOrderCount[monthYear]) {
        monthlyOrderCount[monthYear] = 0
      }
      monthlyOrderCount[monthYear]++
    })

    return Object.entries(monthlyOrderCount).map(([monthYear, count]) => {
      const [year, month] = monthYear.split("-")
      const monthName = new Date(Number(year), Number(month)).toLocaleString("default", { month: "long" })
      return {
        month: `${monthName} ${year}`,
        orders: count,
      }
    })
  }, [orders])

  return (
    <Card className="w-[550px]">
      <CardHeader>
        <CardTitle>Orders Per Month</CardTitle>
        <CardDescription>Data by Month and Year</CardDescription>
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
            barSize={25}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="month"
              type="category"
              tickLine={false}
              tickMargin={10}
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
                dataKey="month"
                position="insideLeft"
                offset={8}
                className="fill-[--color-label]"
                fontSize={12}
              />
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
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total orders by month and year
        </div>
      </CardFooter>
    </Card>
  )
}
