import { NextResponse } from "next/server";

export async function GET() {
    const response = NextResponse.json({
        message: "Deslogado com sucesso!"
    })

    response.cookies.delete("token")

    return response
}
