import { Menu } from "@/components/Menu";

export default function Dashboard({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-full bg-blue-200 h-full flex">
            <Menu />
            {children}
        </div>
    )
}