"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function NewTicketPage() {
    const router = useRouter();
    const { data: session } = useSession();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);

        const payload = {
            unitNumber: formData.get("unitNumber"),
            category: formData.get("category"),
            urgency: formData.get("urgency"),
            description: formData.get("description"),
        };

        try {
            const res = await fetch("/api/maintenance", {
                method: "POST",
                body: JSON.stringify(payload),
                headers: { "Content-Type": "application/json" },
            });

            const data = await res.json();

            if (res.ok && data.success) {
                alert("Success! Maintenance has been notified.");
                router.push("/dashboard/resident");
            } else {
                alert("Error: " + (data.message || "Failed to submit ticket."));
            }
        } catch (error) {
            console.error("Submission error:", error);
            alert("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto py-10 px-4">
            <div className="mb-8">
                <h1 className="text-3xl font-serif font-bold text-slate-900">New Request</h1>
                <p className="text-slate-500 mt-2">Submit a maintenance ticket. For emergencies, please call the office immediately.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-2xl shadow-sm border border-slate-200">

                {/* Unit Number */}
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Unit Number</label>
                    <input
                        name="unitNumber"
                        type="text"
                        placeholder="e.g. 4B"
                        // ADDED: text-slate-900 placeholder-slate-400
                        className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 outline-none text-slate-900 placeholder-slate-400"
                        required
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Category */}
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Issue Category</label>
                        <select
                            name="category"
                            // ADDED: text-slate-900
                            className="w-full p-3 border border-slate-300 rounded-lg bg-white text-slate-900 outline-none focus:ring-2 focus:ring-slate-900"
                            required
                        >
                            <option value="Plumbing">Plumbing</option>
                            <option value="Electrical">Electrical</option>
                            <option value="Appliance">Appliance</option>
                            <option value="HVAC">Heating/AC</option>
                            <option value="Structural">Structural (Doors/Windows)</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    {/* Urgency */}
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Urgency</label>
                        <select
                            name="urgency"
                            // ADDED: text-slate-900
                            className="w-full p-3 border border-slate-300 rounded-lg bg-white text-slate-900 outline-none focus:ring-2 focus:ring-slate-900"
                            required
                        >
                            <option value="Low - Cosmetic">Low (Cosmetic/Minor)</option>
                            <option value="Normal - Standard">Normal (Affects daily use)</option>
                            <option value="High - Emergency">High (Urgent/Safety Issue)</option>
                        </select>
                    </div>
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Description</label>
                    <textarea
                        name="description"
                        rows={5}
                        // ADDED: text-slate-900 placeholder-slate-400
                        className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 outline-none text-slate-900 placeholder-slate-400"
                        placeholder="Please describe the issue in detail..."
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-slate-800 transition-all disabled:opacity-50 flex justify-center items-center"
                >
                    {loading ? "Sending..." : "Submit Ticket"}
                </button>
            </form>
        </div>
    );
}