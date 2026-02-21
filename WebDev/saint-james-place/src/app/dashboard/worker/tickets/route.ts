import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { ObjectId, UpdateFilter } from "mongodb"; // <-- Added UpdateFilter

// We define the shape of the database document so MongoDB knows 'messages' is an array
interface Ticket {
    status?: string;
    messages?: {
        sender: string;
        role: string;
        text: string;
        timestamp: string;
    }[];
}

// GET: Fetch all maintenance tickets
export async function GET() {
    const session = await getServerSession(authOptions);

    const roles = (session?.user as { roles?: string[] })?.roles || [];

    // Security Check: Only workers and admins can view this
    if (!roles.includes("worker") && !roles.includes("admin")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    try {
        const client = await clientPromise;
        const db = client.db("StJamesPlResidents");

        // Fetch all tickets.
        const tickets = await db.collection("maintenance")
            .find({})
            .sort({ createdAt: -1 }) // Newest first
            .toArray();

        return NextResponse.json({ success: true, tickets });
    } catch (error) {
        console.error("Failed to fetch tickets:", error);
        return NextResponse.json({ error: "Database error" }, { status: 500 });
    }
}

// PUT: Update ticket status and/or add a chat message
export async function PUT(req: Request) {
    const session = await getServerSession(authOptions);

    const roles = (session?.user as { roles?: string[] })?.roles || [];

    if (!roles.includes("worker") && !roles.includes("admin")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    try {
        const { ticketId, status, message } = await req.json();
        const client = await clientPromise;
        const db = client.db("StJamesPlResidents");

        // Use MongoDB's official UpdateFilter tied to our Ticket schema
        const updateDoc: UpdateFilter<Ticket> = {};

        // If they are changing the status
        if (status) {
            updateDoc.$set = { status };
        }

        // If they typed a message to the resident
        if (message) {
            updateDoc.$push = {
                messages: {
                    sender: session?.user?.name || "Maintenance Staff",
                    role: "worker",
                    text: message,
                    timestamp: new Date().toISOString()
                }
            };
        }

        // We also pass the <Ticket> type here so the connection knows what to expect
        await db.collection<Ticket>("maintenance").updateOne(
            { _id: new ObjectId(ticketId) },
            updateDoc
        );

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Failed to update ticket:", error);
        return NextResponse.json({ error: "Update failed" }, { status: 500 });
    }
}