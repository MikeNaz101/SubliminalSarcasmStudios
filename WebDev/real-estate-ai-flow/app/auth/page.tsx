"use client";

import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function AuthPage() {
    const router = useRouter();
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [role, setRole] = useState('buyer'); // Default role
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMsg('');

        try {
            if (isLogin) {
                // --- LOG IN EXISTING USER ---
                const { data, error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });

                if (error) throw error;

                // Route them based on their data
                checkRoleAndRedirect(data.user?.id);

            } else {
                // --- CREATE NEW ACCOUNT ---
                const { data, error } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        // This is the metadata our SQL trigger catches!
                        data: {
                            full_name: fullName,
                            lead_type: role,
                        }
                    }
                });

                if (error) throw error;

                checkRoleAndRedirect(data.user?.id);
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                setErrorMsg(error.message);
            } else {
                setErrorMsg("An error occurred during authentication.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    // Helper function to send them to the right dashboard
    const checkRoleAndRedirect = async (userId: string | undefined) => {
        if (!userId) return;

        // Check what role they are in our leads table
        const { data } = await supabase
            .from('leads')
            .select('lead_type')
            .eq('id', userId)
            .single();

        if (data?.lead_type === 'agent') {
            router.push('/agent'); // Send agents to the CRM
        } else {
            router.push('/'); // Send buyers/sellers to the main chat HUD
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">

                {/* Header */}
                <div className="bg-slate-900 p-8 text-center">
                    <h1 className="text-3xl font-black text-white tracking-tight">HomeJourney <span className="text-blue-400">AI</span></h1>
                    <p className="text-slate-400 mt-2 text-sm">
                        {isLogin ? 'Welcome back to your dashboard.' : 'Start your real estate adventure.'}
                    </p>
                </div>

                {/* Form */}
                <div className="p-8">
                    {errorMsg && (
                        <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm font-medium text-center">
                            {errorMsg}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {!isLogin && (
                            <>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-1">Full Name</label>
                                    <input
                                        type="text" required
                                        value={fullName} onChange={(e) => setFullName(e.target.value)}
                                        className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-slate-50 text-slate-900"
                                        placeholder="John Doe"
                                    />
                                </div>

                                {/* Role Selector */}
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">I am a...</label>
                                    <div className="grid grid-cols-3 gap-3">
                                        {['buyer', 'seller', 'agent'].map((r) => (
                                            <button
                                                key={r} type="button"
                                                onClick={() => setRole(r)}
                                                className={`py-2 px-1 rounded-lg border text-sm font-bold capitalize transition-colors ${
                                                    role === r
                                                        ? 'bg-blue-50 border-blue-500 text-blue-700'
                                                        : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
                                                }`}
                                            >
                                                {r}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}

                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1">Email Address</label>
                            <input
                                type="email" required
                                value={email} onChange={(e) => setEmail(e.target.value)}
                                className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-slate-50 text-slate-900"
                                placeholder="you@example.com"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1">Password</label>
                            <input
                                type="password" required minLength={6}
                                value={password} onChange={(e) => setPassword(e.target.value)}
                                className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-slate-50 text-slate-900"
                                placeholder="••••••••"
                            />
                        </div>

                        <button
                            type="submit" disabled={isLoading}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors mt-4 disabled:opacity-70 flex justify-center items-center"
                        >
                            {isLoading ? <span className="animate-spin mr-2">⏳</span> : null}
                            {isLogin ? 'Sign In' : 'Create Account'}
                        </button>
                    </form>

                    {/* Toggle Login/Signup */}
                    <div className="mt-8 text-center">
                        <p className="text-sm text-slate-600">
                            {isLogin ? "Don't have an account? " : "Already have an account? "}
                            <button
                                onClick={() => { setIsLogin(!isLogin); setErrorMsg(''); }}
                                className="text-blue-600 font-bold hover:underline bg-transparent border-none p-0 cursor-pointer"
                            >
                                {isLogin ? 'Sign up' : 'Log in'}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}