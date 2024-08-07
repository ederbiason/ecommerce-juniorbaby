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
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Dispatch, SetStateAction, useState } from "react"
import { toast } from "@/components/ui/use-toast"
import axios from "axios"
import { CategoryFormProps } from "../dashboard/CategoriesTable"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const FormSchema = z.object({
    name: z.string(),
    description: z.string(),
    isActive: z.boolean()
})

interface CategoryProps {
    selectedCategory: CategoryFormProps | null
    setOpen: Dispatch<SetStateAction<boolean>>
    setSelectedCategory: Dispatch<SetStateAction<CategoryFormProps | null>>
    reloadData: () => void
}

export function CategoryForm({ selectedCategory, setOpen, setSelectedCategory, reloadData }: CategoryProps) {
    const [loading, setLoading] = useState(false)

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        try {
            setLoading(true)
            if (selectedCategory) {
                await axios.put(`/api/categories/${selectedCategory._id}`, data)
                toast({
                    title: 'Sucesso',
                    description: "Categoria atualizada com sucesso!",
                })
            } else {
                await axios.post("/api/categories", data)
                toast({
                    title: 'Sucesso',
                    description: "Categoria criada com sucesso!",
                })
            }
            setSelectedCategory(null)
            reloadData()
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

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
                <FormField
                    control={form.control}
                    defaultValue={selectedCategory?.name}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nome</FormLabel>
                            <FormControl>
                                <Input type="text" placeholder="Insira o nome da categoria" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    defaultValue={selectedCategory?.description}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Descrição</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Insira a descrição da categoria"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {
                    selectedCategory && (
                        <FormField
                            control={form.control}
                            defaultValue={selectedCategory?.isActive}
                            name="isActive"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Status</FormLabel>
                                    <Select onValueChange={(value) => field.onChange(value === 'active')} defaultValue={field.value ? 'active' : 'inactive'} >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecione o status da categoria" />
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

                <div className="flex items-center justify-end gap-3">
                    <Button onClick={() => setOpen(false)} type="reset" className="border border-zinc-400 bg-white hover:bg-zinc-200 text-gray-400">
                        Cancelar
                    </Button>

                    <Button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-800"
                        disabled={loading}
                        onClick={() => setOpen(false)}
                    >
                        {selectedCategory ? "Editar" : "Adicionar"}
                    </Button>
                </div>
            </form>
        </Form>
    )
}
