import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
    let isPublicRoute = false 

    if(request.nextUrl.pathname === "/login" || request.nextUrl.pathname === "/sign-up") {
        isPublicRoute = true
    }

    // Se não tiver um token e a rota for privada, redireciona para o login
    const token = request.cookies.get("token")?.value || ""

    if(!token && !isPublicRoute) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    // Se tiver token e rota for publica, redireciona para a home
    if(token && isPublicRoute) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/login', '/sign-up', '/'],
}
