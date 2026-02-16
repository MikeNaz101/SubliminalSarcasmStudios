import { redirect } from "next/navigation";

export default function DashboardRoot() {
    // If anyone hits /dashboard directly, just bump them to the nice welcome page
    redirect("/welcome");
}