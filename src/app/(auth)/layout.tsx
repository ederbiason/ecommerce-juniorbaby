import Image from "next/image";
import logoImage from '../../../public/logo.png'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full px-28 items-center justify-center lg:py-10 xl:py-20 2xl:py-40">
        <Image 
          src={logoImage}
          alt="Logo image"
        />

        <div className="w-2/3 flex flex-col">
          {children}
        </div>
    </div>
  )
}
