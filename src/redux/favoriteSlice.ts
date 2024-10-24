import { ProductInterface } from "@/interfaces"
import { createSlice } from "@reduxjs/toolkit"

export interface FavoriteState {
    favoriteItems: ProductInterface[]
}

export const favoriteSlice = createSlice({
    name: "favorite",
    initialState: {
        favoriteItems: [],
    } as FavoriteState,
    reducers: {
        AddProductToFavorite: (
            state,
            action: {
                type: string
                payload: ProductInterface
            }
        ) => {
            state.favoriteItems.push(action.payload)
        },

        RemoveProductFromFavorite: (
            state,
            action: {
                type: string
                payload: ProductInterface
            }
        ) => {
            state.favoriteItems = state.favoriteItems.filter(
                (item) => item._id !== action.payload._id
            )
        },
        ClearFavorite: (state) => {
            state.favoriteItems = []
        },
    },
})

export const { AddProductToFavorite, RemoveProductFromFavorite, ClearFavorite } = favoriteSlice.actions
