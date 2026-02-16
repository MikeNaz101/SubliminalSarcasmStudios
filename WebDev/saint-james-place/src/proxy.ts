import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export const proxy = withAuth(
    function middleware(req) {
        const token = req.nextauth.token;
        const path = req.nextUrl.pathname;
        const role = token?.role;

        // 1. Protect Admin Routes
        if (path.startsWith("/dashboard/admin") && role !== "admin") {
            return NextResponse.redirect(new URL("/dashboard", req.url));
        }

        // 2. Protect Resident Routes
        if (path.startsWith("/dashboard/resident") && role !== "resident") {
            return NextResponse.redirect(new URL("/dashboard", req.url));
        }

        // 3. Protect Worker Routes
        if (path.startsWith("/dashboard/worker") && role !== "worker") {
            return NextResponse.redirect(new URL("/dashboard", req.url));
        }

        return NextResponse.next();
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token,
        },
    }
);

export const config = {
    matcher: [
        "/dashboard/resident/:path*",
        "/dashboard/worker/:path*",
        "/dashboard/admin/:path*",
        "/api/admin/:path*",
    ],
};