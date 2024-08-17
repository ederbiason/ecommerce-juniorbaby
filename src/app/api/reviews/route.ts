import { connectDB } from "@/app/configs/dbConfig";
import { validateJWT } from "@/helpers/validateJWT";
import Review from "@/models/reviewModel";
import Product from "@/models/productModel";
import { NextRequest, NextResponse } from "next/server";
import { ProductInterface } from "@/interfaces";
connectDB()

export async function POST(request: NextRequest) {
    try {
        const userId = await validateJWT(request)

        const reqBody = await request.json()
        reqBody.user = userId

        const newReview = new Review(reqBody)
        await newReview.save()

        const reviews = await Review.find({ product: reqBody.product })

        const averageRating = reviews.reduce((acc: number, item: ProductInterface) => item.rating + acc, 0) / reviews.length

        await Product.findByIdAndUpdate(reqBody.product, { rating: averageRating })

        return NextResponse.json({
            message: "Review criada com sucesso!",
            review: newReview
        })
    } catch (error: any) {
        return NextResponse.json({
            message: error.message
        })
    }
}

export async function GET(request: NextRequest) {
    try {
        await validateJWT(request)

        const searchParams = request.nextUrl.searchParams
        const product = searchParams.get("product")
        const reviews = await Review.find({ product }).populate("user", "name").sort({createdAt: - 1})

        return NextResponse.json(reviews)
    } catch (error: any) {
        return NextResponse.json({
            message: error.message
        })
    }
}
