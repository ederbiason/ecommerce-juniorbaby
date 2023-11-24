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
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { CategoryForm } from "@/components/form/CategoryForm"

export function CategoriesTable() {
    return (
        <div className="bg-white rounded-md">
            <div className="flex items-center justify-between px-4 pt-5 pb-2">
                <h1 className="text-gray-800 text-xl font-semibold">
                    Categorias
                </h1>

                <div className="flex items-center justify-center gap-4">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="bg-blue-600 hover:bg-blue-800">
                                Adicionar categoria
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle className="text-2xl font-semibold">Nova categoria</DialogTitle>
                            </DialogHeader>
                            <div className="grid gap-4">
                                <CategoryForm />
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
                <TableCaption>Lista das categorias</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Categoria</TableHead>
                        <TableHead>Descrição</TableHead>
                        <TableHead>Criado em</TableHead>
                        <TableHead>Ações</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell className="font-medium">Futebol</TableCell>
                        <TableCell className="font-medium">ijasidjaisjdiasjdiajsidasidj</TableCell>
                        <TableCell className="">12/04/2023</TableCell>
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
