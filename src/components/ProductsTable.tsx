import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

export function ProductsTable() {
    return (
        <div>
            <Table>
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Produto</TableHead>
                        <TableHead>Preço</TableHead>
                        <TableHead className="">Quantidade</TableHead>
                        <TableHead>Qtd. mínima</TableHead>
                        <TableHead>Validade</TableHead>
                        <TableHead>Disponibilidade</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell className="font-medium">Bola de futebol</TableCell>
                        <TableCell className="">R$ 430</TableCell>
                        <TableCell>43</TableCell>
                        <TableCell>12</TableCell>
                        <TableCell>**/**/****</TableCell>
                        <TableCell className="text-green-500">Disponível</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-medium">Bola de futebol</TableCell>
                        <TableCell>R$ 430</TableCell>
                        <TableCell>43</TableCell>
                        <TableCell>12</TableCell>
                        <TableCell>**/**/****</TableCell>
                        <TableCell className="text-green-500">Disponível</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-medium">Bola de futebol</TableCell>
                        <TableCell>R$ 430</TableCell>
                        <TableCell>43</TableCell>
                        <TableCell>12</TableCell>
                        <TableCell>**/**/****</TableCell>
                        <TableCell className="text-green-500">Disponível</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-medium">Bola de futebol</TableCell>
                        <TableCell>R$ 430</TableCell>
                        <TableCell>43</TableCell>
                        <TableCell>12</TableCell>
                        <TableCell>**/**/****</TableCell>
                        <TableCell className="text-green-500">Disponível</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-medium">Bola de futebol</TableCell>
                        <TableCell>R$ 430</TableCell>
                        <TableCell>43</TableCell>
                        <TableCell>12</TableCell>
                        <TableCell>**/**/****</TableCell>
                        <TableCell className="text-green-500">Disponível</TableCell>
                    </TableRow>
                    
                </TableBody>
            </Table>

        </div>
    )
}
