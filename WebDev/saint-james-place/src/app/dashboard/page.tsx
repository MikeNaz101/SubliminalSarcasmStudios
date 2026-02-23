export const dynamic = "force-dynamic";

import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function DashboardRouter() {
    // 1. Get the session
    const session = await getServerSession(authOptions);

    // 2. Security Check
    if (!session || !session.user) {
        console.log("❌ No session, redirecting to Sign In");
        redirect("/auth/signin");
    }

    // 3. Grab the new ROLES array (with a TypeScript safety fallback)
    const roles = (session.user as { roles?: string[] }).roles || [];

    // 4. DEBUG LOG (Look for this in your VS Code Terminal)
    console.log("------------------------------------------------");
    console.log("🚦 DASHBOARD ROUTER HIT");
    console.log("👤 User Email:", session.user.email);
    console.log("🎭 Detected Roles:", roles);
    console.log("------------------------------------------------");

    // 5. Traffic Control - Hierarchy Check
    if (roles.includes("banned")) {
        console.log("⛔ Account Banned");
        redirect("/auth/error?error=AccessDenied");
    } else if (roles.includes("admin")) {
        console.log("✅ Redirecting to ADMIN");
        redirect("/dashboard/admin");
    } else if (roles.includes("worker")) {
        console.log("✅ Redirecting to WORKER");
        redirect("/dashboard/worker");
    } else if (roles.includes("resident")) {
        console.log("✅ Redirecting to RESIDENT");
        redirect("/dashboard/resident");
    } else {
        console.log("⏳ Role is unverified/unknown. Redirecting to PENDING");
        redirect("/dashboard/pending");
    }
}