"use client";
import Link from "next/link";

interface User {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    unitNumber?: string; // We can add this to the type now
}

export default function ResidentView({ user }: { user: User }) {
    // Mock data for now - later we will fetch this from MongoDB
    const announcements = [
        { id: 1, title: "Pool Opening Date", date: "May 15", content: "The community pool will officially open for the summer season next weekend!" },
        { id: 2, title: "Recycling Pickup", date: "Weekly", content: "Reminder: Cardboard boxes must be flattened before placing them in the recycling bins." },
    ];

    return (
        <div className="p-6 space-y-8 max-w-7xl mx-auto">

            {/* 1. HERO SECTION */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-serif font-bold text-slate-900">
                        Welcome home, {user.name?.split(" ")[0] || "Neighbor"}.
                    </h1>
                    <p className="text-slate-500">
                        Unit {user.unitNumber || "4B"} • Saint James Place
                    </p>
                </div>
                <div className="bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-bold text-slate-600">Leasing Office Open</span>
                </div>
            </div>

            {/* 2. QUICK ACTIONS GRID */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {/* Maintenance Request */}
                <Link
                    href="/dashboard/resident/maintenance/new"
                    className="group bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-gold-400 transition-all flex flex-col items-center text-center gap-3"
                >
                    <div className="w-12 h-12 bg-red-50 text-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    </div>
                    <span className="font-bold text-slate-800">Fix Something</span>
                </Link>

                {/* Pay Rent (External Link usually) */}
                <a
                    href="https://www.apartments.com/" // Replace with your actual payment portal later
                    target="_blank"
                    rel="noreferrer"
                    className="group bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-green-400 transition-all flex flex-col items-center text-center gap-3"
                >
                    <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    <span className="font-bold text-slate-800">Pay Rent</span>
                </a>

                {/* Amenities */}
                <Link
                    href="/amenities"
                    className="group bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-400 transition-all flex flex-col items-center text-center gap-3"
                >
                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    <span className="font-bold text-slate-800">Amenities</span>
                </Link>

                {/* Contact Management */}
                <Link
                    href="/contact"
                    className="group bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-purple-400 transition-all flex flex-col items-center text-center gap-3"
                >
                    <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                    </div>
                    <span className="font-bold text-slate-800">Contact Us</span>
                </Link>
            </div>

            {/* 3. DASHBOARD CONTENT GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left Column: Announcements */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-slate-800">Community Board</h2>
                        <button className="text-sm text-gold-600 font-bold hover:underline">View All</button>
                    </div>

                    <div className="bg-white rounded-2xl border border-slate-200 divide-y divide-slate-100 overflow-hidden shadow-sm">
                        {announcements.map((item) => (
                            <div key={item.id} className="p-6 hover:bg-slate-50 transition-colors">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-bold text-slate-900">{item.title}</h3>
                                    <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded-full">{item.date}</span>
                                </div>
                                <p className="text-slate-600 text-sm leading-relaxed">{item.content}</p>
                            </div>
                        ))}
                        <div className="p-4 text-center bg-slate-50">
                            <p className="text-xs text-slate-400">Showing recent updates from Property Management</p>
                        </div>
                    </div>

                    {/* Recent Activity / Package Widget could go here */}
                    <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-6 text-white shadow-lg">
                        <h3 className="font-bold text-lg mb-2">Package Locker</h3>
                        <p className="text-slate-300 text-sm mb-4">You have 0 pending deliveries.</p>
                        <button className="w-full bg-white/10 hover:bg-white/20 py-2 rounded-lg text-sm font-bold transition-colors">
                            View Access Code
                        </button>
                    </div>
                </div>

                {/* Right Column: Info & Utility */}
                <div className="space-y-6">

                    {/* Simple Weather/Time Widget */}
                    <div className="bg-blue-500 rounded-2xl p-6 text-white shadow-md relative overflow-hidden">
                        <div className="relative z-10">
                            <h3 className="font-bold text-2xl">72°F</h3>
                            <p className="text-blue-100 font-medium">Partly Cloudy</p>
                            <p className="text-xs text-blue-200 mt-4">Saint James Place, NY</p>
                        </div>
                        {/* Decorative Circle */}
                        <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/20 rounded-full blur-xl"></div>
                    </div>

                    {/* Quick Contacts */}
                    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                        <h3 className="font-bold text-slate-800 mb-4">Important Numbers</h3>
                        <ul className="space-y-3 text-sm">
                            <li className="flex justify-between">
                                <span className="text-slate-500">Leasing Office</span>
                                <span className="font-bold text-slate-900">518-555-0101</span>
                            </li>
                            <li className="flex justify-between">
                                <span className="text-slate-500">Maintenance Emergency</span>
                                <span className="font-bold text-red-600">518-555-9111</span>
                            </li>
                            <li className="flex justify-between">
                                <span className="text-slate-500">Security</span>
                                <span className="font-bold text-slate-900">518-555-0102</span>
                            </li>
                        </ul>
                    </div>

                    {/* Map Link (Leading to your Landmarks component) */}
                    <Link href="/neighborhood" className="block relative group rounded-2xl overflow-hidden shadow-sm h-40">
                        {/* Background Image Placeholder - Replaces with actual map image if you have one */}
                        <div className="absolute inset-0 bg-slate-300 group-hover:scale-105 transition-transform duration-700"></div>
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors"></div>
                        <div className="absolute bottom-4 left-4 text-white">
                            <p className="text-xs font-bold uppercase tracking-wider text-gold-400">Explore</p>
                            <h3 className="font-bold text-lg">Neighborhood Map</h3>
                        </div>
                    </Link>

                </div>
            </div>
        </div>
    );
}