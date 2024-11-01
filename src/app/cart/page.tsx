"use client"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { CartState, EditProductInCart, RemoveProductFromCart } from "@/redux/cartSlice"
import { Frown, Minus, Plus, ShoppingCart } from "lucide-react"
import Image from "next/image"
import { ChangeEvent, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { CheckoutModal } from "./CheckoutModal"
import axios from "axios"
import { ShippingInterface } from "@/interfaces"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import InputMask from "react-input-mask"

export default function Cart() {
    const [showCheckoutModal, setShowCheckoutModal] = useState(false)
    const [clientPostalCode, setClientPostalCode] = useState("")
    const [availableShippingOptions, setAvailableShippingOptions] = useState([])
    const [selectedShipping, setSelectedShipping] = useState<ShippingInterface | null>(null)

    const { cartItems }: CartState = useSelector((state: any) => state.cart)
    const dispatch = useDispatch()

    const subTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
    const total = subTotal + (selectedShipping ? Number(selectedShipping.price) : 0)

    const handleShippingValueChange = (value: string) => {
        const selectedOption = availableShippingOptions.find((option: ShippingInterface) => option.name === value)
        if (selectedOption) {
            setSelectedShipping(selectedOption)
        }
    }

    const handlePostalCodeInput = (e: ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value.replace(/-/, '')
        setClientPostalCode(rawValue)
    }

    const getShippingOptions = async (customerPostalCode: string) => {
        try {
            setAvailableShippingOptions([])

            const response = await axios.post('/api/shipment', { customerPostalCode })

            const shippingOptions = response.data.shippingOptions.filter((option: any) => option.price)

            setAvailableShippingOptions(shippingOptions)

            setClientPostalCode("")
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
                                        {(item.price).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}
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
                                        {(item.price * item.quantity).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}
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
                                    {(subTotal).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <span>
                                    Taxa de entrega
                                </span>

                                <span>
                                    {(selectedShipping ? selectedShipping.price : 0).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}
                                </span>
                            </div>

                            <Separator />

                            <div className="flex justify-between font-semibold text-xl">
                                <span>
                                    Total
                                </span>

                                <span>
                                    {(total).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}
                                </span>
                            </div>

                            <Button 
                                className="my-2 mt-5" 
                                onClick={() => setShowCheckoutModal(true)}
                                disabled={selectedShipping ? false : true}
                            >
                                Ir para o pagamento
                            </Button>


                            <div className="flex items-center justify-left gap-3 mt-5">
                                <InputMask
                                    mask="99999-999"
                                    onChange={handlePostalCodeInput}
                                    value={clientPostalCode}
                                    placeholder="Digite seu CEP aqui"
                                    className="border border-zinc-400 p-1.5 rounded-lg w-fit"
                                />

                                <Button
                                    onClick={() => getShippingOptions(clientPostalCode)}
                                >
                                    Calcular
                                </Button>
                            </div>

                            <RadioGroup className="mt-3" onValueChange={handleShippingValueChange}>
                                {availableShippingOptions.map((shippingOption: ShippingInterface) => (
                                        <div 
                                            key={shippingOption.id}
                                            className="flex items-center space-x-2"
                                        >
                                            <Image
                                                alt="Logo de sistemas de envio e entrega no Braisl"
                                                src={shippingOption.company.picture}
                                                width={50}
                                                height={50}
                                            />
                                            <RadioGroupItem  
                                                value={shippingOption.name} 
                                                id={shippingOption.id.toString()} 
                                                onChange={() => setSelectedShipping(shippingOption)}
                                            />
                                            <Label htmlFor={shippingOption.id.toString()}>{shippingOption.company.name}</Label>
                                            <span>R$ {shippingOption.price}</span>
                                        </div>
                                ))}
                            </RadioGroup>
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
