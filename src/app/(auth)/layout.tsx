import Image from "next/image";
import logoImage from '../../../public/logo.png'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full px-28 items-center justify-center lg:py-10 xl:py-28 2xl:py-52">
        <Image 
          src={logoImage}
          alt="Logo image"
        />

        <div className="w-2/4 flex flex-col">
          {children}
        </div>
    </div>
  )
}
