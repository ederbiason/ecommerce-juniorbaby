import { connectDB } from "@/app/configs/dbConfig";
import { validateJWT } from "@/helpers/validateJWT";
import Product from "@/models/productModel";
import { NextRequest, NextResponse } from "next/server";
connectDB()

export async function GET(request: NextRequest, {params}: {params : {productid: string}}) {
    try {
        const product = await Product.findById(params.productid)
        return NextResponse.json(product)
    } catch (error: any) {
        return NextResponse.json({message: error.message}, {status: 500})
    }
}

export async function PUT(request: NextRequest, {params}: {params : {productid: string}}) {
    try {
        await validateJWT(request)

        const reqBody = await request.json()
        await Product.findByIdAndUpdate(params.productid, reqBody)

        return NextResponse.json({
            message: "Produto atualizado com sucesso!"
        })
    } catch (error: any) {
        return NextResponse.json({message: error.message}, {status: 500})
    }
}

export async function PATCH(request: NextRequest, {params}: {params : {productid: string}}) {
    try {
        await validateJWT(request)

        await Product.findByIdAndUpdate(params.productid, {isActive: false})

        return NextResponse.json({
            message: "Produto desativado com sucesso!"
        })
    } catch (error: any) {
        return NextResponse.json({message: error.message}, {status: 500})
    }
}
