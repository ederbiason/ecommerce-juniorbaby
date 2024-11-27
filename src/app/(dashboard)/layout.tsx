import { Menu } from "@/components/Menu";

export default function Dashboard({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-full h-full bg-gray-200">
            <div className="flex h-full min-h-screen">
                <Menu />
                {children}
            </div>
        </div>
    )
}