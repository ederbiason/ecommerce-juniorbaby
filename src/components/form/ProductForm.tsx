/* eslint-disable @next/next/no-img-element */
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
import { uploadImageAndReturnUrls } from "@/helpers/imageHandling"

interface ProductFormProps {
    initialValues?: any
    existingImages?: any
    setExistingImages?: any
    productEditId?: any
}

export const FormSchema = z.object({
    name: z.string(),
    description: z.string(),
    category: z.string({ required_error: "Por favor selecione uma categoria." }),
    price: z.coerce.number(),
    countInStock: z.coerce.number(),
    minThreshold: z.coerce.number(),
    images: z.any(),
    isActive: z.boolean().default(true)
})

export function ProductForm({ initialValues, existingImages, setExistingImages, productEditId }: ProductFormProps) {
    const router = useRouter()

    const [loading, setLoading] = useState(false)
    const [categories, setCategories] = useState([])
    const [isActive, setIsActive] = useState(initialValues?.isActive ?? false)
    const [selectedFiles = [], setSelectedFiles] = useState<any>([])

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        values: initialValues,
    })

    const getCategories = async () => {
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
        try {
            setLoading(true);
            const imagesUrls = await uploadImageAndReturnUrls(selectedFiles);
            data.images = imagesUrls;

            if (initialValues && initialValues !== undefined) {
                // Editar produto existente
                const newImages = await uploadImageAndReturnUrls(selectedFiles);
                data.images = [...existingImages, ...newImages];
                await axios.put(`/api/products/${productEditId}`, data);
                toast({
                    title: 'Sucesso',
                    description: "Produto atualizado com sucesso!",
                });
                router.refresh();
                router.back();
            } else {
                // Criar novo produto
                await axios.post("/api/products", data);
                toast({
                    title: 'Sucesso',
                    description: "Produto criado com sucesso!",
                });
                router.push("/products");
            }
        } catch (error: any) {
            toast({
                title: 'Erro',
                description: error.message || error.response.data.message,
                variant: 'destructive'
            });
        } finally {
            setLoading(false);
        }
    }

    const textButton = initialValues ? "Editar" : "Adicionar"

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
                                    <Input defaultValue={initialValues?.name} type="text" placeholder="Insira o nome do produto" {...field} />
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
                                        defaultValue={initialValues?.description}
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
                                <Input type="number" defaultValue={initialValues?.price} placeholder="Insira o preço do produto" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {/* descobrir como colocar um valor como default */}
                <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Categoria</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={initialValues?.category} value={form.watch('category')}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecione uma categoria" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {
                                        categories.map((category: any) => (
                                            category.isActive && (
                                                <SelectItem
                                                    key={category._id}
                                                    value={category.name}
                                                    defaultChecked={category.name}
                                                >
                                                    {category.name}
                                                </SelectItem>
                                            )
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
                                <Input defaultValue={initialValues?.countInStock} type="number" placeholder="Insira a quantidade de estoque" {...field} />
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
                                <Input defaultValue={initialValues?.minThreshold} type="number" placeholder="Insira a qtd. mínima de estoque" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {
                    initialValues && (
                        <FormField
                            control={form.control}
                            defaultValue={initialValues.isActive}
                            name="isActive"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Status</FormLabel>
                                    <Select onValueChange={(value) => field.onChange(value === 'active')} defaultValue={isActive ? 'active' : 'inactive'} value={form.watch('isActive') ? 'active' : 'inactive'}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecione o status do produto" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="active">Ativo</SelectItem>
                                            <SelectItem value="inactive">Inativo</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    )
                }

                <div className="col-span-4 flex gap-5">
                    {initialValues?.images && existingImages.map((image: any) => (
                        <div
                            key={image}
                            className="border border-gray-600 rounded-md p-3 border-solid flex flex-col items-center gap-2"
                        >
                            <img src={image} alt="product" className="w-24 h-24 rounded-md" />
                            <h1
                                className="cursor-pointer underline text-red-500"
                                onClick={() => {
                                    setExistingImages((prev: any) =>
                                        prev.filter((i: any) => i !== image)
                                    )
                                }}
                            >
                                Remover
                            </h1>
                        </div>
                    ))}
                </div>

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
                    <Button type="button" className="border border-zinc-400 bg-white hover:bg-zinc-200 text-gray-400" onClick={() => router.back()}>
                        Cancelar
                    </Button>

                    <Button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-800"
                        disabled={loading}
                    >
                        {textButton}
                    </Button>
                </div>
            </form>
        </Form>
    )
}
