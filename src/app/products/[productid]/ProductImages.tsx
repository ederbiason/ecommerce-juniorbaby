"use client"

import Image from "next/image"
import { useState } from "react"

export default function ProductImages({product}: {product: any}) {
    const [selectedImage, setSelectedImage] = useState<string>(product.images[0])

    return (
        <div className="flex gap-5">
            <div className="flex flex-col gap-5">
                {product.images.map((image: any) => (
                    <div
                        key={image}
                        onClick={() => setSelectedImage(image)}
                    >
                        <Image
                            src={image}
                            alt=""
                            height={100}
                            width={100}
                            className={`cursor-pointer rounded-md object-cover border border-dotted p-2 border-gray-300 ${selectedImage === image && "border-solid border-blue-500 border-2"}`}
                        />
                    </div>
                ))}
            </div>

            <Image 
                src={selectedImage}
                alt=""
                height={400}
                width={400}
            />
        </div>
    )
}
