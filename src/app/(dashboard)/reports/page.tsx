"use client"

import * as React from "react"
import axios from "axios"
import { toast } from "@/components/ui/use-toast"
import { SalesByCategory } from "./SalesByCategory"
import { Orders } from "@/interfaces"
import { SalesPerMonth } from "./SalesPerMonth"
import { SalesPerWeek } from "./SalesPerWeek"
import { SalesPerState } from "./SalesPerState"

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
        <div className="w-full p-5 gap-5 flex flex-col h-full items-center mx-20">
            <div className="flex gap-2 w-full justify-between">
                <SalesByCategory orders={orders} />
                <SalesPerWeek orders={orders} />
            </div>
            
            <div className="flex gap-2 w-full justify-between">
                <SalesPerState orders={orders} />
                <SalesPerMonth orders={orders} />
            </div>
        </div>
    )
}
