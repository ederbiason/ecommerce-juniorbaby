import { KanbanSquare, PackageSearch, ShoppingBag, Store, UserCircle2 } from "lucide-react";
import Link from "next/link";

export function Menu() {
  return (
    <div className="bg-zinc-100 flex w-1/5 h-screen flex-col gap-7 p-6">
        <Link href="/products" className="flex items-center gap-4">
            <PackageSearch />
            Produtos
        </Link>

        <Link href="/reports" className="flex items-center gap-4">
            <KanbanSquare className="rotate-180" />
            Relatórios
        </Link>

        <Link href="/suppliers" className="flex items-center gap-4">
            <UserCircle2 />
            Fornecedores
        </Link>

        <Link href="orders" className="flex items-center gap-4">
            <ShoppingBag />
            Pedidos
        </Link>

        <Link href="stores" className="flex items-center gap-4">
            <Store />
            Lojas
        </Link>
    </div>
  )
}
