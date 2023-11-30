import { NextResponse, NextRequest } from "next/server"
import Order from "@/models/orderModel"
import { validateJWT } from "@/helpers/validateJWT"
import Product from "@/models/productModel"
import { connectDB } from "@/app/configs/dbConfig"
connectDB()

export async function POST(request: NextRequest) {
  try {
    const userId = await validateJWT(request)
    const reqBody = await request.json()
    reqBody.user = userId
    const order = new Order(reqBody)
    await order.save()

    // diminuir a quantidade de produtos
    for (let i = 0; i < reqBody.items.length; i++) {
      const product: any = await Product.findById(reqBody.items[i]._id)
      product.countInStock -= reqBody.items[i].quantity
      await product.save()
    }

    return NextResponse.json({
      message: "Pedido efetuado com sucesso!",
    })
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 500 }
    )
  }
}
