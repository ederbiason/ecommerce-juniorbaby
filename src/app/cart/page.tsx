"use client"

import { Separator } from "@/components/ui/separator"
import { CartState, EditProductInCart, RemoveProductFromCart } from "@/redux/cartSlice"
import { Minus, Plus } from "lucide-react"
import Image from "next/image"
import { useDispatch, useSelector } from "react-redux"

export default function Cart() {
    const { cartItems }: CartState = useSelector((state: any) => state.cart)
    const dispatch = useDispatch()

    return (
    <div className="p-5">
        <h1 className="text-2xl font-semibold">
            Meu carrinho
        </h1>

        <div className="grid grid-cols-3 mt-5 text-gray-700">
            <div className="col-span-2 flex flex-col gap-5">
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
                                        if(item.quantity !== 1) {
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
            </div>
        </div>
    </div>
  )
}
