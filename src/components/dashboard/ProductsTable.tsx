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
import { ListFilter, Pencil, Trash2 } from "lucide-react"
import Link from "next/link"

export function ProductsTable() {
    return (
        <div className="bg-white">
            <div className="flex items-center justify-between px-4 pt-5 pb-2">
                <h1 className="text-gray-800 text-xl font-semibold">
                    Produtos
                </h1>

                <div className="flex items-center justify-center gap-4">
                    <Link
                        href="/products/add_product"
                    >
                        <Button className="bg-blue-600 hover:bg-blue-800">
                            Adicionar produto
                        </Button>
                    </Link>

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
                <TableCaption>Lista dos produtos</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Produto</TableHead>
                        <TableHead>Categoria</TableHead>
                        <TableHead>Preço</TableHead>
                        <TableHead className="">Quantidade</TableHead>
                        <TableHead>Qtd. mínima</TableHead>
                        <TableHead>Disponibilidade</TableHead>
                        <TableHead>Ações</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell className="font-medium">Bola de futebol</TableCell>
                        <TableCell className="font-medium">Futebol</TableCell>
                        <TableCell className="">R$ 430</TableCell>
                        <TableCell>43</TableCell>
                        <TableCell>12</TableCell>
                        <TableCell className="text-green-500">Disponível</TableCell>
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
