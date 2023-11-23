"use client"

import axios from "axios";
import { LogOut, ShoppingCart, User2 } from "lucide-react";
import { useEffect, useState } from "react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { toast } from "@/components/ui/use-toast";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

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
    const router = useRouter()
    const [currentUser, setCurrentUser] = useState<CurrentUserProps | null>(null)

    const getCurrentUser = async () => {
        try {
            const response = await axios.get('/api/auth/currentuser')
            setCurrentUser(response.data.data)
        } catch (error: any) {
            toast({
                title: 'Erro',
                description: error.response.data.message,
                variant: 'destructive'
            })
        }
    }

    useEffect(() => {
        getCurrentUser()
    }, [])

    console.log(currentUser)

    const onLogout = async () => {

    }

    return (
        <div className="bg-zinc-100 p-3 border-b border-s-zinc-200 w-full z-10 px-8">
            <div className=" flex items-center justify-between">
                <div className="">
                    <h1 className="text-2xl font-bold">
                        Sports Store
                    </h1>
                </div>

                <div className="flex gap-5 items-center">
                    <ShoppingCart 
                        className="cursor-pointer"
                    />

                    <Popover>
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
                                    onClick={(() => router.push("/profile"))}
                                >
                                    <User2 />
                                    Perfil
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
