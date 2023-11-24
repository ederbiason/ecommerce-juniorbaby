import { connectDB } from "@/app/configs/dbConfig";
import { validateJWT } from "@/helpers/validateJWT";
import Category from "@/models/categoryModel";
import { NextRequest, NextResponse } from "next/server";
connectDB()

export async function POST(request: NextRequest) {
    try {
        const userId = await validateJWT(request)

        const reqBody = await request.json()
        const categoryExists = await Category.findOne({ name: reqBody.name })

        if (categoryExists) {
            throw new Error("A categoria já existe.")
        }

        reqBody.createdBy = userId
        const category = new Category(reqBody) 

        await category.save()

        return NextResponse.json({
            message: "Categoria criada com sucesso!"
        })
    } catch (error: any) {
        return NextResponse.json({message: error.message}, {status: 500})
    }
}
