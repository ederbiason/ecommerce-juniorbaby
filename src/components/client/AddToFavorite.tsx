"use client"

import { ProductInterface } from "@/interfaces"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "@/components/ui/use-toast"
import { AddProductToFavorite, FavoriteState } from "@/redux/favoriteSlice"
import { Heart } from "lucide-react"

interface AddToFavoriteBtnProps {
    product: ProductInterface
}

export function AddToFavorite({ product }: AddToFavoriteBtnProps) {
    const dispatch = useDispatch()
    const { favoriteItems }: FavoriteState = useSelector((state: any) => state.favorite)

    return (
        <Heart
            onClick={() => {
                dispatch(AddProductToFavorite({
                    ...product,
                    quantity: 1
                }))

                toast({
                    title: 'Sucesso',
                    description: "Adicionado aos favoritos.",
                })
                
                // disabled={cartItems.some((item: ProductInterface) => item._id === product._id)}
            }}
        />
    )
}
