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
import { ListFilter } from "lucide-react"
import { SupplierForm } from "@/components/form/SupplierForm"

export function SuppliersTable() {
    return (
        <div className="mt-14 bg-white">
            <div className="flex items-center justify-between px-4 pt-5 pb-2">
                <h1 className="text-gray-800 text-xl font-semibold">
                    Fornecedores
                </h1>

                <div className="flex items-center justify-center gap-4">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="bg-blue-600 hover:bg-blue-800">
                                Adicionar fornecedor
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Novo fornecedor</DialogTitle>
                            </DialogHeader>
                            <div className="grid gap-4 py-4 ">
                                <SupplierForm />

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
                            <DialogFooter>
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
                            </DialogFooter>
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
                        <TableHead>Nome</TableHead>
                        <TableHead>Produto</TableHead>
                        <TableHead className="">Contato</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>CNPJ/CPF</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell className="font-medium">Renan de Souza</TableCell>
                        <TableCell className="">Bola de futebol</TableCell>
                        <TableCell>4452324567</TableCell>
                        <TableCell>renansouza@hotmail.com</TableCell>
                        <TableCell>123123123123</TableCell>
                        <TableCell className="text-green-500">Ativo</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-medium">Renan de Souza</TableCell>
                        <TableCell className="">Bola de futebol</TableCell>
                        <TableCell>4452324567</TableCell>
                        <TableCell>renansouza@hotmail.com</TableCell>
                        <TableCell>123123123123</TableCell>
                        <TableCell className="text-green-500">Ativo</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-medium">Renan de Souza</TableCell>
                        <TableCell className="">Bola de futebol</TableCell>
                        <TableCell>4452324567</TableCell>
                        <TableCell>renansouza@hotmail.com</TableCell>
                        <TableCell>123123123123</TableCell>
                        <TableCell className="text-green-500">Ativo</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-medium">Renan de Souza</TableCell>
                        <TableCell className="">Bola de futebol</TableCell>
                        <TableCell>4452324567</TableCell>
                        <TableCell>renansouza@hotmail.com</TableCell>
                        <TableCell>123123123123</TableCell>
                        <TableCell className="text-green-500">Ativo</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-medium">Renan de Souza</TableCell>
                        <TableCell className="">Bola de futebol</TableCell>
                        <TableCell>4452324567</TableCell>
                        <TableCell>renansouza@hotmail.com</TableCell>
                        <TableCell>123123123123</TableCell>
                        <TableCell className="text-green-500">Ativo</TableCell>
                    </TableRow>
                </TableBody>
            </Table>

        </div>
    )
}
