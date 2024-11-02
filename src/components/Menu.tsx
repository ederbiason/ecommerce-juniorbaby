"use client"
import clsx from "clsx";
import { BarChart4, KanbanSquare, Layers3, PackageSearch, ShoppingBag, Store, UserCircle2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Menu() {
  const pathname = usePathname()

  return (
    <div className="bg-zinc-100 flex w-1/5 flex-col gap-7 p-6">
        <Link href="/products" className={clsx("flex items-center gap-4", pathname == "/products" && "text-blue-600")}>
            <PackageSearch />
            Produtos
        </Link>

        <Link href="/categories" className={clsx("flex items-center gap-4", pathname == "/categories" && "text-blue-600")}>
            <Layers3 />
            Categorias
        </Link>

        <Link href="/users" className={clsx("flex items-center gap-4", pathname == "/users" && "text-blue-600")}>
            <UserCircle2 />
            Usuários
        </Link>

        <Link href="/orders" className={clsx("flex items-center gap-4", pathname == "/orders" && "text-blue-600")}>
            <ShoppingBag />
            Pedidos
        </Link>

        <Link href="/reports" className={clsx("flex items-center gap-4", pathname == "/reports" && "text-blue-600")}>
            <BarChart4 />
            Relatórios
        </Link>
    </div>
  )
}
