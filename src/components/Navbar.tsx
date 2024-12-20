"use client"

import axios from "axios";
import { Heart, LogOut, ShoppingCart, User2, UserCog2 } from "lucide-react";
import { useEffect, useState } from "react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { toast } from "@/components/ui/use-toast";
import { Button } from "./ui/button";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { SetCurrentUser } from "@/redux/userSlice";
import Link from "next/link";
import { CartState } from "@/redux/cartSlice";
import { Badge } from "antd";
import { FavoriteState } from "@/redux/favoriteSlice";

export interface CurrentUserProps {
    _id: Id
    name: string
    email: string
    password: string
    deliveryAddresses: any[]
    isActive: boolean
    isAdmin: boolean
    createdAt: CreatedAt
    updatedAt: UpdatedAt
    __v: number
}

export interface Id {
    $oid: string
}

export interface CreatedAt {
    $date: string
}

export interface UpdatedAt {
    $date: string
}

export function Navbar() {
    const [open, setOpen] = useState<boolean>(false)

    const router = useRouter()
    const pathname = usePathname()
    const isPrivatePage = pathname !== '/login' && pathname !== '/sign-up'
    const dispatch = useDispatch()
    const { currentUser } = useSelector((state: any) => state.user)
    const { cartItems }: CartState = useSelector((state: any) => state.cart)
    const { favoriteItems }: FavoriteState = useSelector((state: any) => state.favorite)

    const getCurrentUser = async () => {
        try {
            const response = await axios.get('/api/auth/currentuser')
            dispatch(SetCurrentUser(response.data.data))
        } catch (error: any) {
            toast({
                title: 'Erro',
                description: error.response.data.message,
                variant: 'destructive'
            })
        }
    }

    useEffect(() => {
        if (isPrivatePage) {
            getCurrentUser()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname, isPrivatePage])

    useEffect(() => {
        // persistir dados no carrinho
        localStorage.setItem("cartItems", JSON.stringify(cartItems))
        localStorage.setItem("favoriteItems", JSON.stringify(favoriteItems))
    }, [cartItems, favoriteItems])

    const onLogout = async () => {
        try {
            await axios.get("/api/auth/logout")

            dispatch(SetCurrentUser(null))
            toast({
                title: 'Logout',
                description: "Deslogado com sucesso.",
            })

            router.push("/login")
        } catch (error: any) {
            toast({
                title: 'Erro',
                description: error.response.data.message,
                variant: 'destructive'
            })
        }
    }

    return (
        <div className="bg-zinc-100 p-3 border-b border-s-zinc-200 w-full z-10 px-8">
            <div className=" flex items-center justify-between">
                <div className="">
                    <Link href="/">
                        <h1 className="text-2xl font-bold uppercase">
                            <span className="text-blue-900">Junior</span>
                            {" "}
                            <span className="text-red-800">Baby</span>
                        </h1>
                    </Link>
                </div>

                <div className="flex gap-5 items-center">
                    <Badge
                        count={favoriteItems.length}
                        className="cursor-pointer"
                    >
                        <Heart
                            className="cursor-pointer"
                            onClick={() => router.push("/favoriteProducts")}
                        />
                    </Badge>

                    <Badge
                        count={cartItems.length}
                        className="cursor-pointer"
                    >
                        <ShoppingCart
                            className="cursor-pointer"
                            onClick={() => router.push("/cart")}
                        />
                    </Badge>

                    <Popover
                        open={open}
                        onOpenChange={setOpen}
                    >
                        <PopoverTrigger>
                            <div className="flex h-10 w-10 bg-white rounded-full p-2 items-center justify-center">
                                <span className="font-bold">
                                    {currentUser?.name[0]}
                                </span>
                            </div>
                        </PopoverTrigger>
                        <PopoverContent className="w-fit font-bold">
                            <div className="flex flex-col gap-3">
                                <Button
                                    className="flex gap-3 bg-blue-500 hover:bg-blue-400"
                                    onClick={(() => {
                                        router.push("/profile")
                                        setOpen(false)
                                    })}
                                >
                                    {currentUser?.isAdmin ? <UserCog2 /> : <User2 />}

                                    {currentUser?.isAdmin ? "Dashboard" : "Perfil"}
                                </Button>

                                <Button
                                    className="flex gap-3 bg-red-500 hover:bg-red-400"
                                    onClick={(() => onLogout())}
                                >
                                    <LogOut />
                                    Sair
                                </Button>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
        </div>
    )
}
