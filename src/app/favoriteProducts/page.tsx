'use client'

import { AddToCartBtn } from "@/components/client/AddToCartBtn"
import { FavoriteState, RemoveProductFromFavorite } from "@/redux/favoriteSlice"
import { Rate } from "antd"
import { Frown, Heart, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useDispatch, useSelector } from "react-redux"

export default function FavoriteProducts() {
  const { favoriteItems }: FavoriteState = useSelector((state: any) => state.favorite)
  const dispatch = useDispatch()

  return (
    <div className="p-5 pt-10">
      {favoriteItems.length > 0 ? (
        <div className="text-xl p-5">
          <h1 className="underline underline-offset-8 text-4xl text-zinc-800 font-bold mb-5">
            Seus produtos favoritos:
          </h1>

          <div className="grid md:grid-cols-2 2xl:grid-cols-5 lg:grid-cols-3 gap-8 px-20 py-10">
            {favoriteItems.map((product: any) => (
              product.isActive && (
                <div key={product._id} className="gap-2 flex flex-col p-4 border border-solid border-gray-400 rounded-md relative">
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
                    <Rate disabled defaultValue={product.rating} />
                    <div className="flex gap-5 items-center">
                      <h1 className="font-semibold">
                        R$ {product.price}
                      </h1>
                      <AddToCartBtn
                        product={product}
                      />
                    </div>
                  </div>

                  <div
                    className="absolute right-5 hover:bg-zinc-300 p-2 rounded-full cursor-pointer"
                    onClick={() => {
                      dispatch(RemoveProductFromFavorite(product))
                    }}
                  >
                    <X className=""/>
                  </div>
                </div>
              )
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-5 text-gray-700 justify-center">
          <Heart className="w-20 h-20" />
          <div className="flex items-center justify-center gap-3">
            <h1 className="text-3xl font-semibold">Você não possui nenhum produto nos favoritos!</h1>
            <Frown />
          </div>
        </div>
      )}
    </div>
  )
}
