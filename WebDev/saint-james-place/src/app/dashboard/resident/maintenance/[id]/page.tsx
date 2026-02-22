"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Message {
    sender: string;
    role: string;
    text: string;
    timestamp: string;
}

interface Ticket {
    _id: string;
    category: string;
    urgency: string;
    description: string;
    status: string;
    createdAt: string;
    messages?: Message[];
}

export default function TicketDetailsPage({ params }: { params: { id: string } }) {
    const [ticket, setTicket] = useState<Ticket | null>(null);
    const [newMessage, setNewMessage] = useState("");
    const [loading, setLoading] = useState(true);

    const fetchTicket = () => {
        fetch(`/api/resident/tickets/${params.id}`)
            .then(res => {
                if (!res.ok) throw new Error("Failed to load");
                return res.json();
            })
            .then(data => {
                if (data.success) setTicket(data.ticket);
            })
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchTicket();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params.id]);

    const sendMessage = async () => {
        if (!newMessage.trim() || !ticket) return;

        // Optimistically clear the input
        const textToSend = newMessage;
        setNewMessage("");

        await fetch(`/api/resident/tickets/${params.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: textToSend }),
        });

        // Refresh the chat to show the new message
        fetchTicket();
    };

    if (loading) {
        return (
            <div className="max-w-4xl mx-auto p-6 flex items-center justify-center min-h-[500px]">
                <div className="animate-pulse flex flex-col items-center">
                    <div className="w-12 h-12 bg-slate-200 rounded-full mb-4"></div>
                    <p className="text-slate-400 font-bold tracking-widest uppercase">Loading Ticket...</p>
                </div>
            </div>
        );
    }

    if (!ticket) {
        return (
            <div className="max-w-4xl mx-auto p-6 text-center mt-20">
                <h1 className="text-2xl font-bold text-slate-800 mb-4">Ticket Not Found</h1>
                <p className="text-slate-500 mb-8">We could not find this request. It may have been deleted.</p>
                <Link href="/dashboard" className="bg-slate-900 text-white px-6 py-3 rounded-lg font-bold hover:bg-slate-800">
                    Return to Dashboard
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Back Button & Header */}
            <div className="flex items-center gap-4 mb-8">
                <Link href="/dashboard" className="w-10 h-10 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-900 hover:border-slate-400 transition-colors shadow-sm">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                </Link>
                <div>
                    <h1 className="text-2xl font-serif font-bold text-slate-900">{ticket.category} Request</h1>
                    <p className="text-slate-500 text-sm">Submitted on {new Date(ticket.createdAt).toLocaleDateString()}</p>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-[600px]">
                {/* Status Bar */}
                <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
                    <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">Status</span>
                    <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
                        ticket.status === 'Completed' ? 'bg-green-100 text-green-700' :
                            ticket.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                                'bg-slate-200 text-slate-700'
                    }`}>
                        {ticket.status || "Open"}
                    </span>
                </div>

                {/* Chat History */}
                <div className="flex-grow p-6 overflow-y-auto bg-slate-50 space-y-6">
                    {/* The Original Ticket Description */}
                    <div className="flex flex-col items-start">
                        <span className="text-xs text-slate-400 mb-1 font-bold ml-1">You (Original Request)</span>
                        <div className="p-4 rounded-2xl rounded-tl-sm bg-white border border-slate-200 text-slate-800 shadow-sm max-w-[85%] whitespace-pre-wrap">
                            {ticket.description}
                        </div>
                    </div>

                    {/* The Chat Messages */}
                    {ticket.messages?.map((msg, idx) => {
                        const isResident = msg.role === "resident";
                        return (
                            <div key={idx} className={`flex flex-col ${isResident ? "items-end" : "items-start"}`}>
                                <span className={`text-xs text-slate-400 mb-1 font-bold ${isResident ? "mr-1" : "ml-1"}`}>
                                    {isResident ? "You" : msg.sender}
                                </span>
                                <div className={`p-4 rounded-2xl shadow-sm max-w-[85%] ${
                                    isResident
                                        ? "bg-slate-900 text-white rounded-tr-sm"
                                        : "bg-white border border-slate-200 text-slate-800 rounded-tl-sm"
                                }`}>
                                    {msg.text}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Chat Input Bar */}
                {ticket.status !== "Completed" ? (
                    <div className="p-4 border-t border-slate-200 bg-white flex gap-3">
                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                            placeholder="Type a message to maintenance..."
                            className="flex-grow border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-slate-900 text-slate-900"
                        />
                        <button
                            onClick={sendMessage}
                            disabled={!newMessage.trim()}
                            className="bg-gold-600 hover:bg-gold-500 text-slate-900 font-bold px-6 py-3 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            <span>Send</span>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                        </button>
                    </div>
                ) : (
                    <div className="p-4 border-t border-slate-200 bg-slate-100 text-center">
                        <p className="text-slate-500 font-medium text-sm">This ticket has been marked as completed and is now closed.</p>
                    </div>
                )}
            </div>
        </div>
    );
}