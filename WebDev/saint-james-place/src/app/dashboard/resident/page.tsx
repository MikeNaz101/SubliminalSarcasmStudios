import ResidentView from "@/components/dashboard/ResidentView";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function ResidentPage() {
    const session = await getServerSession(authOptions);

    // Guard Clause: Ensure the user is logged in
    if (!session || !session.user) {
        redirect("/auth/signin");
    }

    return (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        <ResidentView user={session.user as any} />
    );
}