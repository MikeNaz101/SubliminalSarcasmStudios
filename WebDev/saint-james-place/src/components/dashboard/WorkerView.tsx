"use client"; // Make this client-side so it plays nice with the list
import UserApprovalList from "./UserApprovalList";

interface WorkerProfile {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: string;
    _id?: string;
}

export default function WorkerView({ user }: { user: WorkerProfile }) {
    return (
        <div className="space-y-8 p-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-serif text-slate-900">Admin Dashboard</h1>
                    <p className="text-slate-500 font-medium">Welcome back, {user?.name || "Admin"}</p>
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
                    <span className="text-sm font-bold text-slate-600 uppercase tracking-tighter">System Live</span>
                </div>
            </div>

            {/* Stats Overview (Static for now) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Active Staff</h3>
                    <p className="text-4xl font-black text-slate-900">1</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Active Tickets</h3>
                    <p className="text-4xl font-black text-slate-900">0</p>
                </div>
                <div className="bg-slate-900 p-6 rounded-2xl shadow-lg">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 text-slate-500">Quick Link</h3>
                    <button className="text-white font-bold underline decoration-gold-500 underline-offset-4 hover:text-gold-500 transition-colors">
                        Post News →
                    </button>
                </div>
            </div>

            {/* Approval List Component handles its own fetching now */}
            <UserApprovalList />
        </div>
    );
}