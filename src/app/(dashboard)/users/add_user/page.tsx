"use client"

import { Button } from "@/components/ui/button"
import { Form, Select } from "antd"
import { useState } from "react"
import axios from "axios"
import { toast } from "@/components/ui/use-toast"
import { Loader } from "@/components/Loader"
import { useRouter } from "next/navigation"

interface UserProps {
    name: string
    email: string
    password: string
    isAdmin: boolean
}

export default function CreateUserForm() {
    const [loading, setLoading] = useState(false)

    const router = useRouter()

    const [form] = Form.useForm()

    async function onSubmit(values: UserProps) {
        console.log(values)

        try {
            setLoading(true)
            await axios.post("/api/auth/signup", values)
            toast({
                title: "Sucesso",
                description: "Usuário criado com sucesso!",
                variant: "default"
            })
        } catch (error: any) {
            toast({
                title: "Erro",
                description: error.message,
                variant: "destructive"
            })
        } finally {
            setLoading(false)
            router.back()
        }
    }

    return (
        <div className="w-full px-96 py-20">
            {loading && <Loader />}

            <Form
                form={form}
                className="w-full flex flex-col"
                layout="vertical"
                onFinish={onSubmit}
            >
                <Form.Item
                    name="name"
                    label="Nome"
                >
                    <input className="w-full border border-gray-700 p-2 text-lg rounded-md" type="text" placeholder="Insira o nome do cliente" />
                </Form.Item>
                <Form.Item
                    name="email"
                    label="Email"
                >
                    <input className="w-full border border-gray-700 p-2 text-lg rounded-md" type="email" placeholder="Insira o email do cliente" />
                </Form.Item>
                <Form.Item
                    name="phone"
                    label="Telefone"
                >
                    <input className="w-full border border-gray-700 p-2 text-lg rounded-md" type="text" placeholder="Insira o telefone do cliente" />
                </Form.Item>
                <Form.Item
                    name="isAdmin"
                    label="Administrador"
                >
                    <Select
                        defaultValue={false}
                        className="w-full border border-gray-700 rounded-md h-11"
                        options={[{ value: true, label: 'Sim' }, { value: false, label: 'Não' }]}
                    />
                </Form.Item>
                <Form.Item
                    name="password"
                    label="Senha"
                >
                    <input className="w-full border border-gray-700 p-2 text-lg rounded-md" type="password" placeholder="Insira a senha do cliente" />
                </Form.Item>
                <div className="w-full flex justify-between items-center">
                    <Button 
                        type="button"
                        className="border border-zinc-400 bg-red-500 hover:bg-red-400 text-gray-100"
                        onClick={() => router.back()}
                    >
                        Cancelar
                    </Button>
                    <Button type="submit" disabled={loading} className="w-24">
                        Criar
                    </Button>
                </div>
            </Form>
        </div>
    )
}
