"use client";

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

// Define the shape of your client data
type ClientIntake = {
    id: string;
    name: string;
    email: string;
    status: string;
};

export default function Dashboard() {
    const [clients, setClients] = useState<ClientIntake[]>([]);
    const [selectedClients, setSelectedClients] = useState<ClientIntake[]>([]);
    const [selectedActions, setSelectedActions] = useState<string[]>([]);
    const [isDispatching, setIsDispatching] = useState(false);

    // 1. Fetch clients from Supabase on load
    useEffect(() => {
        const fetchClients = async () => {
            const { data, error } = await supabase
                .from('project_intakes')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) {
                console.error("Error fetching clients:", error);
            } else {
                setClients(data || []);
            }
        };
        fetchClients();
    }, []);

    // 2. Handle Checkbox Toggles
    const toggleClient = (client: ClientIntake) => {
        setSelectedClients(prev =>
            prev.some(c => c.id === client.id)
                ? prev.filter(c => c.id !== client.id)
                : [...prev, client]
        );
    };

    const toggleAction = (action: string) => {
        setSelectedActions(prev =>
            prev.includes(action)
                ? prev.filter(a => a !== action)
                : [...prev, action]
        );
    };

    // 3. Fire the payload to your route.ts API
    const handleDispatch = async () => {
        if (selectedClients.length === 0 || selectedActions.length === 0) {
            alert("Please select at least one client and one action.");
            return;
        }

        setIsDispatching(true);

        try {
            // This is where the frontend talks to your route.ts backend!
            const response = await fetch('/api/admin/dispatch', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    clients: selectedClients,
                    selectedActions: selectedActions
                })
            });

            if (!response.ok) throw new Error("Dispatch failed");

            alert("Transmissions successfully dispatched!");
            setSelectedClients([]);
            setSelectedActions([]);

            // Refresh client list to show updated statuses
            const { data } = await supabase.from('project_intakes').select('*').order('created_at', { ascending: false });
            if (data) setClients(data);

        } catch (error) {
            console.error("Transmission error:", error);
            alert("Error dispatching emails. Check console.");
        } finally {
            setIsDispatching(false);
        }
    };

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Control Panel Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* LEFT COLUMN: Client Selection */}
                <div className="lg:col-span-2 bg-slate-900 rounded-xl border border-slate-800 p-6 shadow-lg">
                    <h2 className="text-xl font-bold text-white mb-4 border-b border-slate-800 pb-2">Client Intakes</h2>
                    <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                        {clients.map(client => (
                            <label key={client.id} className={`flex items-center p-4 rounded-lg cursor-pointer transition-colors border ${selectedClients.some(c => c.id === client.id) ? 'bg-cyan-900/20 border-cyan-500/50' : 'bg-slate-950 border-slate-800 hover:border-slate-700'}`}>
                                <input
                                    type="checkbox"
                                    className="w-5 h-5 rounded border-slate-700 text-cyan-500 focus:ring-cyan-500 bg-slate-900 mr-4"
                                    checked={selectedClients.some(c => c.id === client.id)}
                                    onChange={() => toggleClient(client)}
                                />
                                <div>
                                    <p className="font-bold text-white">{client.name}</p>
                                    <p className="text-sm text-slate-400">{client.email}</p>
                                </div>
                                <div className="ml-auto">
                                    <span className={`px-2 py-1 rounded text-xs font-mono uppercase ${client.status === 'new' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-slate-800 text-slate-400'}`}>
                                        {client.status}
                                    </span>
                                </div>
                            </label>
                        ))}
                    </div>
                </div>

                {/* RIGHT COLUMN: Action Selection & Dispatch */}
                <div className="space-y-6">
                    <div className="bg-slate-900 rounded-xl border border-slate-800 p-6 shadow-lg">
                        <h2 className="text-xl font-bold text-white mb-4 border-b border-slate-800 pb-2">Email Modules</h2>
                        <div className="space-y-3">
                            {[
                                { id: 'greeting', label: 'Standard Greeting' },
                                { id: 'pamphlet', label: 'Engagement Pamphlet Link' },
                                { id: 'scheduler', label: 'Calendly Scheduler Link' },
                                { id: 'thankyou', label: 'Thank You Sign-off' },
                                { id: 'review', label: 'Review Request' }
                            ].map(action => (
                                <label key={action.id} className="flex items-center space-x-3 cursor-pointer p-2 hover:bg-slate-800/50 rounded transition-colors">
                                    <input
                                        type="checkbox"
                                        className="w-5 h-5 rounded border-slate-700 text-cyan-500 focus:ring-cyan-500 bg-slate-900"
                                        checked={selectedActions.includes(action.id)}
                                        onChange={() => toggleAction(action.id)}
                                    />
                                    <span className="text-slate-300 font-medium">{action.label}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Dispatch Execution */}
                    <div className="bg-slate-900 rounded-xl border border-slate-800 p-6 shadow-lg">
                        <button
                            onClick={handleDispatch}
                            disabled={isDispatching || selectedClients.length === 0 || selectedActions.length === 0}
                            className="w-full py-4 rounded-lg font-bold text-lg transition-all shadow-[0_0_15px_rgba(34,211,238,0.2)] disabled:shadow-none disabled:opacity-50 disabled:cursor-not-allowed bg-cyan-500 hover:bg-cyan-400 text-slate-950"
                        >
                            {isDispatching ? 'Transmitting...' : 'DISPATCH EMAILS'}
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}