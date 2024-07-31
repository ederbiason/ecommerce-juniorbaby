import { connectDB } from "@/app/configs/dbConfig";
import { validateJWT } from "@/helpers/validateJWT";
import Category from "@/models/categoryModel";
import { NextRequest, NextResponse } from "next/server";
connectDB()

export async function PUT(request: NextRequest, {params}: {params : {categoryid: string}}) {
    try {
        await validateJWT(request)

        const reqBody = await request.json()
        await Category.findByIdAndUpdate(params.categoryid, reqBody)

        return NextResponse.json({
            message: "Categoria atualizada com sucesso!"
        })
    } catch (error: any) {
        return NextResponse.json({message: error.message}, {status: 500})
    }
}

export async function PATCH(request: NextRequest, {params}: {params : {categoryid: string}}) {
    try {
        await validateJWT(request)

        await Category.findByIdAndUpdate(params.categoryid, {isActive: false})

        return NextResponse.json({
            message: "Categoria desativada com sucesso!"
        })
    } catch (error: any) {
        return NextResponse.json({message: error.message}, {status: 500})
    }
}
