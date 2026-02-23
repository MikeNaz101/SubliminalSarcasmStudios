import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { ObjectId } from "mongodb";

// Force Next.js to always fetch fresh data
export const dynamic = "force-dynamic";

// GET: Fetch ALL tickets for the worker board
export async function GET() {
    const session = await getServerSession(authOptions);

    // Security check: Ensure they actually have the worker role
    const roles = (session?.user as { roles?: string[] })?.roles || [];
    if (!roles.includes("worker")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    try {
        const client = await clientPromise;
        const db = client.db(); // Connect to the default database

        // Fetch all tickets from everyone, newest first
        const tickets = await db.collection("maintenance_tickets")
            .find({})
            .sort({ createdAt: -1 })
            .toArray();

        return NextResponse.json({ success: true, tickets });
    } catch (error) {
        console.error("Failed to fetch worker tickets:", error);
        return NextResponse.json({ error: "Database error" }, { status: 500 });
    }
}

// PUT: Update ticket status or add a chat message
export async function PUT(req: Request) {
    const session = await getServerSession(authOptions);

    // Security check
    const roles = (session?.user as { roles?: string[] })?.roles || [];
    if (!roles.includes("worker")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    try {
        const { ticketId, status, message } = await req.json();
        const client = await clientPromise;
        const db = client.db();

        // Create an update object dynamically based on what was sent
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const updateDoc: any = {};

        if (status) {
            updateDoc.$set = { status };
        }

        if (message) {
            updateDoc.$push = {
                messages: {
                    sender: session?.user?.name?.split(" ")[0] || "Maintenance",
                    role: "worker",
                    text: message,
                    timestamp: new Date().toISOString()
                }
            };
        }

        // Apply the update to the specific ticket
        await db.collection("maintenance_tickets").updateOne(
            { _id: new ObjectId(ticketId) },
            updateDoc
        );

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Failed to update ticket:", error);
        return NextResponse.json({ error: "Update failed" }, { status: 500 });
    }
}