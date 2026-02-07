"use client";
import { useState } from 'react';
import Navbar from '@/components/Navbar';

export default function ResidentDashboard() {
    const [status, setStatus] = useState("");

    const communityPosts = [
        {
            id: 1,
            title: "Fresh Honey Available!",
            content: "I've started harvesting honey from our on-site hives. If you'd like a jar, stop by the office!",
            date: "Feb 7, 2026",
            tag: "Social"
        },
        {
            id: 2,
            title: "Trash Pick-up Delay",
            content: "Due to the storm, trash pick-up is moved to Friday this week. Please keep bins secured.",
            date: "Feb 6, 2026",
            tag: "Notice"
        }
    ];

    const handleMaintenanceSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus("Sending...");

        const formData = new FormData(e.currentTarget);
        const payload = {
            unitNumber: formData.get("unitNumber"),
            category: formData.get("category"),
            urgency: formData.get("urgency"),
            description: formData.get("description"),
        };

        const res = await fetch("/api/maintenance", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        if (res.ok) {
            setStatus("Ticket Submitted Successfully!");
            (e.target as HTMLFormElement).reset();
            setTimeout(() => setStatus(""), 5000);
        } else {
            setStatus("Error. Please call the office.");
        }
    };

    return (
        <main className="min-h-screen bg-slate-100 pb-20">
            <div className="bg-slate-900 h-20 shadow-xl">
                <Navbar />
            </div>

            <div className="container mx-auto px-6 py-12">
                <header className="mb-12">
                    <h1 className="text-4xl font-serif font-bold text-slate-900">Resident Portal</h1>
                    <p className="text-slate-700 mt-2 font-bold uppercase tracking-wider text-sm">Saint James Place | Queensbury, NY</p>
                </header>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* MAINTENANCE FORM */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-200">
                            <h2 className="text-2xl font-serif mb-6 text-slate-900 font-bold border-b pb-4">Submit Maintenance Request</h2>

                            <form onSubmit={handleMaintenanceSubmit} className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-black text-slate-900 mb-2 uppercase tracking-tighter">Unit Number</label>
                                    <input name="unitNumber" required type="text" placeholder="e.g. 12A"
                                           className="w-full p-3 bg-white border-2 border-slate-300 rounded text-slate-900 placeholder:text-slate-400 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-all font-bold" />
                                </div>
                                <div>
                                    <label className="block text-sm font-black text-slate-900 mb-2 uppercase tracking-tighter">Issue Category</label>
                                    <select name="category"
                                            className="w-full p-3 bg-white border-2 border-slate-300 rounded text-slate-900 font-bold outline-none focus:border-gold-500 transition-all">
                                        <option>Plumbing</option>
                                        <option>Electrical</option>
                                        <option>HVAC / Heat</option>
                                        <option>Appliance Repair</option>
                                        <option>Other</option>
                                    </select>
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-black text-slate-900 mb-2 uppercase tracking-tighter">Urgency Level</label>
                                    <select name="urgency"
                                            className="w-full p-3 bg-white border-2 border-slate-300 rounded text-slate-900 font-bold outline-none focus:border-gold-500 transition-all">
                                        <option>Low (Routine)</option>
                                        <option>Medium (Next 24 Hours)</option>
                                        <option>High (Emergency - Water/Heat)</option>
                                    </select>
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-black text-slate-900 mb-2 uppercase tracking-tighter">Description of Issue</label>
                                    <textarea name="description" rows={4} required
                                              className="w-full p-3 bg-white border-2 border-slate-300 rounded text-slate-900 placeholder:text-slate-400 font-bold outline-none focus:border-gold-500 transition-all"
                                              placeholder="Please provide details..."></textarea>
                                </div>
                                <div className="md:col-span-2">
                                    <button type="submit" disabled={status === "Sending..."}
                                            className="w-full py-4 bg-slate-900 text-white font-black tracking-widest hover:bg-gold-600 disabled:opacity-50 transition-all uppercase text-lg shadow-md">
                                        {status || "Submit Ticket"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Community Notice - Fixed for High Contrast */}
                    <div className="bg-gold-500 p-8 rounded-xl shadow-xl border-b-4 border-gold-600">
                        <h3 className="text-xl font-serif font-black mb-4 border-b border-black/20 pb-2 text-slate-900">
                            Current Notice
                        </h3>
                        <p className="text-sm font-black leading-relaxed mb-4 text-slate-900">
                            <strong>Snow Removal:</strong> Plowing will begin at 8:00 AM tomorrow. Please move vehicles to the overflow lot if possible.
                        </p>
                        <div className="text-[11px] uppercase tracking-widest font-black pt-4 border-t border-black/10 text-slate-800">
                            Posted: Feb 7, 2026
                        </div>

                        <div className="bg-white p-8 rounded-xl shadow-lg border-2 border-slate-900">
                            <h3 className="font-black text-slate-900 mb-2 uppercase tracking-widest text-xs">After-Hours Emergency</h3>
                            <p className="text-3xl font-serif text-slate-900 font-bold mb-4 tracking-tighter">(518) 555-0911</p>
                            <p className="text-xs text-slate-700 font-bold italic leading-snug">Dial 911 for life-threatening emergencies.</p>
                        </div>
                    </div>
                </div>

                {/* BULLETIN */}
                <div className="mt-12 bg-white p-8 rounded-xl shadow-lg border border-slate-200">
                    <h2 className="text-2xl font-serif mb-8 text-slate-900 font-bold border-b-2 border-gold-500 inline-block pb-1">Community Bulletin</h2>
                    <div className="space-y-8 mt-6">
                        {communityPosts.map(post => (
                            <div key={post.id} className="border-l-8 border-gold-500 pl-6 py-2 bg-slate-50 rounded-r-lg">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-xl font-black text-slate-900 leading-tight">{post.title}</h3>
                                    <span className="text-xs font-black text-white bg-slate-900 px-3 py-1 rounded uppercase tracking-tighter">
                                        {post.tag}
                                    </span>
                                </div>
                                <p className="text-slate-800 text-sm font-bold leading-relaxed">{post.content}</p>
                                <div className="text-xs text-slate-500 mt-3 font-black uppercase tracking-widest">{post.date}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}