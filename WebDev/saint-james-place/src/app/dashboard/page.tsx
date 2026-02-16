export const dynamic = "force-dynamic";

import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function DashboardRouter() {
    // 1. Get the session
    const session = await getServerSession(authOptions);

    // 2. DEBUG LOG (Look for this in your VS Code Terminal)
    console.log("------------------------------------------------");
    console.log("🚦 DASHBOARD ROUTER HIT");
    console.log("👤 User Email:", session?.user?.email);
    console.log("🎭 Detected Role:", session?.user?.role);
    console.log("------------------------------------------------");

    // 3. Security Check
    if (!session) {
        console.log("❌ No session, redirecting to Sign In");
        redirect("/auth/signin");
    }

    const role = session.user.role;

    // 4. Traffic Control
    switch (role) {
        case "admin":
            console.log("✅ Redirecting to ADMIN");
            redirect("/dashboard/admin");
            break; // Not reachable due to redirect, but good practice
        case "resident":
            console.log("✅ Redirecting to RESIDENT");
            redirect("/dashboard/resident");
            break;
        case "worker":
            console.log("✅ Redirecting to WORKER");
            redirect("/dashboard/worker");
            break;
        case "banned":
            console.log("⛔ Account Banned");
            redirect("/auth/error?error=AccessDenied");
            break;
        default:
            console.log("⏳ Role is unverified/unknown. Redirecting to PENDING");
            redirect("/dashboard/pending");
    }

    // 5. Fallback (This should NEVER render if redirects work)
    return (
        <div className="p-10 text-red-600 font-bold">
            ERROR: The Router failed to redirect you!
            <br />
            Detected Role: {role || "None"}
        </div>
    );
}