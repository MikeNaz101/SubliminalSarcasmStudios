"use client";

import { useState, useEffect } from "react";
import { FiCheckSquare, FiSquare, FiSend, FiLoader, FiShield } from "react-icons/fi";
import { supabase } from "@/lib/supabase";

// Define the shape of our database row
type ProjectIntake = {
    id: string;
    created_at: string;
    name: string;
    email: string;
    message: string;
    status: "new" | "contacted";
};

export default function CommanderDashboard() {
    const [clients, setClients] = useState<ProjectIntake[]>([]);
    const [selectedClients, setSelectedClients] = useState<string[]>([]);
    const [selectedActions, setSelectedActions] = useState<string[]>([]);
    const [isDispatching, setIsDispatching] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // 1. Fetch live data from Supabase on load
    useEffect(() => {
        fetchClients();
    }, []);

    const fetchClients = async () => {
        setIsLoading(true);
        const { data, error } = await supabase
            .from("project_intakes")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) {
            console.error("Error fetching clients:", error);
        } else {
            setClients(data || []);
        }
        setIsLoading(false);
    };

    // 2. Handle Client Selection
    const toggleClient = (id: string) => {
        setSelectedClients((prev) =>
            prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
        );
    };

    const toggleAllClients = () => {
        if (selectedClients.length === clients.length) {
            setSelectedClients([]); // Deselect all
        } else {
            setSelectedClients(clients.map((c) => c.id)); // Select all
        }
    };

    // 3. Handle Action Selection
    const toggleAction = (action: string) => {
        setSelectedActions((prev) =>
            prev.includes(action) ? prev.filter((a) => a !== action) : [...prev, action]
        );
    };

    // 4. Fire the Payload to your API
    const handleDispatch = async () => {
        if (selectedClients.length === 0 || selectedActions.length === 0) return;

        setIsDispatching(true);

        // Get the full client objects for the selected IDs to send to the API
        const clientsToContact = clients.filter((c) => selectedClients.includes(c.id));

        try {
            const response = await fetch("/api/admin/dispatch", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    clients: clientsToContact,
                    selectedActions: selectedActions,
                }),
            });

            if (response.ok) {
                // Clear selections and refresh the table to show updated 'contacted' status
                setSelectedClients([]);
                setSelectedActions([]);
                await fetchClients();
            } else {
                console.error("Dispatch failed");
            }
        } catch (error) {
            console.error("Network error during dispatch:", error);
        } finally {
            setIsDispatching(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-300 p-6 md:p-12 font-sans pt-24">
            <div className="max-w-6xl mx-auto space-y-8">

                {/* Header Section */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-white flex items-center gap-3 tracking-tight">
                            <FiShield className="text-emerald-500" />
                            Commander_Terminal
                        </h1>
                        <p className="text-slate-500 font-mono text-sm mt-2">
                            Triple S Web Services // Internal Operations
                        </p>
                    </div>
                    <div className="text-right font-mono text-xs text-slate-500">
                        <p>System Status: <span className="text-emerald-400">Online</span></p>
                        <p>Records Loaded: {clients.length}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Column: The Data Table */}
                    <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                <tr className="bg-slate-950/50 border-b border-slate-800 text-slate-400 font-mono text-xs uppercase tracking-wider">
                                    <th className="p-4 w-12 text-center">
                                        <button onClick={toggleAllClients} className="hover:text-white transition-colors">
                                            {selectedClients.length === clients.length && clients.length > 0 ? <FiCheckSquare className="text-lg text-emerald-400" /> : <FiSquare className="text-lg" />}
                                        </button>
                                    </th>
                                    <th className="p-4">Client Data</th>
                                    <th className="p-4">Status</th>
                                    <th className="p-4 text-right">Intake Date</th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-800/50">
                                {isLoading ? (
                                    <tr>
                                        <td colSpan={4} className="p-8 text-center text-slate-500">
                                            <FiLoader className="animate-spin text-2xl mx-auto mb-2" />
                                            Initializing Database Connection...
                                        </td>
                                    </tr>
                                ) : clients.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="p-8 text-center text-slate-500 font-mono text-sm">
                                            No intake records found.
                                        </td>
                                    </tr>
                                ) : (
                                    clients.map((client) => {
                                        const isSelected = selectedClients.includes(client.id);
                                        const isNew = client.status === "new";

                                        return (
                                            <tr
                                                key={client.id}
                                                className={`transition-colors hover:bg-slate-800/30 ${isSelected ? "bg-emerald-500/5" : ""}`}
                                            >
                                                <td className="p-4 text-center">
                                                    <button onClick={() => toggleClient(client.id)} className="hover:text-white transition-colors">
                                                        {isSelected ? <FiCheckSquare className="text-lg text-emerald-400" /> : <FiSquare className="text-lg text-slate-600" />}
                                                    </button>
                                                </td>
                                                <td className="p-4">
                                                    <div className="font-bold text-white">{client.name}</div>
                                                    <div className="text-sm text-slate-500">{client.email}</div>
                                                </td>
                                                <td className="p-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold tracking-widest ${
                                isNew ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-slate-800 text-slate-400 border border-slate-700"
                            }`}>
                              {client.status.toUpperCase()}
                            </span>
                                                </td>
                                                <td className="p-4 text-right text-sm font-mono text-slate-500">
                                                    {new Date(client.created_at).toLocaleDateString()}
                                                </td>
                                            </tr>
                                        );
                                    })
                                )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Right Column: The Action Dashboard */}
                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col shadow-2xl h-fit sticky top-24">
                        <h2 className="text-lg font-bold text-white mb-6 font-mono border-b border-slate-800 pb-4">
                            {"//"} Payload_Configuration
                        </h2>

                        <div className="space-y-4 flex-grow mb-8">
                            {[
                                { id: "greeting", label: "Initial Greeting", desc: "Personalized acknowledgment" },
                                { id: "pamphlet", label: "Engagement Pamphlet", desc: "Attaches pricing & models PDF" },
                                { id: "scheduler", label: "Meeting Scheduler", desc: "Includes Calendly link" },
                                { id: "thankyou", label: "General Thank You", desc: "Professional sign-off" },
                                { id: "review", label: "Post-Contract Review", desc: "Requests Google review" },
                            ].map((action) => {
                                const isActive = selectedActions.includes(action.id);
                                return (
                                    <button
                                        key={action.id}
                                        onClick={() => toggleAction(action.id)}
                                        className={`w-full flex items-start gap-4 p-4 rounded-lg border text-left transition-all ${
                                            isActive
                                                ? "bg-slate-800 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.1)]"
                                                : "bg-slate-950/50 border-slate-800 hover:border-slate-600"
                                        }`}
                                    >
                                        <div className="mt-1">
                                            {isActive ? <FiCheckSquare className="text-lg text-emerald-400" /> : <FiSquare className="text-lg text-slate-600" />}
                                        </div>
                                        <div>
                                            <div className={`font-bold ${isActive ? "text-white" : "text-slate-300"}`}>{action.label}</div>
                                            <div className="text-xs text-slate-500 mt-1">{action.desc}</div>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>

                        {/* The Dispatch Trigger */}
                        <button
                            onClick={handleDispatch}
                            disabled={selectedClients.length === 0 || selectedActions.length === 0 || isDispatching}
                            className={`w-full py-4 rounded-lg font-bold font-mono tracking-widest flex items-center justify-center gap-2 transition-all ${
                                selectedClients.length === 0 || selectedActions.length === 0
                                    ? "bg-slate-800 text-slate-500 cursor-not-allowed"
                                    : "bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-[0_0_30px_rgba(16,185,129,0.4)]"
                            }`}
                        >
                            {isDispatching ? (
                                <><FiLoader className="animate-spin text-xl" /> TRANSMITTING...</>
                            ) : (
                                <><FiSend className="text-xl" /> DISPATCH_PAYLOAD</>
                            )}
                        </button>

                        {/* Status Warning */}
                        <div className="mt-4 text-center font-mono text-xs text-slate-500">
                            Targets: {selectedClients.length} | Actions: {selectedActions.length}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}