"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiCheck, FiX, FiLock } from "react-icons/fi";

export default function PricingSection() {
    const [isOpen, setIsOpen] = useState(false);

    // 1. Lock background scrolling when the modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => { document.body.style.overflow = "auto"; };
    }, [isOpen]);

    // 2. Listen for the Contact Modal opening, and immediately close Pricing
    useEffect(() => {
        const handleClosePricing = () => setIsOpen(false);

        window.addEventListener('open-contact-modal', handleClosePricing);

        return () => {
            window.removeEventListener('open-contact-modal', handleClosePricing);
        };
    }, []);

    // Helper function to handle the smooth transition to the contact form
    const handleContactTransition = () => {
        setIsOpen(false);
        setTimeout(() => window.dispatchEvent(new Event('open-contact-modal')), 400);
    };

    return (
        <>
            {/* =========================================
          1. THE IN-PAGE TEASER (Standard Flow)
          ========================================= */}
            <div id="pricing" className="w-full max-w-7xl mx-auto my-32 relative z-10 px-6 sm:px-0 scroll-mt-24">
                <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-2xl p-12 text-center hover:border-emerald-500/30 transition-colors duration-500 group relative overflow-hidden">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    <div className="inline-block mb-4 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-emerald-400 text-sm font-mono tracking-wide backdrop-blur-sm">
                        ENGAGEMENT_MODELS
                    </div>
                    <h2 className="text-3xl sm:text-5xl font-bold text-white mb-6 tracking-tight">
                        Transparent Investment.
                    </h2>
                    <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed mb-8">
                        Custom software is an investment in your company's operational efficiency. Review our technical engagement tiers to understand exactly what goes into engineering a high-performance system.
                    </p>

                    <button
                        onClick={() => setIsOpen(true)}
                        className="flex items-center gap-3 mx-auto px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-[0_0_30px_rgba(16,185,129,0.4)]"
                    >
                        <FiLock className="text-lg" />
                        Unlock Pricing Tiers
                    </button>
                </div>
            </div>

            {/* =========================================
          2. THE FULL-SCREEN MODAL (z-[9999] Overlay)
          ========================================= */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-xl"
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="relative w-full max-w-6xl max-h-[95vh] overflow-y-auto bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl custom-scrollbar"
                        >
                            {/* Modal Header & Close Button */}
                            <div className="sticky top-0 z-20 flex justify-between items-center p-6 border-b border-slate-800 bg-slate-900/90 backdrop-blur-md">
                                <span className="text-white font-mono font-bold tracking-widest uppercase">System_Architecture_Pricing</span>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                                >
                                    <FiX className="text-xl" />
                                </button>
                            </div>

                            {/* The Pricing Grid */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6 sm:p-10 items-stretch">

                                {/* Tier 1: Technical Blueprinting */}
                                <div className="bg-slate-950 border border-slate-800 rounded-xl p-8 flex flex-col h-full hover:border-blue-500/50 transition-colors">
                                    <h3 className="text-xl font-bold text-white mb-2">Phase 1: Discovery & Architecture</h3>
                                    <p className="text-slate-400 text-sm mb-6 h-12">We map your entire database schema and cloud infrastructure before writing a single line of code, ensuring zero wasted development time.</p>
                                    <div className="mb-8 mt-8">
                                        <span className="text-slate-500 font-mono text-sm uppercase tracking-widest block mb-1">Starting At</span>
                                        <span className="text-4xl font-bold text-white">$2,500</span>
                                        <span className="text-emerald-500/80 text-xs mt-2 block">*100% credited toward Phase 2 build</span>
                                    </div>
                                    <ul className="space-y-4 mb-8 flex-grow">
                                        {['Relational/NoSQL Database Mapping', 'AWS Cloud Infrastructure Plan', 'UX/UI Wireframing & Flow', 'Security & Compliance Review', 'Complete Feasibility Analysis'].map((feature, i) => (
                                            <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                                                <FiCheck className="text-blue-400 mt-0.5 flex-shrink-0 text-base" />
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <button
                                        onClick={handleContactTransition}
                                        className="w-full py-3 rounded-lg border border-slate-700 text-slate-300 text-center font-mono text-sm hover:bg-slate-800 hover:text-white transition-colors mt-auto"
                                    >
                                        Request_Audit
                                    </button>
                                </div>

                                {/* Tier 2: Adaptive Systems (Highlighted) */}
                                <div className="bg-slate-950 border-2 border-emerald-500/50 rounded-xl p-8 relative flex flex-col h-full shadow-[0_0_30px_rgba(16,185,129,0.1)] transform lg:-translate-y-2">
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-emerald-500 text-slate-950 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest shadow-[0_0_10px_rgba(16,185,129,0.5)]">
                                        Complete Build
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2">Phase 2: System Engineering</h3>
                                    <p className="text-slate-400 text-sm mb-6 h-12">Full-stack engineering of a secure, high-performance web application designed to automate and streamline your specific workflows.</p>
                                    <div className="mb-8 mt-8">
                                        <span className="text-slate-500 font-mono text-sm uppercase tracking-widest block mb-1">Starting At</span>
                                        <span className="text-4xl font-bold text-white">$10,000</span>
                                    </div>
                                    <ul className="space-y-4 mb-8 flex-grow">
                                        {['Custom Next.js Server-Side Rendering', 'Secure Database Integration', 'Complex State & Logic Management', 'Role-Based Authentication', 'Automated CI/CD Deployment Pipelines', '90 Days Post-Launch Maintenance'].map((feature, i) => (
                                            <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                                                <FiCheck className="text-emerald-400 mt-0.5 flex-shrink-0 text-base" />
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <button
                                        onClick={handleContactTransition}
                                        className="w-full py-3 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-center font-bold transition-colors mt-auto shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                                    >
                                        Initiate_Engineering
                                    </button>
                                </div>

                                {/* Tier 3: Enterprise Operations */}
                                <div className="bg-slate-950 border border-slate-800 rounded-xl p-8 flex flex-col h-full hover:border-purple-500/50 transition-colors">
                                    <h3 className="text-xl font-bold text-white mb-2">Phase 3: Cloud Operations</h3>
                                    <p className="text-slate-400 text-sm mb-6 h-12">For active platforms requiring continuous feature development, robust AWS scaling, and 24/7 proactive monitoring.</p>
                                    <div className="mb-8 mt-8">
                                        <span className="text-slate-500 font-mono text-sm uppercase tracking-widest block mb-1">Monthly Retainer</span>
                                        <span className="text-4xl font-bold text-white">Custom</span>
                                    </div>
                                    <ul className="space-y-4 mb-8 flex-grow">
                                        {['Dedicated engineering bandwidth', 'AWS auto-scaling management', 'Real-time performance analytics', 'Continuous integration (CI/CD)', 'Legacy system migration'].map((feature, i) => (
                                            <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                                                <FiCheck className="text-purple-400 mt-0.5 flex-shrink-0 text-base" />
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <button
                                        onClick={handleContactTransition}
                                        className="w-full py-3 rounded-lg border border-slate-700 text-slate-300 text-center font-mono text-sm hover:bg-slate-800 hover:text-white transition-colors mt-auto"
                                    >
                                        Discuss_Scale
                                    </button>
                                </div>

                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}