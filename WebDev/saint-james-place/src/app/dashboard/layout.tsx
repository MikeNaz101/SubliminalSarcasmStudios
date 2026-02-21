import "@/app/globals.css"; // Ensure styles are loaded
import { ReactNode } from "react";
import RoleSwitcher from "@/components/RoleSwitcher";

export default function DashboardLayout({ children }: { children: ReactNode }) {
    return (
        <section className="min-h-screen bg-gray-50 flex flex-col">
            {/* The Switcher goes at the very top, outside the main content block */}
            <RoleSwitcher />

            {/* NOTE: No Sidebar or Navbar here!
                Those belong in the specific sub-folders.
            */}
            <main className="flex-grow w-full">
                {children}
            </main>
        </section>
    );
}