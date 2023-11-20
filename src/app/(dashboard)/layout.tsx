import { Menu } from "@/components/Menu";

export default function Dashboard({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-screen flex bg-gray-200">
            <Menu />
            {children}
        </div>
    )
}