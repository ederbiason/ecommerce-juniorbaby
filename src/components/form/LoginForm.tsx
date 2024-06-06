"use client"

import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form, FormField, FormItem, FormControl, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import Link from "next/link"
import { GoogleSignInButton } from "@/components/GoogleSignInButton"
import { Chrome } from "lucide-react"
import { useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"

const FormSchema = z.object({
  email: z.string().min(1, "O email é obrigatório!").email("Email inválido."),
  password: z.string().min(1, "A senha é obrigatória!").min(8, "A senha deve ter no minímo 8 caracteres."),
  remember: z.boolean().default(false).optional(),
})

export function LoginForm() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false
    },
  })

  async function onSubmit(values: z.infer<typeof FormSchema>) {
    try {
      setLoading(true)

      await axios.post("/api/auth/login", values)

      toast({
        title: 'Sucesso',
        description: 'Login realizado com sucesso!',
      })
      router.push("/")
    } catch (error: any) {
      toast({
        title: 'Erro',
        description: "Os dados inseridos estão inválidos.",
        variant: 'destructive'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4 xl:py-20">
      <h1 className="text-gray-900 font-semibold text-3xl">
        Faça login na sua conta
      </h1>

      <p className="text-gray-500">
        Seja bem-vindo! Informe seus dados
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
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
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Insira sua senha" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="remember"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="w-full flex justify-between leading-none">
                  <FormLabel>
                    Lembre-se de mim.
                  </FormLabel>

                  <FormLabel>
                    <Link
                      href="/"
                      className="text-blue-600 hover:underline"
                    >
                      Esqueceu sua senha?
                    </Link>
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />

          <Button
            className="w-full bg-blue-600 hover:bg-blue-800 font-semibold text-md"
            type="submit"
            disabled={loading}
          >
            Entrar
          </Button>
        </form>

        <GoogleSignInButton

        >
          <Chrome />
          Logar com o Google
        </GoogleSignInButton>

        <div className="flex gap-2">
          <p className="text-gray-500">Não tem uma conta?</p>

          <Link href="/sign-up" className="text-blue-600 hover:underline">
            Cadastre-se
          </Link>
        </div>
      </Form>
    </div>
  )
}
