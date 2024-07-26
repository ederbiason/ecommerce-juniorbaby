/* eslint-disable @next/next/no-img-element */
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
import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { toast } from "@/components/ui/use-toast"

export interface ProductProps {
    _id: string
    name: string
    description?: string
    category: string
    price: number
    countInStock: number
    minThreshold: number
    images: any
}

export function ProductsTable() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState<ProductProps[]>([])
    const [deleteLoading, setDeleteLoading] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState<any>(null)

    const getProducts = async () => {
        try {
            setLoading(true)
            const response = await axios.get("/api/products")
            setProducts(response.data.data)
        } catch (error: any) {
            toast({
                title: 'Erro na busca de produtos',
                description: error.message,
                variant: 'destructive'
            })
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getProducts()
    }, [])

    const deleteProduct = async (productId: string) => {
        try {
            setDeleteLoading(true)

            await axios.delete(`/api/products/${productId}`)
            toast({
                title: 'Sucesso',
                description: "Produto deletado com sucesso!"
            })

            getProducts()
        } catch (error: any) {
            toast({
                title: 'Erro ao deletar produto',
                description: error.message,
                variant: 'destructive'
            })
        } finally {
            setDeleteLoading(false)
        }
    }

    return (
        <div className="bg-white">
            <div className="flex items-center justify-between px-4 pt-5 pb-2">
                <h1 className="text-gray-800 text-xl font-semibold">
                    Produtos
                </h1>

                <div className="flex items-center justify-center gap-4">
                    <Link
                        href="/products/add_product"
                    >
                        <Button className="bg-blue-600 hover:bg-blue-800">
                            Adicionar produto
                        </Button>
                    </Link>
                </div>
            </div>

            <Table className="">
                <TableCaption>Lista dos produtos</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Produto</TableHead>
                        <TableHead>Nome</TableHead>
                        <TableHead>Categoria</TableHead>
                        <TableHead>Preço</TableHead>
                        <TableHead className="">Quantidade</TableHead>
                        <TableHead>Qtd. mínima</TableHead>
                        <TableHead>Disponibilidade</TableHead>
                        <TableHead>Ações</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {products.map((product: ProductProps) => (
                        <TableRow key={product._id}>
                            <TableCell className="w-10 h-10">
                                <img
                                    src={product.images[0]}
                                    alt={product.name}
                                />
                            </TableCell>
                            <TableCell>{product.name}</TableCell>
                            <TableCell>{product.category}</TableCell>
                            <TableCell>R$ {product.price}</TableCell>
                            <TableCell>{product.countInStock}</TableCell>
                            <TableCell>{product.minThreshold}</TableCell>
                            <TableCell className="text-green-500">{product.minThreshold < product.countInStock ? "Disponível" : "Indisponível"}</TableCell>
                            <TableCell className="flex items-center gap-2">
                                <Button 
                                    className="bg-transparent hover:bg-red-300 hover:rounded-full p-2"
                                    onClick={() => {
                                        setSelectedProduct(product)
                                        deleteProduct(product._id)
                                    }}
                                    disabled={deleteLoading && selectedProduct?._id === product._id}
                                >
                                    <Trash2 className="text-red-600" />
                                </Button>
                                <Button 
                                    className="bg-transparent hover:bg-blue-300 hover:rounded-full p-2"
                                    onClick={() => {
                                        router.push(`/products/edit_product/${product._id}`)
                                    }}
                                >
                                    <Pencil className="text-blue-600" />
                                </Button>
                            </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
            </Table>

        </div>
    )
}
