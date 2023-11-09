import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { Store } from "lucide-react";

export function Navbar() {
  return (
    <div className="bg-zinc-100 py-2 border-b border-s-zinc-200 fixed w-full z-10 top-0">
        <div className="container flex items-center justify-between">
            <Link href="/">
                <Store />
            </Link>

            <Link 
                href="/login"
                className={buttonVariants()}
            >
                Login
            </Link>
        </div>
    </div>
  )
}
