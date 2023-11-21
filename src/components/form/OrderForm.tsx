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
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DialogClose, DialogFooter } from "@/components/ui/dialog"

const FormSchema = z.object({
    name: z.string(),
    id: z.string(),
    category: z.string({ required_error: "Por favor selecione uma categoria." }),
    price: z.number().positive(),
    quantity: z.number().positive(),
    delivery: z.string(),
    mintreshold: z.number().positive()
})

export function OrderForm() {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        console.log(data)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 flex flex-col">
                {/* upload de imagem */}

                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem className="flex items-center gap-4">
                            <FormLabel>Nome do produto</FormLabel>
                            <FormControl>
                                <Input type="text" placeholder="Insira o nome do produto" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="id"
                    render={({ field }) => (
                        <FormItem className="flex items-center gap-9">
                            <FormLabel>ID do produto</FormLabel>
                            <FormControl>
                                <Input type="text" placeholder="Insira o ID do produto" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                        <FormItem className="flex items-center gap-9">
                            <FormLabel>Categoria</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecione uma categoria" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="suplemento">Suplemento</SelectItem>
                                    <SelectItem value="futebol">Futebol</SelectItem>
                                    <SelectItem value="natacao">Natação</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                        <FormItem className="flex items-center gap-6">
                            <FormLabel>Valor do pedido</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="Insira o valor do pedido" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="quantity"
                    render={({ field }) => (
                        <FormItem className="flex items-center gap-7">
                            <FormLabel>Quantidade</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="Insira a quantidade" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="delivery"
                    render={({ field }) => (
                        <FormItem className="flex items-center gap-8">
                            <FormLabel>Data de entrega</FormLabel>
                            <FormControl>
                                <Input type="text" placeholder="Insira a data de entrega" {...field} />
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
                    >
                        Adicionar
                    </Button>
                </div>
            </form>
        </Form>
    )
}
