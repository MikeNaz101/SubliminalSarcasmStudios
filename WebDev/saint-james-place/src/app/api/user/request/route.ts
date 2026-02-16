import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import clientPromise from "@/lib/mongodb";

export async function POST(request: Request) {
    const session = await getServerSession();

    // Security: Only logged-in users can request a role
    if (!session || !session.user?.email) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { requestedRole, unitNumber } = await request.json();

    const client = await clientPromise;
    const db = client.db("StJamesPlResidents");

    // Update the user's document with their request
    await db.collection("users").updateOne(
        { email: session.user.email },
        {
            $set: {
                status: "requesting",
                requestedRole: requestedRole, // "resident" or "worker"
                unitNumber: unitNumber || "N/A",
                updatedAt: new Date()
            }
        }
    );

    return NextResponse.json({ success: true });
}