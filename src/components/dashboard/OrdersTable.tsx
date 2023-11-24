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
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { ListFilter, Pencil, Trash2 } from "lucide-react"
import { OrderForm } from "@/components/form/OrderForm"

export function OrdersTable() {
    return (
        <div className="bg-white">
            <div className="flex items-center justify-between px-4 pt-5 pb-2">
                <h1 className="text-gray-800 text-xl font-semibold">
                    Pedidos
                </h1>

                <div className="flex items-center justify-center gap-4">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="bg-blue-600 hover:bg-blue-800">
                                Adicionar pedido
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Novo pedido</DialogTitle>
                            </DialogHeader>
                            <div className="grid gap-4 pt-4 ">
                                <OrderForm />

                                {/* <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="name" className="text-right">
                                        Nome do produto
                                    </Label>
                                    <Input
                                        id="name"
                                        className="col-span-3"
                                        placeholder="Insira o nome do produto"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="id" className="text-right">
                                        ID do produto
                                    </Label>
                                    <Input
                                        id="id"
                                        className="col-span-3"
                                        placeholder="Insira o ID do produto"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="category" className="text-right">
                                        Categoria
                                    </Label>
                                    <Input
                                        id="category"
                                        className="col-span-3"
                                        placeholder="Selecione a categoria"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="price" className="text-right">
                                        Preço de compra
                                    </Label>
                                    <Input
                                        id="price"
                                        className="col-span-3"
                                        placeholder="Insira o preço de compra"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="quantity" className="text-right">
                                        Quantidade
                                    </Label>
                                    <Input
                                        id="quantity"
                                        className="col-span-3"
                                        placeholder="Insira a quantidade"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="validity" className="text-right">
                                        Validade
                                    </Label>
                                    <Input
                                        id="validity"
                                        className="col-span-3"
                                        placeholder="Insira a validade"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="minthreshold" className="text-right">
                                        Qtd. mínima
                                    </Label>
                                    <Input
                                        id="minthreshold"
                                        className="col-span-3"
                                        placeholder="Insira a qtd. mínima"
                                    />
                                </div> */}
                            </div>
                        </DialogContent>
                    </Dialog>

                    <Button className="border border-zinc-400 bg-white hover:bg-zinc-200 text-gray-600">
                        <ListFilter />
                        Filtros
                    </Button>

                    <Button className="border border-zinc-400 bg-white hover:bg-zinc-200 text-gray-600">
                        Baixar tudo
                    </Button>
                </div>
            </div>

            <Table className="">
                <TableCaption>Lista dos fornecedores</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Produtos</TableHead>
                        <TableHead>Valor do pedido</TableHead>
                        <TableHead className="">Quantidade</TableHead>
                        <TableHead>ID do pedido</TableHead>
                        <TableHead>Data de entrega</TableHead>
                        <TableHead>Ações</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell className="font-medium">Bola de futebol</TableCell>
                        <TableCell className="">R$4306</TableCell>
                        <TableCell>45</TableCell>
                        <TableCell>64032</TableCell>
                        <TableCell>11/12/2023</TableCell>
                        <TableCell className="flex items-center gap-2">
                            <div className="hover:bg-red-300 hover:rounded-full p-2">
                                <Trash2 className="text-red-600" />
                            </div>
                            <div className="hover:bg-blue-300 hover:rounded-full p-2">
                                <Pencil className="text-blue-600" />
                            </div>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-medium">Bola de futebol</TableCell>
                        <TableCell className="">R$4306</TableCell>
                        <TableCell>45</TableCell>
                        <TableCell>64032</TableCell>
                        <TableCell>11/12/2023</TableCell>
                        <TableCell className="flex items-center gap-2">
                            <div className="hover:bg-red-300 hover:rounded-full p-2">
                                <Trash2 className="text-red-600" />
                            </div>
                            <div className="hover:bg-blue-300 hover:rounded-full p-2">
                                <Pencil className="text-blue-600" />
                            </div>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-medium">Bola de futebol</TableCell>
                        <TableCell className="">R$4306</TableCell>
                        <TableCell>45</TableCell>
                        <TableCell>64032</TableCell>
                        <TableCell>11/12/2023</TableCell>
                        <TableCell className="flex items-center gap-2">
                            <div className="hover:bg-red-300 hover:rounded-full p-2">
                                <Trash2 className="text-red-600" />
                            </div>
                            <div className="hover:bg-blue-300 hover:rounded-full p-2">
                                <Pencil className="text-blue-600" />
                            </div>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-medium">Bola de futebol</TableCell>
                        <TableCell className="">R$4306</TableCell>
                        <TableCell>45</TableCell>
                        <TableCell>64032</TableCell>
                        <TableCell>11/12/2023</TableCell>
                        <TableCell className="flex items-center gap-2">
                            <div className="hover:bg-red-300 hover:rounded-full p-2">
                                <Trash2 className="text-red-600" />
                            </div>
                            <div className="hover:bg-blue-300 hover:rounded-full p-2">
                                <Pencil className="text-blue-600" />
                            </div>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-medium">Bola de futebol</TableCell>
                        <TableCell className="">R$4306</TableCell>
                        <TableCell>45</TableCell>
                        <TableCell>64032</TableCell>
                        <TableCell>11/12/2023</TableCell>
                        <TableCell className="flex items-center gap-2">
                            <div className="hover:bg-red-300 hover:rounded-full p-2">
                                <Trash2 className="text-red-600" />
                            </div>
                            <div className="hover:bg-blue-300 hover:rounded-full p-2">
                                <Pencil className="text-blue-600" />
                            </div>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>

        </div>
    )
}
