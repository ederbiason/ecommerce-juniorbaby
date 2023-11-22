import { Button } from "@/components/ui/button";
import Image from "next/image";

import loja1 from "../../../public/loja-1.jpg"
import loja2 from "../../../public/loja-2.jpg"
import loja3 from "../../../public/loja-3.jpg"

export function Stores() {
  return (
    <div className="m-14 bg-white rounded-md p-5">
        <div className=" flex items-center justify-between">
            <h1 className="text-gray-800 text-xl font-semibold">Gerenciar lojas</h1>

            <Button className="bg-blue-600 hover:bg-blue-800">
                Adicionar loja
            </Button>
        </div>

        <div className="flex flex-col p-5 mr-20 gap-7">
            <div className="border border-gray-400 rounded-md w-full flex justify-between">
                <div className="flex">
                    <Image
                        alt="Shopping Catuai Londrina"
                        src={loja1}
                        width={290}
                        height={150}
                        className="rounded-l-md"
                    />
                    <div className="p-5 flex flex-col gap-3">
                        <h1 className="text-xl">
                            Sports Store
                        </h1>
                        <div className="flex flex-col gap-2 text-gray-500">
                            <p>Rod. Celso Garcia Cid, 5600</p>
                            <p>Londrina - PR</p>
                            <p>86050-901</p>
                        </div>
                    </div>
                </div>

                <div className="p-3">
                    <Button className="border text-blue-600 bg-white hover:bg-gray-200 border-gray-400 p-">
                        Editar
                    </Button>
                </div>
            </div>
            <div className="border border-gray-400 rounded-md w-full flex justify-between">
                <div className="flex">
                    <Image
                        alt="Shopping Catuai Londrina"
                        src={loja2}
                        width={290}
                        height={150}
                        className="rounded-l-md"
                    />
                    <div className="p-5 flex flex-col gap-3">
                        <h1 className="text-xl">
                            Sports Store
                        </h1>
                        <div className="flex flex-col gap-2 text-gray-500">
                            <p>Av. Theodoro Victorelli, 150</p>
                            <p>Londrina - PR</p>
                            <p>86027-750</p>
                        </div>
                    </div>
                </div>

                <div className="p-3">
                    <Button className="border text-blue-600 bg-white hover:bg-gray-200 border-gray-400 p-">
                        Editar
                    </Button>
                </div>
            </div>
            <div className="border border-gray-400 rounded-md w-full flex justify-between">
                <div className="flex">
                    <Image
                        alt="Shopping Catuai Londrina"
                        src={loja3}
                        width={290}
                        height={150}
                        className="rounded-l-md"
                    />
                    <div className="p-5 flex flex-col gap-3">
                        <h1 className="text-xl">
                            Sports Store
                        </h1>
                        <div className="flex flex-col gap-2 text-gray-500">
                            <p>R. Américo Deolindo Garla, 224</p>
                            <p>Londrina - PR</p>
                            <p>86079-225</p>
                        </div>
                    </div>
                </div>

                <div className="p-3">
                    <Button className="border text-blue-600 bg-white hover:bg-gray-200 border-gray-400 p-">
                        Editar
                    </Button>
                </div>
            </div>
        </div>
    </div>
  )
}
