import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { ObjectId } from "mongodb";

// GET: Fetch all users for the admin dashboard
export async function GET() {
    const session = await getServerSession(authOptions);

    // FIXED: Replaced 'any' with an explicit type structure
    const roles = (session?.user as { roles?: string[] })?.roles || [];

    // Security Check: Only admins can fetch the user list
    if (!roles.includes("admin")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    try {
        const client = await clientPromise;
        const db = client.db("StJamesPlResidents");

        // Fetch users, but only grab the data we need to keep it fast
        const users = await db.collection("users")
            .find({})
            .project({ name: 1, email: 1, roles: 1 })
            .toArray();

        return NextResponse.json({ success: true, users });
    } catch (error) {
        console.error("Failed to fetch users:", error);
        return NextResponse.json({ error: "Database error" }, { status: 500 });
    }
}

// PUT: Update a user's roles
export async function PUT(req: Request) {
    const session = await getServerSession(authOptions);

    // FIXED: Replaced 'any' with an explicit type structure here too
    const adminRoles = (session?.user as { roles?: string[] })?.roles || [];

    if (!adminRoles.includes("admin")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    try {
        const { userId, newRoles } = await req.json();
        const client = await clientPromise;
        const db = client.db("StJamesPlResidents");

        await db.collection("users").updateOne(
            { _id: new ObjectId(userId) },
            { $set: { roles: newRoles } }
        );

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Failed to update user roles:", error);
        return NextResponse.json({ error: "Update failed" }, { status: 500 });
    }
}