"use client"

import * as React from "react"
import axios from "axios"
import { toast } from "@/components/ui/use-toast"
import { SalesByCategory } from "./SalesByCategory"
import { Orders } from "@/interfaces"
import { SalesPerMonth } from "./SalesPerMonth"
import { SalesPerWeek } from "./SalesPerWeek"

export default function SalesByCategoryChart() {
    const [loading, setLoading] = React.useState(false)
    const [orders, setOrders] = React.useState<Orders[]>([])

    const getOrders = async () => {
        try {
            setLoading(true)
            const response = await axios.get(`/api/orders`)

            setOrders(response.data)                       
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

    return (
        <div className="w-full p-5 gap-5 grid grid-cols-2 h-full items-center ">
            <SalesPerMonth orders={orders} />
            <SalesPerWeek orders={orders} />
            <SalesByCategory orders={orders} />
        </div>
    )
}
