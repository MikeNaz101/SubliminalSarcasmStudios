"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function AuthButtons() {
    const { data: session } = useSession();

    if (session) {
        return (
            <div className="flex gap-4 items-center">
        <span className="text-sm font-bold text-slate-600 hidden md:inline">
          Hi, {session.user?.name?.split(" ")[0]}
        </span>
                <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="px-4 py-2 text-sm font-bold text-slate-500 hover:text-red-600 transition-colors"
                >
                    Sign Out
                </button>
                <Link
                    href="/dashboard"
                    className="bg-slate-900 text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-slate-700 transition-all shadow-md"
                >
                    Dashboard
                </Link>
            </div>
        );
    }

    // THIS IS THE PART THAT HANDLES "RESIDENT LOGIN"
    return (
        <div className="flex gap-3">
            <button
                onClick={() => signIn("google", { callbackUrl: "/welcome" })}
                className="bg-gold-500 text-white px-6 py-2 rounded-full text-sm font-bold hover:bg-gold-600 hover:shadow-lg transition-all transform hover:-translate-y-0.5"
            >
                Resident Login
            </button>
        </div>
    );
}