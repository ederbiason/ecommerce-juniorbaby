"use client"

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Pencil, Trash2 } from "lucide-react"
import { CreateUserForm } from "@/components/form/CreateUserForm"
import { useEffect, useState } from "react"
import axios from "axios"
import { toast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { Loader } from "../Loader"

interface UserProps {
    _id: string
    name: string
    email: string
    isAdmin: boolean
    isActive: boolean
}

export function UsersTable() {
    const router = useRouter()

    const [selectedUser, setSelectedUser] = useState<UserProps>()

    const [openDialog, setOpenDialog] = useState(false)

    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)

    const getUsers = async () => {
        try {
            setLoading(true)
            const response = await axios.get("/api/users")
            setUsers(response.data)
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

    const onDeactivateUser = async (userid: string) => {
        try {
            const response = await axios.get(`/api/users/${userid}`)
            setSelectedUser(response.data)

            if (response.data.isActive === true) {
                await axios.patch(`/api/users/${userid}`, { isActive: false })

                toast({
                    title: "Sucesso",
                    description: "Usuário desativado com sucesso!",
                    variant: "default"
                })
            } else if (response.data.isActive === false) {
                toast({
                    title: "Erro",
                    description: "Usuário já está desativado!",
                    variant: "destructive"
                })
            }
        } catch (error: any) {
            toast({
                title: "Erro",
                description: error.message,
                variant: "destructive"
            })
        } 
    }

    useEffect(() => {
        getUsers()
    }, [])

    return (
        <div className="bg-white">
            {loading && <Loader />}

            <div className="flex items-center justify-between px-4 pt-5 pb-2">
                <h1 className="text-gray-800 text-xl font-semibold">
                    Usuários
                </h1>

                <div className="flex items-center justify-center gap-4">
                    <Dialog 
                        open={openDialog}
                        onOpenChange={(isOpen) => {
                            if (isOpen === false) return
                            setOpenDialog(true)
                        }}
                    >
                        <DialogTrigger asChild>
                            <Button className="bg-blue-600 hover:bg-blue-800">
                                Adicionar usuário
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Novo usuário</DialogTitle>
                            </DialogHeader>
                            <div className="grid gap-4 pt-4">
                                <CreateUserForm handleDialog={setOpenDialog} />
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            <Table className="">
                <TableCaption>Lista dos usuários</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Nome</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Admin</TableHead>
                        <TableHead>Ativo</TableHead>
                        <TableHead>Ações</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.map((user: any) => (
                        <TableRow key={user._id}>
                            <TableCell>{user._id}</TableCell>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell className={`${user.isAdmin ? "text-green-500" : "text-red-500"}`}>
                                {user.isAdmin ? "Sim" : "Não"}
                            </TableCell>
                            <TableCell className={`${user.isActive ? "text-green-500" : "text-red-500"}`}>
                                {user.isActive ? "Sim" : "Não"}
                            </TableCell>
                            <TableCell className="flex items-center gap-2">
                                <Button 
                                    className="bg-transparent hover:bg-red-300 hover:rounded-full p-2"
                                    onClick={() => onDeactivateUser(user._id)}
                                >
                                    <Trash2 className="text-red-600" />
                                </Button>
                                <Button 
                                    className="bg-transparent hover:bg-blue-300 hover:rounded-full p-2"
                                    onClick={() => {
                                        router.push(`/users/edit_user/${user._id}`)
                                    }}
                                >
                                    <Pencil className="text-blue-600" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

        </div>
    )
}
