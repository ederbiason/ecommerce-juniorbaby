"use client"

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { signIn } from "next-auth/react"
import { toast } from "@/components/ui/use-toast";

export function GoogleSignInButton({children}: {children: React.ReactNode}) {
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const loginWithGoogle = async () => {
        setIsLoading(true)

        try {
            await signIn('google')
        } catch (error) {
            toast({
                title: 'Error',
                description: 'There was a error loggin in',
                variant: "destructive",
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Button 
            className="w-2/3 flex gap-3 hover:bg-zinc-300 bg-white border border-zinc-400 text-gray-800 font-semibold text-md"
            onClick={loginWithGoogle}
            disabled={isLoading}
        >
            {children}
        </Button>
    )
}