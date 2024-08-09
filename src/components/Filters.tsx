"use client"

import axios from "axios"
import { useEffect, useState } from "react"
import { toast } from "@/components/ui/use-toast"
import { useRouter, useSearchParams } from "next/navigation"
import { Search } from "@/components/ui/search"
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarTrigger,
} from "@/components/ui/menubar"
import { Menu } from "lucide-react"


type CategoryProps = {
    _id: string,
    name: string
    isActive: boolean
}

export function Filters() {
    const router = useRouter()
    const searchParams = useSearchParams()

    const [search, setSearch] = useState<string>("")
    const [categories, setCategories] = useState<CategoryProps[]>([])
    const [selectedCategory, setSelectedCategory] = useState("")

    const getCategories = async () => {
        try {
            const response = await axios.get("/api/categories")

            const tempCategories: any = [{
                name: "",
                _id: "",
                isActive: true
            }]

            tempCategories.push(...response.data.data)

            setCategories(tempCategories)
        } catch (error: any) {
            toast({
                title: 'Erro na busca de categorias',
                description: error.message,
                variant: 'destructive'
            })
        }
    }

    useEffect(() => {
        getCategories()
    }, [])

    function onSelectedCategory(category: CategoryProps) {
        setSelectedCategory(category._id)

        const newSearchParams = new URLSearchParams(searchParams.toString())
        newSearchParams.set("category", category.name)

        router.push(`/?${newSearchParams.toString()}`)
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            const newSearchParams = new URLSearchParams(searchParams.toString())
            newSearchParams.set("search", search)

            router.push(`/?${newSearchParams.toString()}`)
        }, 500)
    }, [search])

    return (
        <div className="flex gap-5 w-full justify-between px-8 bg-gray-300 items-center">
            <div className="flex gap-10 py-3">
                <Menubar>
                    <MenubarMenu>
                        <MenubarTrigger className="flex gap-3">
                            <Menu />
                            CATEGORIAS
                        </MenubarTrigger>

                        <MenubarContent>
                            {categories.map((category: CategoryProps) => (
                                category.isActive && (

                                    <MenubarItem
                                        key={category._id}
                                        onClick={() => onSelectedCategory(category)}
                                        className={`p-3 cursor-pointer text-gray-500 ${selectedCategory === category._id ? "text-black font-semibold" : ""}`}
                                    >
                                        <span>
                                            {category.name === "" ? "Todos" : category.name}
                                        </span>
                                    </MenubarItem>
                                )
                            ))}
                        </MenubarContent>
                    </MenubarMenu>
                </Menubar>
            </div>

            <Search
                type="text"
                placeholder="Pesquise o seu produto"
                className="w-96"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
        </div>
    )
}
