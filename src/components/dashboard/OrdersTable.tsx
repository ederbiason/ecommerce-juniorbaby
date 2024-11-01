"use client"

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import moment from "moment"
import Link from "next/link"
import { useEffect, useState } from "react"
import axios from "axios"
import { toast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader } from "../Loader"

export function OrdersTable() {
    const [orders, setOrders] = useState<any>([])
    const [loading, setLoading] = useState(false)
    const [statusUpdateLoading, setStatusUpdateLoading] = useState<boolean>(false)

    const onStatusUpdate = async (orderId: string, status: string) => {
        try {
            setStatusUpdateLoading(true);
            const endPoint = `/api/orders/${orderId}`
            await axios.put(endPoint, { orderStatus: status })

            toast({
                title: "Sucesso!",
                description: "Pedido atualizado com sucesso!",
                variant: "destructive"
            })

            getOrders()
        } catch (error: any) {
            toast({
                title: "Erro",
                description: error.message,
                variant: "destructive"
            })
        } finally {
            setStatusUpdateLoading(false);
        }
    }

    const getOrders = async () => {
        try {
            setLoading(true)

            const endPoint = `/api/orders`;
            const response = await axios.get(endPoint);

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

    useEffect(() => {
        getOrders()
    }, [])

    return (
        <div className="bg-white">
            {loading && <Loader />}

            <div className="flex items-center justify-between px-4 pt-5 pb-2">
                <h1 className="text-gray-800 text-xl font-semibold">
                    Pedidos
                </h1>
            </div>

            <Table>
                <TableCaption>Lista de pedidos</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID do Pedido</TableHead>
                        <TableHead>Realizado em</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Ações</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {orders.map((order: any) => (
                        <TableRow key={order._id}>
                            <TableCell>{order._id}</TableCell>
                            <TableCell>{moment(order.createdAt).format("DD MMM YYYY HH:mm")}</TableCell>
                            <TableCell>{(order.total).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</TableCell>
                            <TableCell>
                                {/* <Select
                                    onValueChange={(value) => {
                                        onStatusUpdate(orders._id, value);
                                    }}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecione um status" />
                                    </SelectTrigger>

                                    <SelectContent>
                                        <SelectItem
                                            value="order placed"
                                        >
                                            Pedido realizado
                                        </SelectItem>
                                        <SelectItem
                                            value="enviado"
                                        >
                                            Enviado
                                        </SelectItem>
                                        <SelectItem
                                            value="saiu para entrega"
                                        >
                                            Saiu para entrega
                                        </SelectItem>
                                        <SelectItem
                                            value="entregue"
                                        >
                                            Entregue
                                        </SelectItem>
                                        <SelectItem
                                            value="cancelado"
                                        >
                                            Cancelado
                                        </SelectItem>
                                    </SelectContent>
                                </Select> */}
                                {order.orderStatus ? "Pedido concluído" : "Pedido em andamento"}
                            </TableCell>
                            <TableCell>
                                <Link
                                    href={`/profile/orders/${order._id}`}
                                    className="underline text-blue-600 underline-offset-2"
                                >
                                    Ver detalhes
                                </Link>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
