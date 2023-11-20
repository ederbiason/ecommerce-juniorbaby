import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export function Reports() {
  return (
    <div className="mt-20 flex flex-col gap-14 ">
      <div className="flex items-center justify-center gap-7">
        <div className="flex flex-col bg-white p-5 py-7 w-fit rounded-md justify-center gap-4">
          <h1 className="text-gray-800 text-xl font-semibold">
            Visão geral
          </h1>

          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-3">
              <p>Lucro total</p>
              <p>R$20.000</p>
            </div>
            <div className="flex flex-col gap-3">
              <p>Receita</p>
              <p>R$18.000</p>
            </div>
            <div className="flex flex-col gap-3">
              <p>Vendas</p>
              <p>R$12.500</p>
            </div>
          </div>

          <Separator className="bg-black" />

          <div className="flex items-center justify-between gap-10">
            <div className="flex flex-col gap-3">
              <p>Valor de compra</p>
              <p>R$20.000</p>
            </div>
            <div className="flex flex-col gap-3">
              <p>Valor de venda</p>
              <p>R$18.000</p>
            </div>
            <div className="flex flex-col gap-3">
              <p>Lucro mensal</p>
              <p>R$12.500</p>
            </div>
            <div className="flex flex-col gap-3">
              <p>Lucro anual</p>
              <p>R$12.500</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-md p-5 pb-0">
          <h1 className="text-gray-800 text-xl font-semibold">
            Melhores categorias
          </h1>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Categoria</TableHead>
                <TableHead>Retorno</TableHead>
                <TableHead>Aumento (%)</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              <TableRow>
                <TableCell>Suplementos</TableCell>
                <TableCell>R$26.000</TableCell>
                <TableCell>3.2%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Futebol</TableCell>
                <TableCell>R$22.000</TableCell>
                <TableCell>2%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Corrida</TableCell>
                <TableCell>R$24.000</TableCell>
                <TableCell>1.5%</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="flex items-center justify-center">
        <div className="flex flex-col justify-center p-5 pb-0 bg-white rounded-md w-[62%]">
          <h1 className="text-gray-800 text-xl font-semibold">
            Melhores produtos
          </h1>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produto</TableHead>
                <TableHead>ID do produto</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Qrd. restante</TableHead>
                <TableHead>Retorno</TableHead>
                <TableHead>Aumento (%)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Whey</TableCell>
                <TableCell>234567</TableCell>
                <TableCell>Suplementos</TableCell>
                <TableCell>225</TableCell>
                <TableCell>R$17.000</TableCell>
                <TableCell>2.3%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Whey</TableCell>
                <TableCell>234567</TableCell>
                <TableCell>Suplementos</TableCell>
                <TableCell>225</TableCell>
                <TableCell>R$17.000</TableCell>
                <TableCell>2.3%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Whey</TableCell>
                <TableCell>234567</TableCell>
                <TableCell>Suplementos</TableCell>
                <TableCell>225</TableCell>
                <TableCell>R$17.000</TableCell>
                <TableCell>2.3%</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
