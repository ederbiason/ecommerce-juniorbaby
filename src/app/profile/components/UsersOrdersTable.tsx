import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { toast } from "@/components/ui/use-toast"
import axios from "axios"
import moment from "moment"
import Link from "next/link"
import { useEffect, useState } from "react"

export function UsersOrdersTable() {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(false)
    console.log(orders)

    const getOrders = async () => {
        try {
            setLoading(true)

            const response = await axios.get("/api/orders")

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
        <div>
            <Table>
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
                            <TableCell>{moment(order.createdAt).format("DD MMM YYYY")}</TableCell>
                            <TableCell>R$ {order.total}</TableCell>
                            <TableCell>{order.orderStatus ? "Pedido concluído" : "Pedido em andamento"}</TableCell>
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
