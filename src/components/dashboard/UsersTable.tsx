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
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Check, Copy, Pencil, Trash2 } from "lucide-react"
import { useEffect, useState } from "react"
import axios from "axios"
import { toast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { Loader } from "../Loader"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface UserProps {
    _id: string
    name: string
    phone: string
    email: string
    isAdmin: boolean
    isActive: boolean
}

export function UsersTable() {
    const router = useRouter()

    const [selectedUser, setSelectedUser] = useState<UserProps>()

    const [copied, setCopied] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false)

    const [users, setUsers] = useState([])

    const [activeUsers, setActiveUsers] = useState<UserProps[]>([])
    const [inactiveUsers, setInactiveUsers] = useState<UserProps[]>([])

    const [loading, setLoading] = useState(false)

    const getUsers = async () => {
        try {
            setLoading(true)
            const response = await axios.get("/api/users")
            const allUsers = response.data

            setActiveUsers(allUsers.filter((user: UserProps) => user.isActive))
            setInactiveUsers(allUsers.filter((user: UserProps) => !user.isActive))

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
            setDeleteLoading(true)

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

            getUsers()
        } catch (error: any) {
            toast({
                title: "Erro",
                description: error.message,
                variant: "destructive"
            })
        } finally {
            setDeleteLoading(false)
        }
    }

    const copyIdToClipboard = (userid: string) => {
        navigator.clipboard.writeText(userid)

        setCopied(true);

        setTimeout(() => {
            setCopied(false)
        }, 1000)
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
                    <Button
                        className="bg-blue-600 hover:bg-blue-800"
                        onClick={() => {
                            router.push(`/users/add_user`)
                        }}
                    >
                        Adicionar usuário
                    </Button>
                </div>
            </div>

            <Tabs defaultValue="activeUsers">
                <TabsList className="w-full flex justify-start gap-5 px-5">
                    <TabsTrigger value="activeUsers">
                        Ativos
                    </TabsTrigger>
                    <TabsTrigger value="inactiveUsers">
                        Inativos
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="activeUsers">
                    <Table className="">
                        <TableCaption>Lista dos usuários</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Nome</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Telefone</TableHead>
                                <TableHead>Admin</TableHead>
                                <TableHead>Ações</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {activeUsers.map((user: UserProps, index) => (

                                <TableRow key={user._id}>
                                    <HoverCard>
                                        <HoverCardTrigger>
                                            <TableCell>
                                                {index + 1}
                                            </TableCell>
                                        </HoverCardTrigger>

                                        <HoverCardContent className="w-fit">
                                            <div className="p-2 border-2 rounded-md w-full">
                                                <div className="flex justify-between items-center gap-2">
                                                    <p className="">
                                                        {user._id}
                                                    </p>
                                                    <div
                                                        className="bg-blue-900 rounded-md p-2"
                                                        onClick={() => copyIdToClipboard(user._id)}
                                                    >
                                                        {copied ? (
                                                            <Check className="text-white animate-ping" size={16} />
                                                        ) : (
                                                            <Copy className="text-white" size={16} />
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </HoverCardContent>
                                    </HoverCard>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.phone}</TableCell>
                                    <TableCell className={`${user.isAdmin ? "text-green-500" : "text-red-500"}`}>
                                        {user.isAdmin ? "Sim" : "Não"}
                                    </TableCell>
                                    <TableCell className="flex items-center gap-2">
                                        <Dialog key={user._id}>
                                            <DialogTrigger asChild>
                                                <Button
                                                    className="bg-transparent hover:bg-red-300 hover:rounded-full p-2"
                                                >
                                                    <Trash2 className="text-red-600" />
                                                </Button>
                                            </DialogTrigger>

                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>Desativar usuário</DialogTitle>
                                                </DialogHeader>

                                                <div className="py-5">
                                                    <p>
                                                        Tem certeza que deseja desativar esse usuário?
                                                    </p>
                                                </div>

                                                <DialogFooter className="sm:justify-between">
                                                    <DialogClose asChild>
                                                        <Button className="bg-red-600 hover:bg-red-300">
                                                            Cancelar
                                                        </Button>
                                                    </DialogClose>

                                                    <Button
                                                        onClick={() => onDeactivateUser(user._id)}
                                                        disabled={deleteLoading && selectedUser?._id === user._id}
                                                    >
                                                        Confirmar
                                                    </Button>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>

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
                </TabsContent>

                <TabsContent value="inactiveUsers">
                    <Table className="">
                        <TableCaption>Lista dos usuários</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Nome</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Telefone</TableHead>
                                <TableHead>Admin</TableHead>
                                <TableHead>Ações</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {inactiveUsers.map((user: UserProps, index) => (

                                <TableRow key={user._id}>
                                    <HoverCard>
                                        <HoverCardTrigger>
                                            <TableCell>
                                                {index + 1}
                                            </TableCell>
                                        </HoverCardTrigger>

                                        <HoverCardContent className="w-fit">
                                            <div className="p-2 border-2 rounded-md w-full">
                                                <div className="flex justify-between items-center gap-2">
                                                    <p className="">
                                                        {user._id}
                                                    </p>
                                                    <div
                                                        className="bg-blue-900 rounded-md p-2"
                                                        onClick={() => copyIdToClipboard(user._id)}
                                                    >
                                                        {copied ? (
                                                            <Check className="text-white animate-ping" size={16} />
                                                        ) : (
                                                            <Copy className="text-white" size={16} />
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </HoverCardContent>
                                    </HoverCard>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.phone}</TableCell>
                                    <TableCell className={`${user.isAdmin ? "text-green-500" : "text-red-500"}`}>
                                        {user.isAdmin ? "Sim" : "Não"}
                                    </TableCell>
                                    <TableCell className="flex items-center gap-2">
                                        <Dialog key={user._id}>
                                            <DialogTrigger asChild>
                                                <Button
                                                    className="bg-transparent hover:bg-red-300 hover:rounded-full p-2"
                                                >
                                                    <Trash2 className="text-red-600" />
                                                </Button>
                                            </DialogTrigger>

                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>Desativar usuário</DialogTitle>
                                                </DialogHeader>

                                                <div className="py-5">
                                                    <p>
                                                        Tem certeza que deseja desativar esse usuário?
                                                    </p>
                                                </div>

                                                <DialogFooter className="sm:justify-between">
                                                    <DialogClose asChild>
                                                        <Button className="bg-red-600 hover:bg-red-300">
                                                            Cancelar
                                                        </Button>
                                                    </DialogClose>

                                                    <Button
                                                        onClick={() => onDeactivateUser(user._id)}
                                                        disabled={deleteLoading && selectedUser?._id === user._id}
                                                    >
                                                        Confirmar
                                                    </Button>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>

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
                </TabsContent>
            </Tabs>
        </div>
    )
}
