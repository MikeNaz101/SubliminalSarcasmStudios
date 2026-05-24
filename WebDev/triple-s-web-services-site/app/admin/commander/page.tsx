"use client";

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Session } from '@supabase/supabase-js';

// import Dashboard from '@/components/Dashboard'; // Import your actual dashboard component here

export default function CommanderPage() {
    const [session, setSession] = useState<Session | null>(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [authError, setAuthError] = useState<string | null>(null);
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Check for active session on load
    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setIsLoading(false);
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => subscription.unsubscribe();
    }, []);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoggingIn(true);
        setAuthError(null);

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) setAuthError(error.message);
        setIsLoggingIn(false);
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
    };

    if (isLoading) {
        return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-cyan-400 font-mono">INITIALIZING SECURE LINK...</div>;
    }

    // --- LOGGED OUT STATE: SHOW LOGIN FORM ---
    if (!session) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 font-sans">
                <div className="w-full max-w-md bg-slate-900 rounded-2xl shadow-[0_0_40px_rgba(6,182,212,0.1)] border border-slate-800 p-8 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-cyan-400"></div>

                    <h2 className="text-2xl font-bold text-white mb-1">Commander Terminal</h2>
                    <p className="text-slate-500 text-sm mb-6 font-mono">AWAITING CREDENTIALS</p>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="block text-xs font-semibold tracking-wider text-slate-400 uppercase mb-1">Admin Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full rounded-lg bg-slate-800 border-slate-700 text-slate-100 p-2.5 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold tracking-wider text-slate-400 uppercase mb-1">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full rounded-lg bg-slate-800 border-slate-700 text-slate-100 p-2.5 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                                required
                            />
                        </div>

                        {authError && <p className="text-red-400 text-sm bg-red-400/10 p-2 rounded border border-red-400/20">{authError}</p>}

                        <button
                            type="submit"
                            disabled={isLoggingIn}
                            className="w-full mt-4 px-6 py-2.5 text-sm font-bold text-slate-900 bg-cyan-400 rounded-lg hover:bg-cyan-300 transition-all disabled:opacity-50"
                        >
                            {isLoggingIn ? 'Authenticating...' : 'Establish Uplink'}
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    // --- LOGGED IN STATE: SHOW DASHBOARD ---
    return (
        <div className="min-h-screen bg-slate-950">
            {/* Top Security Ribbon */}
            <div className="bg-slate-950 px-6 py-2 flex justify-end items-center border-b border-slate-800">
                <span className="text-slate-500 text-xs mr-4 font-mono">Authenticated: {session.user.email}</span>
                <button onClick={handleLogout} className="text-xs text-red-400 hover:text-red-300 font-bold tracking-wider uppercase transition-colors">
                    [ Terminate Uplink ]
                </button>
            </div>

            {/* YOUR DASHBOARD COMPONENTS GO HERE */}
            <div className="p-6 text-white">
                <h1 className="text-3xl font-bold">Welcome to Commander</h1>
                {/* <Dashboard /> */}
            </div>
        </div>
    );
}