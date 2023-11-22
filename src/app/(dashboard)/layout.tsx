import { Menu } from "@/components/Menu";
import { Navbar } from "@/components/Navbar";

export default function Dashboard({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-full flex bg-gray-200 mt-10">
            <Navbar />
            <Menu />
            {children}
        </div>
    )
}