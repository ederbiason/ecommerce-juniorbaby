"use client"

import { ProductForm } from "@/components/form/ProductForm"
import { Separator } from "@/components/ui/separator"
import { useEffect, useState } from "react"

export default function AddProduct() {
  const [selectedFiles, setSelectedFiles] = useState([])

  useEffect(() => {
    console.log(selectedFiles)
  }, [selectedFiles])
  

  return (
    <div className="w-full p-5">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Adicionar produto
        </h1>

        <Separator className="bg-black" />

        <ProductForm 
          selectedFiles={selectedFiles}
          setSelectedFiles={setSelectedFiles}
        />
    </div>
  )
}
