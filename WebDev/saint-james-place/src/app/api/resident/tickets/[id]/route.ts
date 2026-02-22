import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { ObjectId, UpdateFilter } from "mongodb";

// Define our Ticket shape for TypeScript
interface Ticket {
    messages?: {
        sender: string;
        role: string;
        text: string;
        timestamp: string;
    }[];
}

export const dynamic = "force-dynamic";

// GET: Fetch the specific ticket
export async function GET(req: Request, { params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const client = await clientPromise;
        const db = client.db("StJamesPlResidents");

        // Find the specific ticket AND ensure it belongs to this user
        const ticket = await db.collection("maintenance_tickets").findOne({
            _id: new ObjectId(params.id),
            $or: [
                { email: session.user.email },
                { userEmail: session.user.email }
            ]
        });

        if (!ticket) return NextResponse.json({ error: "Ticket not found" }, { status: 404 });

        return NextResponse.json({ success: true, ticket });
    } catch (error) {
        console.error("Failed to fetch ticket details:", error);
        return NextResponse.json({ error: "Database error" }, { status: 500 });
    }
}

// PUT: Add a new message from the resident
export async function PUT(req: Request, { params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const { message } = await req.json();
        const client = await clientPromise;
        const db = client.db("StJamesPlResidents");

        const updateDoc: UpdateFilter<Ticket> = {
            $push: {
                messages: {
                    sender: session.user.name?.split(" ")[0] || "Resident",
                    role: "resident",
                    text: message,
                    timestamp: new Date().toISOString()
                }
            }
        };

        // Update the ticket, strictly ensuring it belongs to the logged-in resident
        const result = await db.collection<Ticket>("maintenance_tickets").updateOne(
            {
                _id: new ObjectId(params.id),
                $or: [
                    { email: session.user.email },
                    { userEmail: session.user.email }
                ]
            },
            updateDoc
        );

        if (result.modifiedCount === 0) {
            return NextResponse.json({ error: "Could not update ticket" }, { status: 400 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Failed to send message:", error);
        return NextResponse.json({ error: "Update failed" }, { status: 500 });
    }
}