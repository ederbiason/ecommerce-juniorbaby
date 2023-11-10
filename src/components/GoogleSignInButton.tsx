import { Button } from "@/components/ui/button";


export function GoogleSignInButton({children}: {children: React.ReactNode}) {
    function loginWithGoogle() {
        console.log("Logar Google")
    }

    return (
        <Button 
            className="w-2/3 flex gap-3 hover:bg-zinc-300 bg-white border border-zinc-400 text-gray-800 font-semibold text-md"
            onClick={loginWithGoogle}
        >
            {children}
        </Button>
    )
}