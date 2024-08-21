"use client"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { CartState, EditProductInCart, RemoveProductFromCart } from "@/redux/cartSlice"
import { Frown, Minus, Plus, ShoppingCart } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { CheckoutModal } from "./CheckoutModal"
import axios from "axios"

export default function Cart() {
    const [showCheckoutModal, setShowCheckoutModal] = useState(false)
    const [shippingOptions, setShippingOptions] = useState([])

    const { cartItems }: CartState = useSelector((state: any) => state.cart)
    const dispatch = useDispatch()

    const subTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
    const total = subTotal + 25

    const getShippingOptions = async (customerPostalpCode: string) => {
        const payload = {
            from: { postal_code: '86700090' }, // CEP da Loja Junior Baby
            to: { postal_code: customerPostalpCode }, // CEP de destino
            products: [
                {
                    id: '123',
                    width: 11,
                    height: 17,
                    length: 25,
                    weight: 0.5,
                    insurance_value: 100,
                    quantity: 1
                }
            ],
            services: '1,2', // IDs dos serviços de frete desejados
            options: {
                receipt: false,
                own_hand: false,
                collect: false,
                reverse: false,
                non_commercial: false
            },
            agency: null,
            order: null
        }

        const options = {
            method: 'POST',
            url: 'https://www.melhorenvio.com.br/api/v2/me/shipment/calculate',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${process.env.shipping_token}`,
                'User-Agent': 'Aplicação ederbiason.eh@edu.unifil.br'
            },
            data: {}
        }

        try {
            const response = await axios.request(options)
            setShippingOptions(response.data)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="p-5 pt-10">
            {cartItems.length > 0 ? (
                <div className="grid grid-cols-3 text-gray-700 gap-10">
                    <div className="col-span-2 flex flex-col gap-5">
                        <h1 className="text-2xl font-semibold">
                            Meu carrinho
                        </h1>

                        <div className="grid grid-cols-7 gap-10">
                            <h1 className="col-span-4">
                                Produto
                            </h1>
                            <h1 className="col-span-1">
                                Preço
                            </h1>
                            <h1 className="col-span-1">
                                Quantidade
                            </h1>
                            <h1 className="col-span-1">
                                Total
                            </h1>
                        </div>

                        <div className="col-span-7">
                            <Separator className="bg-gray-500" />
                        </div>

                        {
                            cartItems.map((item) => (
                                <div className="grid grid-cols-7 items-center gap-10" key={item._id}>
                                    <div className="col-span-4 flex gap-2 items-center">
                                        <Image
                                            src={item.images[0]}
                                            alt=""
                                            height={80}
                                            width={80}
                                            className="border p-2 border-gray-300 border-solid rounded-md"
                                        />

                                        <div className="flex flex-col gap-2">
                                            <span>
                                                {item.name}
                                            </span>

                                            <span className="cursor-pointer underline text-red-500"
                                                onClick={() => {
                                                    dispatch(RemoveProductFromCart(item))
                                                }}
                                            >
                                                Remover
                                            </span>
                                        </div>
                                    </div>

                                    <span className="col-span-1">
                                        R$ {item.price}
                                    </span>

                                    <div className="col-span-1 border border-solid p-2 border-gray-400 flex gap-2 justify-between">
                                        <Minus
                                            onClick={() => {
                                                if (item.quantity !== 1) {
                                                    dispatch(EditProductInCart({
                                                        ...item,
                                                        quantity: item.quantity - 1
                                                    }))
                                                } else {
                                                    dispatch(RemoveProductFromCart(item))
                                                }
                                            }}
                                        />

                                        {item.quantity}

                                        <Plus
                                            onClick={() => {
                                                dispatch(EditProductInCart({
                                                    ...item,
                                                    quantity: item.quantity + 1
                                                }))
                                            }}
                                        />
                                    </div>

                                    <span className="col-span-1">
                                        R$ {item.price * item.quantity}
                                    </span>
                                </div>
                            ))
                        }

                        <Separator className="bg-gray-500" />
                    </div>

                    <div className="col-span-1 border border-solid border-gray-400 p-5 rounded-md">
                        <h1 className="text-3xl font-semibold text-gray-700">Resumo</h1>

                        <Separator
                            className="border border-dashed border-gray-400"
                        />

                        <div className="flex flex-col gap-2 mt-5">
                            <div className="flex justify-between">
                                <span>
                                    Subtotal
                                </span>

                                <span>
                                    R$ {subTotal}
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <span>
                                    Taxa de entrega
                                </span>

                                <span>
                                    R$ 25
                                </span>
                            </div>

                            <Separator />

                            <div className="flex justify-between font-semibold text-xl">
                                <span>
                                    Total
                                </span>

                                <span>
                                    R$ {total}
                                </span>
                            </div>

                            <Button className="my-2 mt-5" onClick={() => setShowCheckoutModal(true)}>
                                Ir para o pagamento
                            </Button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center gap-5 text-gray-700 justify-center">
                    <ShoppingCart className="w-20 h-20" />
                    <div className="flex items-center justify-center gap-3">
                        <h1 className="text-3xl font-semibold">Seu carrinho está vazio.</h1>
                        <Frown />
                    </div>
                </div>
            )
            }

            {showCheckoutModal && <CheckoutModal setShowCheckoutModal={setShowCheckoutModal} showCheckoutModal={showCheckoutModal} total={total} />}
        </div>
    )
}
