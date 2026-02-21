"use client";

import { useState, useEffect } from "react";

// Define the shape of our ticket data
type Message = { sender: string; role: string; text: string; timestamp: string };
type Ticket = {
    _id: string;
    unitNumber: string;
    category: string;
    urgency: string;
    description: string;
    status?: string; // Open, In Progress, Completed
    createdAt?: string;
    messages?: Message[];
};

export default function WorkerDashboard() {
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [activeTab, setActiveTab] = useState<"Active" | "Completed">("Active");
    const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
    const [newMessage, setNewMessage] = useState("");
    const [loading, setLoading] = useState(true);

    const fetchTickets = () => {
        fetch("/api/worker/tickets")
            .then(async (res) => {
                if (!res.ok) throw new Error("Server rejected the request");
                return res.json();
            })
            .then(data => {
                if (data.success) {
                    setTickets(data.tickets);
                    // Update selected ticket if one is currently open
                    if (selectedTicket) {
                        const updated = data.tickets.find((t: Ticket) => t._id === selectedTicket._id);
                        if (updated) setSelectedTicket(updated);
                    }
                } else {
                    console.error("Server Error:", data.error);
                }
            })
            .catch(err => {
                console.error("Failed to load tickets:", err);
                // If it fails, we still want to stop the loading spinner!
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchTickets();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Filter and Sort Logic
    const filteredTickets = tickets.filter(t => {
        const isCompleted = t.status === "Completed";
        return activeTab === "Completed" ? isCompleted : !isCompleted;
    }).sort((a, b) => {
        // Sort by Urgency (High -> Normal -> Low)
        const urgencyWeight: Record<string, number> = {
            "High - Emergency": 3,
            "Normal - Standard": 2,
            "Low - Cosmetic": 1
        };
        const weightA = urgencyWeight[a.urgency] || 0;
        const weightB = urgencyWeight[b.urgency] || 0;

        if (weightA !== weightB) return weightB - weightA;

        // If urgency is the same, sort by newest
        return new Date(b.createdAt || "").getTime() - new Date(a.createdAt || "").getTime();
    });

    const updateTicket = async (statusUpdate?: string, messageText?: string) => {
        if (!selectedTicket) return;

        await fetch("/api/worker/tickets", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ticketId: selectedTicket._id,
                status: statusUpdate,
                message: messageText
            }),
        });

        setNewMessage("");
        fetchTickets(); // Refresh the board
    };

    return (
        <div className="max-w-7xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-serif font-bold text-slate-900">Maintenance Board</h1>
                <p className="text-slate-500">View, update, and respond to resident requests.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* LEFT COLUMN: The Ticket List */}
                <div className="lg:col-span-1 bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col h-[700px]">
                    <div className="flex border-b border-slate-200">
                        <button
                            onClick={() => { setActiveTab("Active"); setSelectedTicket(null); }}
                            className={`flex-1 py-4 font-bold text-sm text-center border-b-2 ${activeTab === "Active" ? "border-slate-900 text-slate-900" : "border-transparent text-slate-400 hover:text-slate-600"}`}
                        >
                            Active
                        </button>
                        <button
                            onClick={() => { setActiveTab("Completed"); setSelectedTicket(null); }}
                            className={`flex-1 py-4 font-bold text-sm text-center border-b-2 ${activeTab === "Completed" ? "border-slate-900 text-slate-900" : "border-transparent text-slate-400 hover:text-slate-600"}`}
                        >
                            Completed History
                        </button>
                    </div>

                    <div className="overflow-y-auto flex-grow p-4 space-y-4">
                        {loading && <p className="text-center text-slate-400 mt-10 animate-pulse">Loading tickets...</p>}
                        {!loading && filteredTickets.length === 0 && (
                            <p className="text-center text-slate-400 mt-10">No {activeTab.toLowerCase()} tickets.</p>
                        )}

                        {filteredTickets.map(ticket => (
                            <div
                                key={ticket._id}
                                onClick={() => setSelectedTicket(ticket)}
                                className={`p-4 rounded-lg border cursor-pointer transition-all ${selectedTicket?._id === ticket._id ? "border-gold-500 bg-gold-50 shadow-md" : "border-slate-200 hover:border-slate-300 hover:shadow-sm"}`}
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <span className="font-bold text-slate-900">Unit {ticket.unitNumber}</span>
                                    {ticket.urgency.includes("High") && <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded">HIGH</span>}
                                    {ticket.urgency.includes("Normal") && <span className="bg-orange-100 text-orange-700 text-xs font-bold px-2 py-1 rounded">NORMAL</span>}
                                </div>
                                <p className="text-sm font-bold text-slate-600 mb-1">{ticket.category}</p>
                                <p className="text-sm text-slate-500 truncate">{ticket.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* RIGHT COLUMN: Ticket Details & Chat */}
                <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col h-[700px]">
                    {selectedTicket ? (
                        <>
                            {/* Header / Actions */}
                            <div className="p-6 border-b border-slate-200 flex justify-between items-center bg-slate-50 rounded-t-xl">
                                <div>
                                    <h2 className="text-2xl font-bold text-slate-900">Unit {selectedTicket.unitNumber} - {selectedTicket.category}</h2>
                                    <p className="text-sm text-slate-500 mt-1">Status: <span className="font-bold uppercase tracking-wider">{selectedTicket.status || "Open"}</span></p>
                                </div>
                                <div className="flex space-x-2">
                                    <select
                                        className="border border-slate-300 rounded p-2 text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-slate-900"
                                        value={selectedTicket.status || "Open"}
                                        onChange={(e) => updateTicket(e.target.value)}
                                    >
                                        <option value="Open">Open</option>
                                        <option value="In Progress">In Progress</option>
                                        <option value="Completed">Completed</option>
                                    </select>
                                </div>
                            </div>

                            {/* Chat History & Description */}
                            <div className="flex-grow p-6 overflow-y-auto space-y-6 bg-slate-50">
                                {/* Original Ticket */}
                                <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Original Request</p>
                                    <p className="text-slate-800 whitespace-pre-wrap">{selectedTicket.description}</p>
                                </div>

                                {/* Messages */}
                                {selectedTicket.messages?.map((msg, idx) => (
                                    <div key={idx} className={`flex flex-col ${msg.role === "worker" ? "items-end" : "items-start"}`}>
                                        <span className="text-xs text-slate-400 mb-1 font-bold">{msg.sender}</span>
                                        <div className={`p-3 rounded-lg max-w-[80%] shadow-sm ${msg.role === "worker" ? "bg-slate-900 text-white" : "bg-white border border-slate-200 text-slate-800"}`}>
                                            {msg.text}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Message Input Box */}
                            <div className="p-4 border-t border-slate-200 bg-white rounded-b-xl flex space-x-4">
                                <input
                                    type="text"
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    placeholder="Ask the resident a question..."
                                    className="flex-grow border border-slate-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-slate-900 text-slate-900 placeholder-slate-400"
                                    onKeyDown={(e) => e.key === 'Enter' && newMessage.trim() && updateTicket(undefined, newMessage)}
                                />
                                <button
                                    onClick={() => newMessage.trim() && updateTicket(undefined, newMessage)}
                                    disabled={!newMessage.trim()}
                                    className="bg-gold-600 hover:bg-gold-500 text-slate-900 font-bold px-6 py-2 rounded-lg transition-colors disabled:opacity-50"
                                >
                                    Send
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="flex items-center justify-center h-full flex-col text-slate-400">
                            <svg className="w-16 h-16 mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                            </svg>
                            <p>Select a ticket from the board to view details.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}