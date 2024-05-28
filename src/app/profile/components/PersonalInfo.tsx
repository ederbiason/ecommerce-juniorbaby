import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { getAntdFieldRequiredRule } from "@/helpers/validations"
import { SetCurrentUser } from "@/redux/userSlice"
import { Form } from "antd"
import axios from "axios"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"

export default function PersonalInfo() {
    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch()

    const { currentUser } = useSelector((state: any) => state.user)

    const onSave = async (values: any) => {
        try {
            setLoading(true)

            const endPoint = `/api/users/${currentUser._id}`
            const response = await axios.put(endPoint, values)
            dispatch(SetCurrentUser(response.data))

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
        <div className="w-1/4">
            <Form
                className="w-full flex flex-col"
                layout="vertical"
                onFinish={onSave}
                initialValues={{
                    name: currentUser?.name,
                    email: currentUser?.email,
                }}
            >
                <Form.Item
                    name="name"
                    label="Nome"
                    rules={getAntdFieldRequiredRule("Por favor insira seu nome!")}
                >
                    <input className="w-full border border-gray-700 p-2 text-lg rounded-md" type="text" />
                </Form.Item>

                <Form.Item
                    name="email"
                    label="Email"
                    rules={getAntdFieldRequiredRule("Por favor insira seu email!")}
                >
                    <input className="w-full border border-gray-700 p-2 text-lg rounded-md" type="email" />
                </Form.Item>

                <Form.Item
                    name="password"
                    label="Senha atual"
                    rules={[
                        { required: false },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password')) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Por favor insira sua senha atual!'));
                            },
                        }),
                    ]}
                >
                    <input className="w-full border border-gray-700 p-2 text-lg rounded-md" type="password" placeholder="Insira sua senha atual" />
                </Form.Item>

                <Form.Item
                    name="newPassword"
                    label="Nova senha"
                    rules={[
                        { required: false },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password')) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Por favor insira sua nova senha!'));
                            },
                        }),
                    ]}
                >
                    <input className="w-full border border-gray-700 p-2 text-lg rounded-md" type="password" placeholder="Insira sua nova senha" />
                </Form.Item>

                <Button type="submit" disabled={loading}>
                    Salvar
                </Button>
            </Form>
        </div>
    )
}
