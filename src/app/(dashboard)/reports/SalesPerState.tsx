"use client"

import * as React from "react"
import { Label, Pie, PieChart } from "recharts"
import { toast } from "@/components/ui/use-toast"
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
import { Square } from "lucide-react"

interface SalesByCategoryProps {
    orders: Orders[]
}

export function SalesPerState({ orders }: SalesByCategoryProps) {
    const [chartData, setChartData] = React.useState<any[]>([])
    const [chartConfig, setChartConfig] = React.useState<ChartConfig>({})

    function generateHSLColor(index: number): string {
        const hue = (index * 137.508) % 360
        return `hsl(${hue}, 70%, 50%)`
    }

    function fetchStateInfo() {
        try {
            // Processa os estados dos endereços de entrega em cada pedido
            const stateCounts: { [key: string]: number } = {}

            orders.forEach((order: any) => {
                const state = order.shippingAddress.address.state
                if (state) {
                    stateCounts[state] = (stateCounts[state] || 0) + 1
                }
            })

            // Converte para o formato de dados do Recharts
            const formattedData = Object.keys(stateCounts).map((state, index) => {
                return {
                    name: state,
                    value: stateCounts[state],
                    fill: generateHSLColor(index)
                }
            })

            setChartData(formattedData)

            const generatedConfig: ChartConfig = Object.keys(stateCounts).reduce((acc, state, index) => {
                acc[state] = {
                    label: state,
                    color: generateHSLColor(index),
                }
                return acc
            }, {} as ChartConfig)

            setChartConfig(generatedConfig)
        } catch (error: any) {
            toast({
                title: "Erro",
                description: error.message,
                variant: "destructive"
            })
        }
    }

    React.useEffect(() => {
        fetchStateInfo()
    }, [orders])

    // Calcula o total de vendas por estado para exibir no centro do gráfico
    const totalSales = React.useMemo(() => {
        if (chartData.length === 0) return { total: 0, topState: null }

        let total = 0
        let topState = chartData[0].name
        let maxSales = chartData[0].value

        chartData.forEach((item) => {
            total += item.value
            if (item.value > maxSales) {
                maxSales = item.value
                topState = item.name
            }
        })

        return { total, topState }
    }, [chartData])

    return (
        <Card className="flex flex-col w-[350px]">
            <CardHeader className="items-center pb-0 gap-3">
                <CardTitle>Top Estados</CardTitle>
                <CardDescription>Vendas por Estado</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    className="mx-auto aspect-square max-h-[250px]"
                    config={chartConfig}
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={chartData}
                            dataKey="value"
                            nameKey="name"
                            innerRadius={60}
                            strokeWidth={5}
                        >
                            <Label
                                content={({ viewBox }) => {
                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) - 10}
                                                    className="fill-muted-foreground"
                                                >
                                                    Total de pedidos
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 18}
                                                    className="fill-foreground text-3xl font-bold"
                                                >
                                                    {totalSales.total}
                                                </tspan>
                                            </text>
                                        )
                                    }
                                }}
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
                <div className="grid grid-cols-2 items-center justify-center w-full text-sm mb-5 pl-14">
                    {chartData.map((state) => (
                        <div className="flex items-center gap-2 ">
                            <Square size={14} fill={state.fill} />
                            {state.name} - {state.value}
                        </div>
                    ))}
                </div>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                <div className="leading-none text-center">
                    O estado com maior número de vendas é o: <span className="font-bold">{totalSales.topState}</span>
                </div>
                <div className="leading-none text-muted-foreground">
                    Vendas distribuidas por estados
                </div>
            </CardFooter>
        </Card>
    )
}