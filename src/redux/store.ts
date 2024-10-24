import { configureStore } from "@reduxjs/toolkit"
import { userSlice} from './userSlice'
import { cartSlice } from "./cartSlice"
import { favoriteSlice } from "./favoriteSlice"

let initialCartItems = [] 
let initialFavoriteItems = []
if(typeof window !== "undefined") {
    initialCartItems = JSON.parse(localStorage.getItem('cartItems') || '[]')
    initialFavoriteItems = JSON.parse(localStorage.getItem('favoriteItems') || '[]')
}

const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        cart: cartSlice.reducer,
        favorite: favoriteSlice.reducer
    },
    preloadedState: {
        cart: {
            cartItems: initialCartItems,
            cartTotal: 0
        },
        favorite: {
            favoriteItems: initialFavoriteItems
        }
    }
})

export default store
