"use client"

import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { getAntdFieldRequiredRule } from "@/helpers/validations"
import { SetCurrentUser } from "@/redux/userSlice"
import { Form, Select } from "antd"
import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"

interface UserProps {
    _id: string
    name: string
    email: string
    isAdmin: boolean
    isActive: boolean
}

export default function EditUser({ params }: { params: any }) {
    const [user, setUser] = useState<UserProps>()
    const [loading, setLoading] = useState(false)
    const [form] = Form.useForm()

    const getUser = async () => {
        try {
            setLoading(true)
            const response = await axios.get(`/api/users/${params.userid}`)
            setUser(response.data)
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

    useEffect(() => {
        getUser()
    }, [params.userid])

    useEffect(() => {
        if (user) {
            form.setFieldsValue({
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                isActive: user.isActive,
            })
        }
    }, [user, form])


    const onSave = async (values: any) => {
        try {
            setLoading(true)

            const endPoint = `/api/users/${user?._id}`
            await axios.put(endPoint, values)

            toast({
                title: "Sucesso",
                description: "Perfil atualizado com sucesso!",
            })
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

    return (
        <div className="w-full px-96 py-20">
            <Form
                form={form}
                className="w-full flex flex-col"
                layout="vertical"
                onFinish={onSave}
                initialValues={{
                    name: user?.name,
                    email: user?.email,
                    isAdmin: user?.isAdmin,
                    isActive: user?.isActive
                }}
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
                        className="w-full border border-gray-700 rounded-md h-11" 
                        options={[{ value: true, label: <span>Sim</span> }, { value: false, label: <span>Não</span> }]} 
                    />
                </Form.Item>

                <Form.Item
                    name="isActive"
                    label="Ativo"
                >
                    <Select 
                        className="w-full border border-gray-700 rounded-md h-11" 
                        options={[{ value: true, label: <span>Sim</span> }, { value: false, label: <span>Não</span> }]} 
                    />
                </Form.Item>

                <Button type="submit" disabled={loading}>
                    Salvar
                </Button>
            </Form>
        </div>
    )
} 
