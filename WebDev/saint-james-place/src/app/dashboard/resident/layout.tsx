import { ReactNode } from "react";
// IMPORT YOUR NAVBAR/SIDEBAR COMPONENTS HERE
import Navbar from "@/components/Navbar";
// import Sidebar from "@/components/Sidebar";

export default function ResidentLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex flex-col min-h-screen">
            {/* This Navbar will ONLY show for residents now */}
            <Navbar />
            <main className="flex-grow p-6">
                {children}
            </main>
        </div>
    );
}