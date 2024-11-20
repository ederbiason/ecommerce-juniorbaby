import axios from "axios"
import { cookies } from "next/headers"
import ProductImages from "./ProductImages"
import { AddToCartBtn } from "@/components/client/AddToCartBtn"
import { ProductReviews } from "./ProductReviews"
import { Rate } from "antd"
import ProductSizes from "./ProductSizes"

export default async function ProductInfo({ params }: { params: { productid: string } }) {
    async function getProduct(productid: string) {
        try {
            const cookieStore = cookies()
            const token = cookieStore.get('token')?.value

            const endpoint = `${process.env.domain}/api/products/${productid}`
            const response = await axios.get(endpoint, {
                headers: {
                    Cookie: `token=${token}`
                }
            })

            return response.data || []
        } catch (error: any) {
            console.log(error.message)
            return []
        }
    }

    const product = await getProduct(params.productid)

    return (
        <div className="p-10">
            {
                product &&
                <div className="grid grid-cols-2 gap-5">
                    <ProductImages
                        product={product}
                    />

                    <div className="flex flex-col gap-2">
                        <h1 className="text-3xl font-semibold">{product.name}</h1>

                        <div className="text-gray-600">
                            {product.description}
                        </div>

                        <h1 className="text-5xl my-5 font-semibold">
                            {(product.price).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}
                        </h1>

                        {product.category === "Roupas" && (
                            <ProductSizes 
                                product={product}
                                
                            />
                        )}

                        <Rate disabled defaultValue={product.rating} />

                        <div className="mt-3">
                            <AddToCartBtn
                                product={product}
                            />
                        </div>

                        <hr className="border-zinc-500 mt-3" />

                        <ProductReviews product={product} />
                    </div>
                </div>
            }
        </div>
    )
}
