import { connectDB } from "@/app/configs/dbConfig";
import { validateJWT } from "@/helpers/validateJWT";
import Product from "@/models/productModel";
import { NextRequest, NextResponse } from "next/server";
connectDB()

export async function POST(request: NextRequest) {
    try {
        const userId = await validateJWT(request)

        const reqBody = await request.json()
        const productExists = await Product.findOne({ name: reqBody.name })

        if (productExists) {
            throw new Error("O produto já existe.")
        }

        reqBody.createdBy = userId
        const product = new Product(reqBody) 

        await product.save()

        return NextResponse.json({
            message: "Produto criado com sucesso!"
        })
    } catch (error: any) {
        return NextResponse.json({message: error.message}, {status: 500})
    }
}

export async function GET(request: NextRequest) {
    try {
        await validateJWT(request)
        const products = await Product.find()

        return NextResponse.json({
            data: products
        })
    } catch (error: any) {
        return NextResponse.json({
            message: error.message
        }, {
            status: 500
        })
    }
}
