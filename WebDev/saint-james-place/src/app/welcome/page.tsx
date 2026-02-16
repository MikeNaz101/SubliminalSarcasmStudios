"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function WelcomePage() {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        // 1. Wait for the session to load
        if (status === "loading") return;

        // 2. If not logged in, send back to login
        if (status === "unauthenticated") {
            router.push("/auth/signin");
            return;
        }

        // 3. The "Traffic Cop" Logic (with a slight delay for effect)
        const role = session?.user?.role;

        const timer = setTimeout(() => {
            switch (role) {
                case "admin":
                    router.push("/dashboard/admin");
                    break;
                case "resident":
                    router.push("/dashboard/resident");
                    break;
                case "worker":
                    router.push("/dashboard/worker");
                    break;
                case "banned":
                    router.push("/auth/error?error=AccessDenied");
                    break;
                default:
                    router.push("/dashboard/pending"); // Default for "unverified"
            }
        }, 2000); // 2-second delay so they see the welcome message

        return () => clearTimeout(timer);
    }, [session, status, router]);

    if (status === "loading") return null;

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white">
            {/* Animation / Loader */}
            <div className="relative flex items-center justify-center mb-8">
                <div className="absolute animate-ping inline-flex h-full w-full rounded-full bg-blue-400 opacity-20"></div>
                <div className="relative inline-flex rounded-full h-24 w-24 bg-blue-100 items-center justify-center">
                    <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
            </div>

            {/* Welcome Message */}
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
                Welcome back, {session?.user?.name?.split(" ")[0] || "Neighbor"}
            </h1>
            <p className="text-slate-500 animate-pulse">
                Securely logging you into the {session?.user?.role === "resident" ? "Resident" : "Staff"} Portal...
            </p>
        </div>
    );
}