"use client"

import { Button } from "@/components/ui/button";
import { ProductInterface } from "@/interfaces";
import { AddProductToCart, CartState } from "@/redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "@/components/ui/use-toast";

interface AddToCartBtnProps {
    product: ProductInterface
}

export function AddToCartBtn({ product }: AddToCartBtnProps) {
    const dispatch = useDispatch()
    const { cartItems }: CartState = useSelector((state: any) => state.cart)

    return (
        <Button
            onClick={() => {
                dispatch(AddProductToCart({
                    ...product,
                    quantity: 1
                }))

                toast({
                    title: 'Sucesso',
                    description: "Adicionado ao carrinho.",
                })
            }}
            disabled={cartItems.some((item: ProductInterface) => item._id === product._id)}
        >
            Adicionar no carrinho
        </Button>
    )
}
