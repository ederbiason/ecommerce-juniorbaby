import { AddToCartBtn } from "@/components/client/AddToCartBtn"
import { Rate } from "antd"
import axios from "axios"
import { cookies } from "next/headers"
import Image from "next/image"
import Link from "next/link"

async function getProducts() {
  try {
    const cookieStore = cookies()
    const token = cookieStore.get('token')?.value

    const endpoint = `${process.env.domain}/api/products`
    const response = await axios.get(endpoint, {
      headers: {
        Cookie: `token=${token}`
      }
    })

    return response.data.data || []
  } catch (error: any) {
    console.log(error.message)
    return []
  }
}

export default async function Home({ children }: { children: React.ReactNode }) {
  const products = await getProducts()

  return (
    <div className="text-xl p-5">

      {/* filters purpose */}
      <div className="grid md:grid-cols-2 2xl:grid-cols-5 lg:grid-cols-3 gap-8 px-20 py-10">
        {products.map((product: any) => (
          <div key={product._id} className="gap-2 flex flex-col p-4 border border-solid border-gray-400 rounded-md">
            <Link
              href={`/products/${product._id}`}
              className="h-full flex flex-col justify-between items-center"
            >
              <Image
                src={product.images[0]}
                alt=""
                height={180}
                width={180}
                className="object-center"
              />
              <div className="flex flex-col items-center gap-3">
                <h1 className="font-semibold text-center">
                  {product.name}
                </h1>
              </div>
            </Link>

            <div className="flex flex-col items-center justify-center gap-3">
              <Rate defaultValue={product.rating || 3} />
              <div className="flex gap-5 items-center">
                <h1 className="font-semibold">
                  R$ {product.price}
                </h1>
                <AddToCartBtn
                  product={product}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
