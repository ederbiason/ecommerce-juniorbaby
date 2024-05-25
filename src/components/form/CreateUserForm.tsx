"use client"

import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, Select } from "antd"
import { Dispatch, SetStateAction, useState } from "react"
import axios from "axios"
import { toast } from "@/components/ui/use-toast"

interface UserProps {
    name: string
    email: string
    password: string
    isAdmin: boolean
}

interface CreateUserFormProps {
    handleDialog: Dispatch<SetStateAction<boolean>>
}

export function CreateUserForm({ handleDialog }: CreateUserFormProps) {
    const [loading, setLoading] = useState(false)
    const [isAdmin, setIsAdmin] = useState<boolean>()

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
            handleDialog(false)
        } catch (error: any) {
            toast({
                title: "Erro",
                description: error.message,
                variant: "destructive"
            })
        } finally {
            setLoading(false)
        }
    }

    const handleColorChanged = (value: boolean) => {
        setIsAdmin(value)
        form.setFieldsValue({ isAdmin: value });
    }

    return (
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
                <input className="w-full border border-gray-700 p-2 text-lg rounded-md" type="text" />
            </Form.Item>

            <Form.Item
                name="email"
                label="Email"
            >
                <input className="w-full border border-gray-700 p-2 text-lg rounded-md" type="email" />
            </Form.Item>

            <Form.Item
                name="isAdmin"
                label="Administrador"
            >
                <Select
                    // onChange={(value) => handleColorChanged(value)}
                    // value={isAdmin}
                    className="w-full border border-gray-700 rounded-md h-11"
                    options={[{ value: true, label: 'Sim' }, { value: false, label: 'Não' }]}
                />
            </Form.Item>

            <Form.Item
                name="password"
                label="Senha"
            >
                <input className="w-full border border-gray-700 p-2 text-lg rounded-md" type="password" />
            </Form.Item>

            <div className="w-full flex justify-between items-center">
                <Button type="button" className="border border-zinc-400 bg-red-500 hover:bg-red-400 text-gray-100" onClick={() => handleDialog(false)}>
                    Cancelar
                </Button>
                <Button type="submit" disabled={loading}>
                    Criar
                </Button>
            </div>
        </Form>
    )
}
