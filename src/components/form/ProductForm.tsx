"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Upload } from "antd"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import axios from "axios"
import { toast } from "@/components/ui/use-toast"

interface ProductFormProps {
    setSelectedFiles: any
}

const FormSchema = z.object({
    name: z.string(),
    description: z.string(),
    category: z.string({ required_error: "Por favor selecione uma categoria." }),
    price: z.coerce.number(),
    countInStock: z.coerce.number(),
    minThreshold: z.coerce.number(),
    images: z.any(),
})

export function ProductForm({ setSelectedFiles }: ProductFormProps) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [categories, setCategories] = useState([])

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    const getCategories = async() => {
        try {
            const response = await axios.get("/api/categories")
            setCategories(response.data.data)
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
    

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        data.images = []
        console.log(data)
        try {
            setLoading(true)
            await axios.post("/api/products", data)
            toast({
                title: 'Sucesso',
                description: "Produto criado com sucesso!",
            })
            router.push("/products")
        } catch (error: any) {
            toast({
                title: 'Error',
                description: error.response.data.message || error.message,
                variant: 'destructive'
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-4 justify-center items-center gap-5 mt-3">
                <div className="col-span-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nome</FormLabel>
                                <FormControl>
                                    <Input type="text" placeholder="Insira o nome do produto" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="col-span-4">
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Descrição</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Insira a descrição do produto"
                                        className="resize-none"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Preço</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="Insira o preço do produto" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Categoria</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecione uma categoria" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {
                                        categories.map((category: any) => (
                                            <SelectItem
                                                key={category._id}
                                                value={category._id}
                                            >
                                                {category.name}
                                            </SelectItem>
                                        ))
                                    }
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="countInStock"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Quantidade</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="Insira a quantidade de estoque" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="minThreshold"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Qtd. mínima</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="Insira a qtd. mínima de estoque" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="col-span-4">
                    <FormField
                        control={form.control}
                        name="images"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Imagem</FormLabel>
                                <FormControl>
                                    <Upload
                                        listType="picture-card"
                                        multiple
                                        beforeUpload={(file) => {
                                            setSelectedFiles((prev: any) => [...prev, file])
                                            return false
                                        }}
                                        {...field}
                                    >
                                        + Upload
                                    </Upload>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="flex items-center justify-end gap-3 col-span-4">
                    <Button className="border border-zinc-400 bg-white hover:bg-zinc-200 text-gray-400" onClick={() => router.back()}>
                        Cancelar
                    </Button>

                    <Button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-800"
                        disabled={loading}
                    >
                        Adicionar
                    </Button>
                </div>
            </form>
        </Form>
    )
}
