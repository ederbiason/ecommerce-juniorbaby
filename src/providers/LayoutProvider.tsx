"use client"

import { Loader } from "@/components/Loader"
import { Navbar } from "@/components/Navbar"
import { usePathname } from "next/navigation"
import { ReactNode } from "react"

export function LayoutProvider({children}: {children: ReactNode}) {
  const pathname = usePathname()
  const isPrivatePage = pathname !== '/login' && pathname !== '/sign-up'

  return (
    <div className="w-full">
        {isPrivatePage && (
          <>
            <Navbar />
            {children}
          </>
        )}
        
        {!isPrivatePage && children}
    </div>
  )
}
