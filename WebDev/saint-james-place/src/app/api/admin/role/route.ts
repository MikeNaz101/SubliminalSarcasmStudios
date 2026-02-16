import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// 1. GET: Fetch all users (for your UserApprovalList)
export async function GET(request: Request) {
    try {
        const client = await clientPromise;
        const db = client.db("StJamesPlResidents");

        // Fetch all users, sorted by newest first (optional)
        // You can filter this to only show "unverified" if you prefer: .find({ role: "unverified" })
        const users = await db
            .collection("users")
            .find({})
            .sort({ _id: -1 })
            .toArray();

        return NextResponse.json(users);
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch users" },
            { status: 500 }
        );
    }
}

// 2. PUT: Update a user's role (Your existing logic)
export async function PUT(request: Request) {
    try {
        const { userId, newRole } = await request.json();

        // Validate input
        // Note: You might want to add "unverified" to this list if you ever need to demote someone back
        if (!userId || !["resident", "worker", "banned", "unverified"].includes(newRole)) {
            return NextResponse.json({ error: "Invalid data" }, { status: 400 });
        }

        const client = await clientPromise;
        const db = client.db("StJamesPlResidents");

        // Update the user
        const result = await db.collection("users").updateOne(
            { _id: new ObjectId(userId) },
            { $set: { role: newRole } }
        );

        return NextResponse.json({ success: true, result });
    } catch (error) {
        return NextResponse.json({ error: "Update failed" }, { status: 500 });
    }
}