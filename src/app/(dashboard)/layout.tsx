import { Menu } from "@/components/Menu";

export default function Dashboard({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-full bg-gray-200">
            <div className="flex">
                <Menu />
                {children}
            </div>
        </div>
    )
}