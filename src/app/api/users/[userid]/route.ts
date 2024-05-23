import { NextRequest, NextResponse } from "next/server"
import User from "@/models/userModel"
import bcryptjs from "bcryptjs"
import { connectDB } from "@/app/configs/dbConfig"
connectDB()

interface Params {
    userid: string
}

export async function PUT(request: NextRequest, { params }: { params: Params }) {
    try {
        const userid = params.userid

        const reqBody = await request.json()
        const user = await User.findOne({ email: reqBody.email })

        if (reqBody.password && reqBody.newPassword) {
            const isMatch = await bcryptjs.compare(
                reqBody.password,
                user.password as string
            )

            if (!isMatch) {
                return NextResponse.json({ message: "Senha incorreta!" }, { status: 401 })
            }

            const salt = await bcryptjs.genSalt(10)
            const hashedPassword = await bcryptjs.hash(reqBody.newPassword, salt)
            reqBody.password = hashedPassword
        } else {
            delete reqBody.password
        }

        const updatedUser = await User.findByIdAndUpdate(userid, reqBody, {
            new: true,
        }).select("-password");

        return NextResponse.json(updatedUser);
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 })
    }
}

export async function GET(request: NextRequest, {params}: {params : {userid: string}}) {
    try {
        const user = await User.findById(params.userid)
        return NextResponse.json(user)
    } catch (error: any) {
        return NextResponse.json({message: error.message}, {status: 500})
    }
}

export async function PATCH(request: NextRequest, { params }: { params: Params }) {
    try {
        const userid = params.userid
        const reqBody = await request.json()

        if (typeof reqBody.isActive !== 'boolean') {
            return NextResponse.json({ message: "O campo 'isActive' é obrigatório e deve ser booleano." }, { status: 400 })
        }

        const updatedUser = await User.findByIdAndUpdate(
            userid,
            { isActive: reqBody.isActive },
            { new: true }
        ).select("-password")

        if (!updatedUser) {
            return NextResponse.json({ message: "Usuário não encontrado." }, { status: 404 })
        }

        return NextResponse.json(updatedUser)
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 })
    }
}
