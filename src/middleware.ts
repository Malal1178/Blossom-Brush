import { auth } from "@/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
    const isLoggedIn = !!req.auth
    const { pathname } = req.nextUrl

    if (pathname.startsWith("/admin")) {
        if (!isLoggedIn) return NextResponse.redirect(new URL("/login", req.url))
        if ((req.auth?.user as any).role !== "admin") return NextResponse.redirect(new URL("/dashboard", req.url))
    }

    if (pathname.startsWith("/dashboard")) {
        if (!isLoggedIn) return NextResponse.redirect(new URL("/login", req.url))
    }
})

export const config = {
    matcher: ["/admin/:path*", "/dashboard/:path*"],
}
