"use client"

import { Loader } from "@/components/Loader"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { toast } from "@/components/ui/use-toast"
import axios from "axios"
import moment from "moment"
import { useEffect, useState } from "react"

type AddressKeys = 'city' | 'country' | 'line1' | 'line2' | 'postal_code' | 'state'

export default function OrderInfo({ params }: { params: { orderid: string } }) {
    const [order, setOrder] = useState<any>(null)
    const [loading = false, setLoading] = useState<boolean>(false)

    const translationAddressInfo: Record<AddressKeys, string> = {
        city: 'Cidade',
        country: 'País',
        line1: 'Rua',
        line2: 'Bairro',
        postal_code: 'CEP',
        state: 'Estado'
    };

    const getOrder = async () => {
        try {
            setLoading(true)
            const response = await axios.get(`/api/orders/${params.orderid}`)
            setOrder(response.data)
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
        getOrder()
    }, [])

    const getProperty = (key: string, value: any) => {
        return (
            <div className="flex flex-col">
                <span className="text-gray-500 text-sm">{key}</span>
                <span className="text-gray-700">
                    <b>{value}</b>
                </span>
            </div>
        )
    }

    return (
        <div className="p-5">
            {loading && <Loader />}

            {order && (
                <div>
                    <h1 className="text-sm xl:text-2xl font-bold text-gray-700">
                        Ver pedido : #{order._id}
                    </h1>
                    <hr className="border-gray-300 border-solid" />

                    <div className="flex flex-col xl:grid grid-cols-3 gap-5 mt-8 w-full">
                        <h1 className="text-2xl col-span-3 font-semibold">Informações básicas</h1>

                        {getProperty("ID do Pedido", order._id)}
                        {getProperty(
                            "Criado em",
                            moment(order.createdAt).format("DD MMM YYYY HH:mm")
                        )}
                        {getProperty("Total", `R$ ${order.total}`)}
                        {getProperty("Status do pedido", order.orderStatus ? "Pedido realizado" : "Pedido em andamento")}
                        {getProperty("Status do pagamento", order.paymentStatus ? "Pago" : "Esperando pagamento")}
                        {getProperty("ID de transação", order.transactionId)}

                        <hr className="border-gray-300 border-dashed col-span-3" />

                        <h1 className="text-2xl col-span-3 font-semibold">Informações de entrega</h1>

                        {(Object.keys(order.shippingAddress.address) as AddressKeys[]).map((key) => {
                            const translatedAddressKey = translationAddressInfo[key]
                            return getProperty(translatedAddressKey, order.shippingAddress.address[key])
                        })}

                        <hr className="border-gray-300 border-dashed col-span-3" />
                    </div>

                    <h1 className="text-2xl col-span-3 mt-8 font-semibold">Items</h1>

                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Produto</TableHead>
                                <TableHead>Preço</TableHead>
                                <TableHead>Quantidade</TableHead>
                                <TableHead>Total</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {order.items.map((item: any) => (
                                <TableRow key={item._id}>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>R$ {item.price}</TableCell>
                                    <TableCell>{item.quantity}</TableCell>
                                    <TableCell>R$ {order.total}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}
        </div>
    )
}
