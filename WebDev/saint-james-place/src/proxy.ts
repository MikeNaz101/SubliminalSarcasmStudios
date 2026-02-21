import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export const proxy = withAuth(
    function middleware(req) {
        const token = req.nextauth.token;
        const path = req.nextUrl.pathname;

        // We now expect an array of roles, defaulting to an empty array if none exist
        const roles = (token?.roles as string[]) || [];

        // 1. Protect Admin Routes (Boss only)
        if (path.startsWith("/dashboard/admin") && !roles.includes("admin")) {
            return NextResponse.redirect(new URL("/dashboard", req.url));
        }

        // 2. Protect Resident Routes (Residents & Workers/Admins who live there)
        if (path.startsWith("/dashboard/resident") && !roles.includes("resident")) {
            return NextResponse.redirect(new URL("/dashboard", req.url));
        }

        // 3. Protect Worker Routes (Workers & Admins testing the worker view)
        if (path.startsWith("/dashboard/worker") && !roles.includes("worker")) {
            return NextResponse.redirect(new URL("/dashboard", req.url));
        }

        return NextResponse.next();
    },
    {
        callbacks: {
            // Require a valid token to even trigger the middleware logic above
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