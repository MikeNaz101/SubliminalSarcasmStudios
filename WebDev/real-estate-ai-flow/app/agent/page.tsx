"use client";

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

interface Lead {
    id: string;
    name: string;
    phone: string;
    email: string;
    lead_type: string;
    status: string;
}

interface AgentTask {
    id: string;
    task_title: string;
    status: 'pending' | 'completed';
    scheduled_trigger_time: string;
    leads?: {
        name: string;
        phone: string;
    };
}

// --- NEW: Interface for the BPO Data ---
interface BpoReport {
    subject_address: string;
    target_price: number;
    ai_commentary: string;
    comps_data: { address: string; soldPrice: number; beds: number; baths: number; sqft: number; distance: string; }[];
}

export default function AgentDashboard() {
    const [tasks, setTasks] = useState<AgentTask[]>([]);
    const [leads, setLeads] = useState<Lead[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // --- NEW: State for the BPO Generator ---
    const [bpoAddress, setBpoAddress] = useState('');
    const [isGeneratingBPO, setIsGeneratingBPO] = useState(false);
    const [bpoResult, setBpoResult] = useState<BpoReport | null>(null);

    useEffect(() => {
        const fetchDashboardData = async () => {
            const { data: leadsData } = await supabase
                .from('leads')
                .select('*')
                .order('created_at', { ascending: false });

            if (leadsData) setLeads(leadsData);

            const { data: tasksData } = await supabase
                .from('tasks')
                .select('*, leads(name, phone)')
                .eq('assignee_type', 'agent')
                .order('scheduled_trigger_time', { ascending: true });

            if (tasksData) setTasks(tasksData as AgentTask[]);

            setIsLoading(false);
        };

        fetchDashboardData();

        const subscription = supabase
            .channel('agent_dashboard')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'tasks', filter: "assignee_type=eq.agent" }, () => {
                fetchDashboardData();
            })
            .subscribe();

        return () => {
            supabase.removeChannel(subscription);
        };
    }, []);

    const markTaskComplete = async (taskId: string) => {
        await supabase.from('tasks').update({ status: 'completed' }).eq('id', taskId);
    };

    // --- NEW: Function to trigger the AI BPO Route ---
    const handleGenerateBPO = async () => {
        if (!bpoAddress.trim()) return;

        setIsGeneratingBPO(true);
        setBpoResult(null); // Clear previous results

        try {
            const response = await fetch('/api/bpo', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ subjectAddress: bpoAddress }),
            });

            const data = await response.json();

            if (data.success) {
                setBpoResult(data.report);
            } else {
                console.error("BPO Generation failed:", data.error);
                alert("Failed to generate BPO. Please try again.");
            }
        } catch (error) {
            console.error("Error calling BPO API:", error);
        } finally {
            setIsGeneratingBPO(false);
            setBpoAddress('');
        }
    };

    if (isLoading) return <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-500">Loading Agent Portal...</div>;

    return (
        <div className="min-h-screen bg-slate-50 font-sans pb-12">
            <header className="bg-slate-900 text-white p-4 shadow-md">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <h1 className="text-2xl font-bold tracking-tight">HomeJourney <span className="text-blue-400">Agent Portal</span></h1>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-slate-400">Welcome, Agent</span>
                        <div className="w-8 h-8 bg-blue-500 rounded-full border-2 border-white"></div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">

                {/* LEFT COLUMN: Agent Action Items */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                        <div className="border-b border-slate-200 bg-slate-50 p-5">
                            <h2 className="text-lg font-bold text-slate-800">My Action Items</h2>
                            <p className="text-sm text-slate-500 mt-1">AI-generated follow-ups and timeline triggers.</p>
                        </div>

                        <div className="p-5 divide-y divide-slate-100">
                            {tasks.filter(t => t.status === 'pending').length === 0 ? (
                                <p className="text-slate-500 text-center py-8">No pending tasks! You are all caught up.</p>
                            ) : (
                                tasks.filter(t => t.status === 'pending').map((task) => (
                                    <div key={task.id} className="py-4 flex items-start justify-between group">
                                        <div className="flex gap-4">
                                            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shrink-0 mt-1">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-slate-800 text-lg">{task.task_title}</h3>
                                                <p className="text-sm text-slate-600 mt-1">
                                                    <span className="font-medium text-slate-800">{task.leads?.name || 'Unknown Lead'}</span> • {task.leads?.phone || 'No phone'}
                                                </p>
                                                <p className="text-xs font-bold text-orange-500 mt-2 bg-orange-50 inline-block px-2 py-1 rounded">
                                                    Scheduled for: {new Date(task.scheduled_trigger_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => markTaskComplete(task.id)}
                                            className="opacity-0 group-hover:opacity-100 transition-opacity bg-green-50 hover:bg-green-100 text-green-700 font-semibold py-2 px-4 rounded-lg text-sm border border-green-200"
                                        >
                                            Mark Done
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* --- NEW: The AI Appraiser (BPO) Section --- */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                        <div className="border-b border-slate-200 bg-slate-900 p-5 flex justify-between items-center">
                            <div>
                                <h2 className="text-lg font-bold text-white">AI Appraiser (BPO Generator)</h2>
                                <p className="text-sm text-slate-400 mt-1">Instantly pull comps and generate Fair Housing compliant commentary.</p>
                            </div>
                            <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                        </div>

                        <div className="p-6">
                            <div className="flex gap-4">
                                <input
                                    type="text"
                                    value={bpoAddress}
                                    onChange={(e) => setBpoAddress(e.target.value)}
                                    placeholder="Enter Subject Property Address..."
                                    className="flex-grow border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 text-slate-800"
                                    disabled={isGeneratingBPO}
                                />
                                <button
                                    onClick={handleGenerateBPO}
                                    disabled={isGeneratingBPO || !bpoAddress.trim()}
                                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center whitespace-nowrap"
                                >
                                    {isGeneratingBPO ? (
                                        <><span className="animate-spin mr-2">⏳</span> Analyzing...</>
                                    ) : (
                                        'Generate BPO'
                                    )}
                                </button>
                            </div>

                            {/* BPO Result Display */}
                            {bpoResult && (
                                <div className="mt-8 border-t border-slate-200 pt-6 animate-in fade-in duration-500">
                                    <div className="flex items-center justify-between mb-6">
                                        <div>
                                            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Estimated Value</h3>
                                            <p className="text-4xl font-black text-slate-900">${bpoResult.target_price.toLocaleString()}</p>
                                        </div>
                                        <div className="text-right">
                                            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Subject Property</h3>
                                            <p className="text-lg font-semibold text-blue-600">{bpoResult.subject_address}</p>
                                        </div>
                                    </div>

                                    <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 mb-6">
                                        <h4 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                                            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                            Fair Housing Compliant Commentary
                                        </h4>
                                        <p className="text-slate-700 whitespace-pre-line text-sm leading-relaxed">
                                            {bpoResult.ai_commentary}
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="font-bold text-slate-800 mb-3 text-sm uppercase tracking-wider">Comparables Used</h4>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            {bpoResult.comps_data.map((comp, idx) => (
                                                <div key={idx} className="bg-white border border-slate-200 p-4 rounded-lg shadow-sm">
                                                    <p className="font-bold text-lg text-slate-800">${comp.soldPrice.toLocaleString()}</p>
                                                    <p className="text-xs font-semibold text-blue-600 mb-2">{comp.beds} Beds • {comp.baths} Baths • {comp.sqft} sqft</p>
                                                    <p className="text-xs text-slate-600 truncate">{comp.address}</p>
                                                    <p className="text-xs text-slate-400 mt-2">{comp.distance} away</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <button className="w-full mt-6 bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-4 rounded-lg transition-colors">
                                        Export Report to PDF
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN: Active Leads Pipeline */}
                <div className="space-y-6">
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                        <div className="border-b border-slate-200 bg-slate-50 p-5">
                            <h2 className="text-lg font-bold text-slate-800">Active Leads</h2>
                        </div>
                        <div className="p-5 space-y-4">
                            {leads.map((lead) => (
                                <div key={lead.id} className="p-4 rounded-xl border border-slate-200 hover:border-blue-300 transition-colors cursor-pointer">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-bold text-slate-800">{lead.name}</h3>
                                        <span className="text-xs font-bold uppercase tracking-wider bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {lead.lead_type}
                    </span>
                                    </div>
                                    <p className="text-sm text-slate-600">{lead.email}</p>
                                    <p className="text-sm text-slate-600">{lead.phone}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </main>
        </div>
    );
}