"use client"

import { Loader } from "@/components/Loader"
import { ProductForm } from "@/components/form/ProductForm"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/components/ui/use-toast"
import axios from "axios"
import { useEffect, useState } from "react"

type ProductProps = {
    name: string,
    description: string,
    price: number,
    category: string,
    images: any,
    countInStock: number,
    minThreshold: number,
    isActive: boolean
}

export default function EditProduct({ params }: { params: any }) {
    const [existingImages= [], setExistingImages] = useState<any[]>([])
    const [loadingProduct, setLoadingProduct] = useState(false)
    const [product, setProduct] = useState<ProductProps[]>([])

    const getProduct = async () => {
        try {
            setLoadingProduct(true)
            const response = await axios.get(`/api/products/${params.productid}`)
            setExistingImages(response.data.images || [])
            setProduct(response.data)
        } catch (error: any) {
            toast({
                title: 'Erro na busca do produto',
                description: error.message,
                variant: 'destructive'
            })
        } finally {
            setLoadingProduct(false)
        }
    }

    useEffect(() => {
        getProduct()
    }, [])

    return (
        <div className="w-full p-5">
            {loadingProduct && <Loader />}

            <h1 className="text-2xl font-bold text-gray-800 mb-2">
                Editar produto
            </h1>

            <Separator className="bg-black" />

            {
                product && (
                    <ProductForm
                        initialValues={product}
                        existingImages={existingImages}
                        setExistingImages={setExistingImages}
                        productEditId={params.productid}
                    />
                )
            }
        </div>
    )
}
