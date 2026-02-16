import "@/app/globals.css"; // Ensure styles are loaded
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
    return (
        <section className="min-h-screen bg-gray-50">
            {/* NOTE: No Sidebar or Navbar here!
        Those belong in the specific sub-folders.
      */}
            {children}
        </section>
    );
}