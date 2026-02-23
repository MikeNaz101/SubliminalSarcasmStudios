import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// Force Next.js to always fetch fresh data (no caching ghosts!)
export const dynamic = "force-dynamic";

export async function GET() {
    const session = await getServerSession(authOptions);

    // If they aren't logged in, kick them out
    if (!session || !session.user || !session.user.email) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // ESLint-friendly role check
    const roles = (session.user as { roles?: string[] })?.roles || [];

    // Security Check: Ensure they actually have the resident role
    if (!roles.includes("resident")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    try {
        const client = await clientPromise;
        const db = client.db();

        // Fetch tickets belonging ONLY to this logged-in resident.
        // We use $or to check a couple of common field names just in case
        // your submission form saved it as 'email' instead of 'userEmail'.
        const tickets = await db.collection("maintenance_tickets")
            .find({
                $or: [
                    { email: session.user.email },
                    { userEmail: session.user.email }
                ]
            })
            .sort({ createdAt: -1 }) // Newest tickets at the top
            .toArray();

        return NextResponse.json({ success: true, tickets });
    } catch (error) {
        console.error("Failed to fetch resident tickets:", error);
        return NextResponse.json({ error: "Database error" }, { status: 500 });
    }
}