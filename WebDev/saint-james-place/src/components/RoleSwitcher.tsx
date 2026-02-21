"use client";

import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

export default function RoleSwitcher() {
    const { data: session } = useSession();
    const pathname = usePathname();
    const router = useRouter();

    // FIXED: Replaced 'any' with an explicit type structure to satisfy ESLint
    const roles = (session?.user as { roles?: string[] })?.roles || [];

    // If they only have 1 role (or 0), hide the switcher entirely
    if (roles.length <= 1) return null;

    // Figure out which dashboard they are currently looking at
    const currentView = pathname.split("/")[2]; // e.g., "admin" from "/dashboard/admin"

    return (
        <div className="bg-[#0b1120] border-b border-slate-800 w-full py-3 px-6 flex items-center justify-center space-x-4 shadow-md z-40 relative">
            <span className="text-slate-400 font-bold uppercase tracking-widest text-xs mr-2">
                View Portal As:
            </span>

            {roles.includes("admin") && (
                <button
                    onClick={() => router.push("/dashboard/admin")}
                    className={`px-5 py-2 rounded font-bold uppercase tracking-wide text-xs transition-colors ${
                        currentView === "admin"
                            ? "bg-[#c59f27] text-slate-900"
                            : "bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white"
                    }`}
                >
                    Boss / Admin
                </button>
            )}

            {roles.includes("worker") && (
                <button
                    onClick={() => router.push("/dashboard/worker")}
                    className={`px-5 py-2 rounded font-bold uppercase tracking-wide text-xs transition-colors ${
                        currentView === "worker"
                            ? "bg-[#c59f27] text-slate-900"
                            : "bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white"
                    }`}
                >
                    Maintenance Worker
                </button>
            )}

            {roles.includes("resident") && (
                <button
                    onClick={() => router.push("/dashboard/resident")}
                    className={`px-5 py-2 rounded font-bold uppercase tracking-wide text-xs transition-colors ${
                        currentView === "resident"
                            ? "bg-[#c59f27] text-slate-900"
                            : "bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white"
                    }`}
                >
                    Resident
                </button>
            )}
        </div>
    );
}