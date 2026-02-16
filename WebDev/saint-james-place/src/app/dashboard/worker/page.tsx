import WorkerView from "@/components/dashboard/WorkerView";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function WorkerPage() {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        redirect("/auth/signin");
    }

    return (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        <WorkerView user={session.user as any} />
    );
}