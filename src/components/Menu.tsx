"use client"
import clsx from "clsx";
import { KanbanSquare, Layers3, PackageSearch, ShoppingBag, Store, UserCircle2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Menu() {
  const pathname = usePathname()

  return (
    <div className="bg-zinc-100 flex w-1/5 h-screen flex-col gap-7 p-6">
        <Link href="/products" className={clsx("flex items-center gap-4", pathname == "/products" && "text-blue-600")}>
            <PackageSearch />
            Produtos
        </Link>

        <Link href="/categories" className={clsx("flex items-center gap-4", pathname == "/categories" && "text-blue-600")}>
            <Layers3 />
            Categorias
        </Link>

        <Link href="/reports" className={clsx("flex items-center gap-4", pathname == "/reports" && "text-blue-600")}>
            <KanbanSquare className="rotate-180" />
            Relatórios
        </Link>

        <Link href="/suppliers" className={clsx("flex items-center gap-4", pathname == "/suppliers" && "text-blue-600")}>
            <UserCircle2 />
            Fornecedores
        </Link>

        <Link href="/orders" className={clsx("flex items-center gap-4", pathname == "/orders" && "text-blue-600")}>
            <ShoppingBag />
            Pedidos
        </Link>

        <Link href="/stores" className={clsx("flex items-center gap-4", pathname == "/stores" && "text-blue-600")}>
            <Store />
            Lojas
        </Link>
    </div>
  )
}
