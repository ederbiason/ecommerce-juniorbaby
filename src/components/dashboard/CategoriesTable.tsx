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
import { Pencil, Trash2 } from "lucide-react"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { CategoryForm } from "@/components/form/CategoryForm"
import { useEffect, useState } from "react"
import axios from "axios"
import { toast } from "@/components/ui/use-toast"
import moment from "moment"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export interface CategoryProps {
    _id: string,
    name: string,
    description: string,
    createdBy: string,
    createdAt: string,
    updatedAt: string,
    __v: number,
    isActive: boolean
}

export interface CategoryFormProps {
    _id: string
    name: string
    description: string
    isActive: boolean
}

export function CategoriesTable() {
    const [loading, setLoading] = useState(false)
    const [loadingForDeactivate, setLoadingForDeactivate] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState<CategoryFormProps | null>(null)

    const [activeCategories, setActiveCategories] = useState<CategoryProps[]>([])
    const [inactiveCategories, setInactiveCategories] = useState<CategoryProps[]>([])

    const [open, setOpen] = useState(false)

    const getCategories = async () => {
        try {
            setLoading(true)
            const response = await axios.get("/api/categories")

            const categories = response.data.data

            setActiveCategories(categories.filter((category: CategoryProps) => category.isActive))
            setInactiveCategories(categories.filter((category: CategoryProps) => !category.isActive))
        } catch (error: any) {
            toast({
                title: 'Erro na busca de categorias',
                description: error.message,
                variant: 'destructive'
            })
        } finally {
            setLoading(false)
        }
    }

    const onDeactivate = async (id: string) => {
        try {
            setLoadingForDeactivate(true)
            await axios.patch(`/api/categories/${id}`)
            toast({
                title: 'Sucesso',
                description: "Categoria desativada com sucesso!",
            })
            setSelectedCategory(null)
            getCategories()
        } catch (error: any) {
            toast({
                title: 'Erro ao desativar categoria',
                description: error.response.data.messaage || error.message,
                variant: 'destructive'
            })
        } finally {
            setLoadingForDeactivate(false)
        }
    }

    useEffect(() => {
        getCategories()
    }, [])

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
                            <Button className="bg-blue-600 hover:bg-blue-800" onClick={function (event) { setOpen(true); setSelectedCategory(null); }}>
                                Adicionar categoria
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle className="text-2xl font-semibold">{selectedCategory ? "Editar categoria" : "Nova categoria"}</DialogTitle>
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
                </div>
            </div>

            <Tabs defaultValue="activeCategories">
                <TabsList className="w-full flex justify-start gap-5 px-5">
                    <TabsTrigger value="activeCategories">
                        Ativos
                    </TabsTrigger>
                    <TabsTrigger value="inactiveCategories">
                        Inativos
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="activeCategories">
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
                                activeCategories.map((category: CategoryProps) => (
                                    <TableRow key={category._id}>
                                        <TableCell>{category.name}</TableCell>
                                        <TableCell>{category.description}</TableCell>
                                        <TableCell>{moment(category.createdAt).format("DD MMM YYYY HH:mm")}</TableCell>
                                        <TableCell className="flex items-center gap-2">
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button
                                                        className="bg-transparent hover:bg-red-300 hover:rounded-full p-2"
                                                    >
                                                        <Trash2 className="text-red-600" />
                                                    </Button>
                                                </DialogTrigger>

                                                <DialogContent>
                                                    <DialogHeader>
                                                        <DialogTitle>Desativar categoria</DialogTitle>
                                                    </DialogHeader>

                                                    <div className="py-5">
                                                        <p>
                                                            Tem certeza que deseja desativar essa categoria?
                                                        </p>
                                                    </div>

                                                    <DialogFooter className="sm:justify-between">
                                                        <DialogClose asChild>
                                                            <Button className="bg-red-600 hover:bg-red-300">
                                                                Cancelar
                                                            </Button>
                                                        </DialogClose>

                                                        <Button
                                                            onClick={() => onDeactivate(category._id)}
                                                            disabled={loadingForDeactivate && selectedCategory?._id === category._id}
                                                        >
                                                            Confirmar
                                                        </Button>
                                                    </DialogFooter>
                                                </DialogContent>
                                            </Dialog>

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
                                )
                                )
                            }
                        </TableBody>
                    </Table>
                </TabsContent>

                <TabsContent value="inactiveCategories">
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
                                inactiveCategories.map((category: CategoryProps) => (
                                    <TableRow key={category._id}>
                                        <TableCell>{category.name}</TableCell>
                                        <TableCell>{category.description}</TableCell>
                                        <TableCell>{moment(category.createdAt).format("DD MMM YYYY HH:mm")}</TableCell>
                                        <TableCell className="flex items-center gap-2">
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button
                                                        className="bg-transparent hover:bg-red-300 hover:rounded-full p-2"
                                                    >
                                                        <Trash2 className="text-red-600" />
                                                    </Button>
                                                </DialogTrigger>

                                                <DialogContent>
                                                    <DialogHeader>
                                                        <DialogTitle>Desativar categoria</DialogTitle>
                                                    </DialogHeader>

                                                    <div className="py-5">
                                                        <p>
                                                            Tem certeza que deseja desativar essa categoria?
                                                        </p>
                                                    </div>

                                                    <DialogFooter className="sm:justify-between">
                                                        <DialogClose asChild>
                                                            <Button className="bg-red-600 hover:bg-red-300">
                                                                Cancelar
                                                            </Button>
                                                        </DialogClose>

                                                        <Button
                                                            onClick={() => onDeactivate(category._id)}
                                                            disabled={loadingForDeactivate && selectedCategory?._id === category._id}
                                                        >
                                                            Confirmar
                                                        </Button>
                                                    </DialogFooter>
                                                </DialogContent>
                                            </Dialog>

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
                                )
                                )
                            }
                        </TableBody>
                    </Table>
                </TabsContent>
            </Tabs>
        </div>
    )
}
