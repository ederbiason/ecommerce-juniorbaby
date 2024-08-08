"use client"

import axios from "axios"
import { useEffect, useState } from "react"
import { toast } from "@/components/ui/use-toast"
import { useRouter, useSearchParams } from "next/navigation"

type CategoryProps = {
    _id: string,
    name: string
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
                _id: ""
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

    return (
        <div>
            <div className="flex gap-10 bg-gray-300 py-2 px-5">
                {categories.map((category: CategoryProps) => (
                    <div 
                        key={category._id}
                        onClick={() => onSelectedCategory(category)}
                        className={`cursor-pointer text-gray-500 ${selectedCategory === category._id ? "text-black font-semibold" : ""}`}
                    >
                        <span>
                            {category.name === "" ? "Todos" : category.name}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}
