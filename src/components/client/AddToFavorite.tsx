"use client"

import { ProductInterface } from "@/interfaces"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "@/components/ui/use-toast"
import { AddProductToFavorite, FavoriteState, RemoveProductFromFavorite } from "@/redux/favoriteSlice"
import { Heart } from "lucide-react"

interface AddToFavoriteBtnProps {
    product: ProductInterface
}

export function AddToFavorite({ product }: AddToFavoriteBtnProps) {
    const dispatch = useDispatch()
    const { favoriteItems }: FavoriteState = useSelector((state: any) => state.favorite)
    const isItemAlreadyInFavorite = favoriteItems.some((item: ProductInterface) => item._id === product._id)

    const handleFavoriteButton = () => {
        if (isItemAlreadyInFavorite) {
            console.log("ja to la")
            dispatch(RemoveProductFromFavorite(product))

            toast({
                title: 'Sucesso',
                description: "Produto removido dos favoritos.",
            })
        } else {
            dispatch(AddProductToFavorite({
                ...product,
                quantity: 1
            }))

            toast({
                title: 'Sucesso',
                description: "Adicionado aos favoritos.",
            })
        }
    }

    return (
        <Heart
            onClick={handleFavoriteButton}
            className={`${isItemAlreadyInFavorite ? "text-red-500 fill-red-500" : ""}`}
        />
    )
}
