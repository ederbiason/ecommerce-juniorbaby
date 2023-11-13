import { KanbanSquare, PackageSearch, ShoppingBag, Store, UserCircle2 } from "lucide-react";
import Link from "next/link";

export function Menu() {
  return (
    <div className="flex w-1/5 flex-col gap-7 mt-14 pt-7 px-6">
        <Link href="/products" className="flex items-center gap-4">
            <PackageSearch />
            Produtos
        </Link>

        <Link href="" className="flex items-center gap-4">
            <KanbanSquare className="rotate-180" />
            Relatórios
        </Link>

        <Link href="" className="flex items-center gap-4">
            <UserCircle2 />
            Fornecedores
        </Link>

        <Link href="" className="flex items-center gap-4">
            <ShoppingBag />
            Pedidos
        </Link>

        <Link href="" className="flex items-center gap-4">
            <Store />
            Lojas
        </Link>
    </div>
  )
}
