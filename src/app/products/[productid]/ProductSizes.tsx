"use client"
import { useState } from "react"

interface ProductSizesProps {
    product: any
}

export default function ProductSizes({product}: ProductSizesProps) {
    const [selectedSize, setSelectedSize] = useState<number | null>(null)

    const handleSizeClick = (size: number) => {
        setSelectedSize(size)
    }

    return (
        <div className="flex flex-col gap-2 mb-5">
            <p>Escolha o tamanho</p>
            <div className="flex space-x-4">
                {product.size.map((size: number) => (
                    <div
                        key={size}
                        onClick={() => handleSizeClick(size)}
                        className={`w-10 h-10 flex items-center justify-center border rounded-full cursor-pointer ${selectedSize === size
                                ? 'border-blue-500 bg-blue-100'
                                : 'border-gray-300'
                            }`}
                    >
                        {size}
                    </div>
                ))}
            </div>
        </div>
    )
}