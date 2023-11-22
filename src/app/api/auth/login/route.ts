import { connectDB } from "@/app/configs/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken"
connectDB()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()

        // verificar se o usuário existe
        const user = await User.findOne({email: reqBody.email})
        if (!user) {
            throw new Error("O usuário não existe.")
        }

        const passwordMatch = await bcrypt.compare(reqBody.password, user.password)
        if (!passwordMatch) {
            throw new Error("O email ou senha estão inválidos.")
        }

        // criar token
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET!, {
            expiresIn: "7d",
        })

        const response = NextResponse.json({
            message: "Login feito com sucesso!",
        })
        response.cookies.set("token", token, {
            httpOnly: true, 
            path: "/"
        })

        return response
    } catch (error: any) {
        return NextResponse.json({
            message: error.message,
        }, {
            status: 400
        })
    }
}
