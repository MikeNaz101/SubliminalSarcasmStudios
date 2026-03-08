"use client";

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

interface Task {
    id: string;
    task_title: string;
    status: 'pending' | 'completed';
}

// THE STATE MACHINE: Defining the levels of the real estate game
const QUEST_STAGES = [
    { id: 1, title: 'The Hunt', description: 'Pre-approval & Tours' },
    { id: 2, title: 'The Offer', description: 'Negotiation & Escrow' },
    { id: 3, title: 'The Gauntlet', description: 'Inspection & Appraisal' },
    { id: 4, title: 'Closing', description: 'Keys in Hand!' },
];

export default function UserChecklist() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [currentLevel, setCurrentLevel] = useState(1);

    useEffect(() => {
        let subscription: ReturnType<typeof supabase.channel>;

        const initializePlayerHUD = async () => {
            // 1. Ask Supabase who is currently holding the controller
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return; // If no one is logged in, stop here.

            // 2. Look for an existing Match Lobby (Transaction) for this player
            let { data: transaction } = await supabase
                .from('transactions')
                .select('*')
                .eq('buyer_id', user.id)
                .eq('status', 'active')
                .single();

            // 3. AUTO-SPAWN LOBBY: If they are a brand new player, create a new transaction for them!
            if (!transaction) {
                console.log("New player detected. Spawning fresh transaction lobby...");
                const { data: newTx, error } = await supabase
                    .from('transactions')
                    .insert({
                        buyer_id: user.id,
                        property_address: 'TBD - Journey Starting',
                        current_level: 1
                    })
                    .select()
                    .single();

                if (error) {
                    console.error("Failed to spawn lobby:", error);
                    return;
                }
                transaction = newTx;
            }

            const activeTransactionId = transaction.id;

            // 4. Fetch the tasks specifically for THIS transaction
            const fetchTasks = async () => {
                const { data } = await supabase
                    .from('tasks')
                    .select('*')
                    .eq('transaction_id', activeTransactionId)
                    .eq('assignee_type', 'user')
                    .order('created_at', { ascending: true });

                if (data) {
                    setTasks(data);

                    // DYNAMIC LEVELING LOGIC
                    const completedCount = data.filter(t => t.status === 'completed').length;
                    if (completedCount >= 5) setCurrentLevel(4);
                    else if (completedCount >= 3) setCurrentLevel(3);
                    else if (completedCount >= 1) setCurrentLevel(2);
                    else setCurrentLevel(1);
                }
            };

            fetchTasks();

            // 5. The live WebSocket listener (With Next.js ghost-connection protection)
            // We add Date.now() so the channel name is always 100% unique on every refresh
            const uniqueChannelName = `tasks_lobby_${activeTransactionId}_${Date.now()}`;

            subscription = supabase
                .channel(uniqueChannelName)
                .on('postgres_changes', {
                    event: '*',
                    schema: 'public',
                    table: 'tasks'
                }, (payload: { new?: { transaction_id?: string }; old?: { transaction_id?: string } }) => {

                    console.log("🚨 REALTIME PING CAUGHT:", payload);

                    // REACT-SIDE FILTER
                    const affectedTransactionId = payload.new?.transaction_id || payload.old?.transaction_id;

                    if (affectedTransactionId === activeTransactionId) {
                        console.log("✅ Task belongs to this Lobby! Refreshing HUD...");
                        fetchTasks();
                    }

                })
                .subscribe((status) => {
                    // This tells us if the connection actually succeeded!
                    console.log("📡 WebSocket Status:", status);
                });
        };

        initializePlayerHUD();

        return () => {
            if (subscription) supabase.removeChannel(subscription);
        };
    }, []);

    const completeQuest = async (taskId: string) => {
        await supabase.from('tasks').update({ status: 'completed' }).eq('id', taskId);
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-full">

            {/* HUD HEADER: The Visual State Machine */}
            <div className="bg-slate-900 p-6 text-white relative overflow-hidden">
                {/* Decorative background element */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 rounded-full opacity-10 blur-2xl transform translate-x-1/2 -translate-y-1/2"></div>

                <h2 className="text-xl font-bold mb-6">Your Journey</h2>

                <div className="relative">
                    {/* The Progress Track */}
                    <div className="absolute top-4 left-0 w-full h-1 bg-slate-700 rounded">
                        <div
                            className="absolute top-0 left-0 h-full bg-blue-500 rounded transition-all duration-700 ease-in-out"
                            style={{ width: `${((currentLevel - 1) / 3) * 100}%` }}
                        ></div>
                    </div>

                    {/* The Level Nodes */}
                    <div className="relative flex justify-between">
                        {QUEST_STAGES.map((stage) => {
                            const isActive = stage.id === currentLevel;
                            const isCompleted = stage.id < currentLevel;
                            const isLocked = stage.id > currentLevel;

                            return (
                                <div key={stage.id} className="flex flex-col items-center group">
                                    <div className={`w-9 h-9 rounded-full flex items-center justify-center z-10 transition-colors duration-300 border-2 
                    ${isCompleted ? 'bg-blue-500 border-blue-500 text-white' :
                                        isActive ? 'bg-slate-900 border-blue-400 text-blue-400 shadow-[0_0_15px_rgba(96,165,250,0.5)]' :
                                            'bg-slate-800 border-slate-700 text-slate-500'}`}
                                    >
                                        {isCompleted ? (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                                        ) : isLocked ? (
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                                        ) : (
                                            <span className="text-sm font-bold">{stage.id}</span>
                                        )}
                                    </div>
                                    <div className="mt-3 text-center w-20">
                                        <p className={`text-xs font-bold transition-colors ${isActive || isCompleted ? 'text-slate-200' : 'text-slate-500'}`}>{stage.title}</p>
                                        {isActive && <p className="text-[10px] text-blue-300 mt-0.5 whitespace-nowrap absolute -ml-4">Current Phase</p>}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* ACTIVE QUEST LIST */}
            <div className="flex-grow p-6 overflow-y-auto bg-slate-50">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Active Objectives</h3>

                {tasks.filter(t => t.status === 'pending').length === 0 ? (
                    <div className="text-center py-10">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 text-blue-500 mb-4">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </div>
                        <p className="text-slate-600 font-medium">All objectives complete!</p>
                        <p className="text-sm text-slate-400 mt-1">Chat with the guide for your next steps.</p>
                    </div>
                ) : (
                    <ul className="space-y-3">
                        {tasks.filter(t => t.status === 'pending').map((task) => (
                            <li key={task.id} className="group bg-white border border-slate-200 rounded-xl p-4 hover:border-blue-300 hover:shadow-sm transition-all flex items-start gap-4">
                                <button
                                    onClick={() => completeQuest(task.id)}
                                    className="mt-0.5 w-6 h-6 rounded-full border-2 border-slate-300 flex items-center justify-center group-hover:border-blue-500 group-hover:bg-blue-50 transition-colors shrink-0"
                                >
                                    <svg className="w-3.5 h-3.5 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                                </button>
                                <span className="text-slate-700 font-medium text-sm leading-snug">{task.task_title}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}