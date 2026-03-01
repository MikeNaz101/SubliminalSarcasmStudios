"use client";

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

interface Task {
    id: string;
    task_title: string;
    status: 'pending' | 'completed';
}

export default function UserChecklist({ leadId }: { leadId: string }) {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // 1. Fetch tasks assigned to the user from Supabase
        const fetchTasks = async () => {
            const { data, error } = await supabase
                .from('tasks')
                .select('*')
                .eq('lead_id', leadId)
                .eq('assignee_type', 'user')
                .order('created_at', { ascending: true });

            if (error) {
                console.error("Error fetching tasks:", error);
            } else {
                setTasks(data || []);
            }
            setIsLoading(false);
        };

        fetchTasks();

        // 2. Set up a real-time listener
        const subscription = supabase
            .channel('tasks_channel')
            // --- REMOVED THE FILTER AND ADDED A CONSOLE LOG ---
            .on('postgres_changes', { event: '*', schema: 'public', table: 'tasks' }, (payload) => {
                console.log("🚨 REALTIME PING RECEIVED FROM SUPABASE:", payload);
                fetchTasks(); // Refresh the list
            })
            .subscribe((status) => {
                console.log("Realtime connection status:", status);
            });

        return () => {
            supabase.removeChannel(subscription);
        };
    }, [leadId]);

    // 3. Function to let the user check off their own tasks
    const toggleTaskStatus = async (taskId: string, currentStatus: string) => {
        const newStatus = currentStatus === 'pending' ? 'completed' : 'pending';

        // Optimistic UI update (feels instant to the user)
        setTasks(tasks.map(t => t.id === taskId ? { ...t, status: newStatus } : t));

        // Update the database
        await supabase
            .from('tasks')
            .update({
                status: newStatus,
                completed_at: newStatus === 'completed' ? new Date().toISOString() : null
            })
            .eq('id', taskId);
    };

    if (isLoading) return <div className="p-4 text-sm text-slate-500">Loading your journey...</div>;

    return (
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden flex flex-col h-[600px] w-full max-w-sm">
            <div className="bg-slate-900 p-5 text-white">
                <h3 className="font-bold text-lg">My Journey</h3>
                <p className="text-slate-400 text-sm mt-1">Your next steps to closing.</p>
            </div>

            <div className="flex-grow p-6 overflow-y-auto bg-slate-50 space-y-4">
                {tasks.length === 0 ? (
                    <p className="text-slate-500 text-sm text-center mt-10">No tasks assigned yet. Chat with the AI to get started!</p>
                ) : (
                    tasks.map((task) => (
                        <div
                            key={task.id}
                            className={`p-4 rounded-xl border flex items-start gap-3 transition-colors ${task.status === 'completed' ? 'bg-green-50 border-green-200' : 'bg-white border-slate-200 hover:border-blue-300'}`}
                        >
                            <button
                                onClick={() => toggleTaskStatus(task.id, task.status)}
                                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors ${task.status === 'completed' ? 'bg-green-500 border-green-500 text-white' : 'border-slate-300 hover:border-blue-500'}`}
                            >
                                {task.status === 'completed' && (
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                                )}
                            </button>
                            <div>
                                <p className={`font-semibold text-sm ${task.status === 'completed' ? 'text-slate-500 line-through' : 'text-slate-800'}`}>
                                    {task.task_title}
                                </p>
                                {task.status === 'pending' && (
                                    <button className="text-xs font-bold text-blue-600 mt-2 hover:underline">
                                        Take Action →
                                    </button>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}