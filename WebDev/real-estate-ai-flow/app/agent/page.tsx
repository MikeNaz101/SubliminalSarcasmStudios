"use client";

import React, { useState } from 'react';

// --- Types for our Lead Data ---
interface Lead {
    id: string;
    name: string;
    status: 'New Lead' | 'Pre-Approved' | 'Credit Repair' | 'Touring';
    budget: string;
    wishlist: string;
    lastActive: string;
    transcriptPreview: string;
}

// --- Mock Data: What the AI has collected ---
const mockLeads: Lead[] = [
    {
        id: "L-1042",
        name: "Sarah Jenkins",
        status: "Pre-Approved",
        budget: "$2,400/mo",
        wishlist: "3 Bed Townhouse in Queensbury, NY",
        lastActive: "10 mins ago",
        transcriptPreview: "User: 'I'm interested in the property at 123 Maple St...'"
    },
    {
        id: "L-1043",
        name: "Marcus Thorne",
        status: "New Lead",
        budget: "$450k Max",
        wishlist: "4 Bed, 2 Bath House, Pool",
        lastActive: "2 hours ago",
        transcriptPreview: "AI: 'Have you been pre-approved by a mortgage company yet?'"
    },
    {
        id: "L-1044",
        name: "Elena Rodriguez",
        status: "Credit Repair",
        budget: "$1,800/mo",
        wishlist: "2 Bed Apartment, Pet Friendly",
        lastActive: "Yesterday",
        transcriptPreview: "User: 'My credit score is around 580 right now.'"
    }
];

export default function AgentDashboard() {
    const [activeTab, setActiveTab] = useState('pipeline');

    return (
        <div className="min-h-screen bg-slate-100 flex font-sans">

            {/* --- Sidebar Navigation --- */}
            <aside className="w-64 bg-slate-900 text-white flex flex-col">
                <div className="p-6">
                    <h1 className="text-2xl font-black text-blue-400">HomeJourney</h1>
                    <p className="text-slate-400 text-sm font-semibold tracking-wider mt-1">AGENT PORTAL</p>
                </div>

                <nav className="flex-grow px-4 space-y-2 mt-4">
                    <button
                        onClick={() => setActiveTab('pipeline')}
                        className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${activeTab === 'pipeline' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800'}`}
                    >
                        Lead Pipeline
                    </button>
                    <button
                        onClick={() => setActiveTab('transcripts')}
                        className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${activeTab === 'transcripts' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800'}`}
                    >
                        Chat Transcripts
                    </button>
                    <button
                        onClick={() => setActiveTab('properties')}
                        className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${activeTab === 'properties' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800'}`}
                    >
                        Property Analytics
                    </button>
                </nav>

                <div className="p-6 border-t border-slate-800">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center font-bold text-lg">
                            A
                        </div>
                        <div>
                            <p className="font-semibold text-sm">Agent Desk</p>
                            <p className="text-xs text-slate-400">Online</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* --- Main Content Area --- */}
            <main className="flex-grow p-8">

                {/* Header Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                        <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Active AI Chats</p>
                        <p className="text-3xl font-black text-slate-900">12</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                        <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Pre-Approved Leads</p>
                        <p className="text-3xl font-black text-green-600">4</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                        <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Needs Attention</p>
                        <p className="text-3xl font-black text-amber-500">2</p>
                    </div>
                </div>

                {/* Lead Data Table */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="p-6 border-b border-slate-200 flex justify-between items-center">
                        <h2 className="text-xl font-bold text-slate-900">Recent AI Qualifications</h2>
                        <button className="bg-blue-50 text-blue-600 hover:bg-blue-100 px-4 py-2 rounded-lg font-semibold text-sm transition-colors">
                            Export CSV
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50 text-slate-500 text-sm uppercase tracking-wider">
                            <tr>
                                <th className="px-6 py-4 font-semibold">Lead Name</th>
                                <th className="px-6 py-4 font-semibold">Status</th>
                                <th className="px-6 py-4 font-semibold">Wishlist / Goal</th>
                                <th className="px-6 py-4 font-semibold">Budget</th>
                                <th className="px-6 py-4 font-semibold text-right">Action</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200">
                            {mockLeads.map((lead) => (
                                <tr key={lead.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <p className="font-bold text-slate-900">{lead.name}</p>
                                        <p className="text-xs text-slate-500">Active: {lead.lastActive}</p>
                                    </td>
                                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          lead.status === 'Pre-Approved' ? 'bg-green-100 text-green-700' :
                              lead.status === 'New Lead' ? 'bg-blue-100 text-blue-700' :
                                  'bg-amber-100 text-amber-700'
                      }`}>
                        {lead.status}
                      </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-sm font-medium text-slate-800">{lead.wishlist}</p>
                                        <p className="text-xs text-slate-500 italic mt-1 truncate max-w-xs">"{lead.transcriptPreview}"</p>
                                    </td>
                                    <td className="px-6 py-4 font-semibold text-slate-700">
                                        {lead.budget}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-blue-600 hover:text-blue-800 font-bold text-sm underline">
                                            View Chat
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </main>
        </div>
    );
}