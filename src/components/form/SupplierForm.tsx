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
import { DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const FormSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    salary: z.number(),
    job: z.string()
})

export function SupplierForm() {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        console.log(data)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 flex flex-col">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem className="flex items-center gap-16">
                            <FormLabel>Nome</FormLabel>
                            <FormControl>
                                <Input type="text" placeholder="Insira o nome do fornecedor" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem className="flex items-center gap-[68px]">
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input type="email" placeholder="Insira o email do fornecedor" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="job"
                    render={({ field }) => (
                        <FormItem className="flex items-center gap-16">
                            <FormLabel>Cargo</FormLabel>
                            <FormControl>
                                <Input type="text" placeholder="Insira o cargo do funcionário" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="salary"
                    render={({ field }) => (
                        <FormItem className="flex items-center gap-14">
                            <FormLabel>Salário</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="Insira o salário do funcionário" {...field} />
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
