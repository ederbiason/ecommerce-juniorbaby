"use client"

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ListFilter, Pencil, Trash2 } from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { CategoryForm } from "@/components/form/CategoryForm"
import { useEffect, useState } from "react"
import axios from "axios"
import { toast } from "@/components/ui/use-toast"
import moment from "moment"

export interface CategoryProps {
    _id: string,
    name: string,
    description: string,
    createdBy: string,
    createdAt: string,
    updatedAt: string,
    __v: number
}

export interface CategoryFormProps {
    _id: string
    name: string
    description: string
}

export function CategoriesTable() {
    const [loading, setLoading] = useState(false)
    const [categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState<CategoryFormProps | null>(null)

    const [open, setOpen] = useState(false)

    const getCategories = async () => {
        try {
            setLoading(true)
            const response = await axios.get("/api/categories")
            setCategories(response.data.data)
        } catch (error: any) {
            toast({
                title: 'Erro na criação de categoria',
                description: error.message,
                variant: 'destructive'
            })
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getCategories()
    }, [])

    console.log(categories)
    return (
        <div className="bg-white rounded-md">
            <div className="flex items-center justify-between px-4 pt-5 pb-2">
                <h1 className="text-gray-800 text-xl font-semibold">
                    Categorias
                </h1>

                <div className="flex items-center justify-center gap-4">
                    <Dialog
                        open={open}
                        onOpenChange={(isOpen) => {
                            if (isOpen === true) return
                            setOpen(false)
                        }}
                    >
                        <DialogTrigger asChild>
                            <Button className="bg-blue-600 hover:bg-blue-800" onClick={function(event) { setOpen(true); setSelectedCategory(null);}}>
                                Adicionar categoria
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle className="text-2xl font-semibold">Nova categoria</DialogTitle>
                            </DialogHeader>
                            <div className="grid gap-4">
                                <CategoryForm 
                                    selectedCategory={selectedCategory}
                                    setSelectedCategory={setSelectedCategory}
                                    reloadData={() => getCategories()}
                                    setOpen={setOpen}
                                />
                            </div>
                        </DialogContent>
                    </Dialog>

                    <Button className="border border-zinc-400 bg-white hover:bg-zinc-200 text-gray-600">
                        <ListFilter />
                        Filtros
                    </Button>

                    <Button className="border border-zinc-400 bg-white hover:bg-zinc-200 text-gray-600">
                        Baixar tudo
                    </Button>
                </div>
            </div>

            <Table className="">
                <TableCaption>Lista das categorias</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Categoria</TableHead>
                        <TableHead>Descrição</TableHead>
                        <TableHead>Criado em</TableHead>
                        <TableHead>Ações</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        categories.map((category: CategoryProps) => (
                            <TableRow key={category._id}>
                                <TableCell>{category.name}</TableCell>
                                <TableCell>{category.description}</TableCell>
                                <TableCell>{moment(category.createdAt).format("DD MMM YYYY")}</TableCell>
                                <TableCell className="flex items-center gap-2">
                                    <Button 
                                        className="bg-transparent hover:bg-red-300 hover:rounded-full p-2"

                                    >
                                        <Trash2 className="text-red-600" />
                                    </Button>
                                    <Button 
                                        className="bg-transparent hover:bg-blue-300 hover:rounded-full p-2"
                                        onClick={() => {
                                            setSelectedCategory(category)
                                            setOpen(true)
                                        }}
                                    >
                                        <Pencil className="text-blue-600" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}
