import { ReactNode } from "react";
import Navbar from "@/components/Navbar"; // Or a specific WorkerNavbar

export default function WorkerLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="bg-blue-50 p-2 text-center text-sm border-b border-blue-200">
                Worker Portal Mode
            </div>
            <main className="flex-grow p-6">
                {children}
            </main>
        </div>
    );
}