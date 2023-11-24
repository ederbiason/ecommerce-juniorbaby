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
import { DialogClose } from "@/components/ui/dialog"
import { useState } from "react"
import { toast } from "@/components/ui/use-toast"
import axios from "axios"

const FormSchema = z.object({
    name: z.string(),
    description: z.string(),
})

export function CategoryForm() {
    const [loading, setLoading] = useState(false)

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        try {
            setLoading(true)
            await axios.post("/api/categories", data)
            toast({
                title: 'Sucesso',
                description: "Categoria criada com sucesso!",
            })
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

                <div className="flex items-center justify-end gap-3">
                    <DialogClose>
                        <Button className="border border-zinc-400 bg-white hover:bg-zinc-200 text-gray-400">
                            Cancelar
                        </Button>
                    </DialogClose>

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
