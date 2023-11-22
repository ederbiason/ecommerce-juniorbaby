"use client"

import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form, FormField, FormItem, FormControl, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import axios from "axios"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import Link from "next/link"
import { GoogleSignInButton } from "@/components/GoogleSignInButton"
import { Chrome } from "lucide-react"
import { useState } from "react"
import { toast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

const FormSchema = z.object({
    name: z.string().min(1, "O nome é obrigatório!"),
    email: z.string().min(1, "O email é obrigatório!").email("Email inválido."),
    password: z.string().min(1, "A senha é obrigatória!").min(8, "A senha deve ter no minímo 8 caracteres."),
    remember: z.boolean().default(false).optional(),
})

export function SignUpForm() {
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            remember: false
        },
    })

    async function onSubmit(values: z.infer<typeof FormSchema>) {
        try {
            setLoading(true)

            await axios.post('/api/auth/signup', values)
            toast({
                title: 'Sucesso',
                description: 'Cadastro feito com sucesso, porfavor faça login para continuar.',
            })

            router.push("/login")
        } catch (error: any) {
            toast({
                title: 'Error',
                description: "Usuário já existente!",
                variant: "destructive"
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex flex-col items-center justify-center gap-4">
            <h1 className="text-gray-900 font-semibold text-3xl mt-7">
                Crie uma conta
            </h1>

            <p className="text-gray-500">
                Seja bem-vindo! Informe seus dados
            </p>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nome*</FormLabel>
                                <FormControl>
                                    <Input type="text" placeholder="Insira o seu nome" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email*</FormLabel>
                                <FormControl>
                                    <Input type="email" placeholder="Insira o seu email" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Senha*</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="Insira sua senha" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button 
                        className="w-full bg-blue-600 hover:bg-blue-800 font-semibold text-md" 
                        type="submit"
                        disabled={loading}
                    >
                        Cadastrar
                    </Button>
                </form>

                <GoogleSignInButton>
                    <Chrome />
                    Cadastrar com o Google
                </GoogleSignInButton>

                <div className="flex gap-2">
                    <p className="text-gray-500">Já possui uma conta?</p>

                    <Link href="/login" className="text-blue-600 hover:underline">
                        Entrar
                    </Link>
                </div>
            </Form>
        </div>
    )
}
