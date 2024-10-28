"use client"

import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"
import axios from "axios"
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

export default function SalesByCategoryChart() {
    const [loading, setLoading] = React.useState(false)
    const [chartData, setChartData] = React.useState<any[]>([])
    const [chartConfig, setChartConfig] = React.useState<ChartConfig>({})

    function generateHSLColor(index: number): string {
        const hue = (index * 137.508) % 360 
        return `hsl(${hue}, 70%, 50%)`
    }

    const getOrders = async () => {
        try {
            setLoading(true)
            const response = await axios.get(`/api/orders`)
            const orders = response.data

            // Processa as categorias dos itens em cada pedido
            const categoryCounts: { [key: string]: number } = {}

            orders.forEach((order: any) => {
                order.items.forEach((item: any) => {
                    const category = item.category
                    if (category) {
                        categoryCounts[category] = (categoryCounts[category] || 0) + 1
                    }
                })
            })

            // Converte para o formato de dados do Recharts
            const formattedData = Object.keys(categoryCounts).map((category, index) => {
                return {
                    name: category,
                    value: categoryCounts[category],
                    fill: generateHSLColor(index)
                }
            })

            setChartData(formattedData)

            const generatedConfig: ChartConfig = Object.keys(categoryCounts).reduce((acc, category, index) => {
                acc[category] = {
                    label: category,
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
        } finally {
            setLoading(false)
        }
    }

    React.useEffect(() => {
        getOrders()
    }, [])

    // Calcula o total de vendas por categoria para exibir no centro do gráfico
    const totalSales = React.useMemo(() => {
        return chartData.reduce((acc, curr) => acc + curr.value, 0)
    }, [chartData])

    return (
        <div className="w-full p-5">
            <Card className="flex flex-col w-[350px]">
                <CardHeader className="items-center pb-0 gap-3">
                    <CardTitle>Top Categorias</CardTitle>
                    <CardDescription>Vendas por Categoria</CardDescription>
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
                                                        y={viewBox.cy}
                                                        className="fill-foreground text-3xl font-bold"
                                                    >
                                                        {totalSales}
                                                    </tspan>
                                                    <tspan
                                                        x={viewBox.cx}
                                                        y={(viewBox.cy || 0) + 24}
                                                        className="fill-muted-foreground"
                                                    >
                                                        Items
                                                    </tspan>
                                                </text>
                                            )
                                        }
                                    }}
                                />
                            </Pie>
                        </PieChart>
                    </ChartContainer>
                </CardContent>
                <CardFooter className="flex-col gap-2 text-sm">
                    <div className="flex items-center gap-2 font-medium leading-none">
                        aqui daria para colocar o nome da categoria que mais esta sendo vendida
                        <TrendingUp className="h-4 w-4" />
                    </div>
                    <div className="leading-none text-muted-foreground">
                        Vendas distribuidas por categorias
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}
