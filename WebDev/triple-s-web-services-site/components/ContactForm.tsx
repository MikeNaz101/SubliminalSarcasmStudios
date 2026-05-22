"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiMessageSquare, FiSend } from "react-icons/fi";

export default function ContactForm() {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

    useEffect(() => {
        const handleOpenModal = () => setIsOpen(true);
        window.addEventListener('open-contact-modal', handleOpenModal);

        // Cleanup the listener when the component unmounts
        return () => window.removeEventListener('open-contact-modal', handleOpenModal);
    }, []);

    // Lock background scrolling when the modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => { document.body.style.overflow = "auto"; };
    }, [isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("submitting");

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setStatus("success");
                setFormData({ name: "", email: "", message: "" }); // Clear the form
            } else {
                setStatus("error");
            }
        } catch (error) {
            console.error("Submission failed:", error);
            setStatus("error");
        }
    };

    const closeModal = () => {
        setIsOpen(false);
        // Optional: reset status back to idle after closing so it's fresh for next time
        setTimeout(() => setStatus("idle"), 500);
    };

    return (
        <>
            {/* 1. The In-Page Teaser */}
            <div id="contact" className="w-full max-w-7xl mx-auto my-32 relative z-10 px-6 sm:px-0 scroll-mt-24">
                <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-2xl p-12 text-center hover:border-emerald-500/30 transition-colors duration-500 group relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-[80px] pointer-events-none transition-opacity group-hover:bg-emerald-500/10"></div>

                    <div className="inline-block mb-4 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-emerald-400 text-sm font-mono tracking-wide backdrop-blur-sm">
                        INITIATE_COMMUNICATIONS
                    </div>
                    <h2 className="text-3xl sm:text-5xl font-bold text-white mb-6 tracking-tight">
                        Ready to Architect?
                    </h2>
                    <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed mb-8">
                        Whether you need a robust cloud infrastructure deployment, an adaptive internal dashboard, or a highly immersive web experience, our engineering team is ready to review your parameters.
                    </p>

                    <button
                        onClick={() => setIsOpen(true)}
                        className="flex items-center gap-3 mx-auto px-10 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-[0_0_30px_rgba(16,185,129,0.4)]"
                    >
                        <FiMessageSquare className="text-lg" />
                        Open Secure Channel
                    </button>
                </div>
            </div>

            {/* 2. The Full-Screen Modal (Now completely broken out of the wrapper) */}
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
                            className="relative w-full max-w-3xl overflow-y-auto bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl custom-scrollbar"
                        >
                            {/* Modal Header */}
                            <div className="sticky top-0 z-20 flex justify-between items-center p-6 border-b border-slate-800 bg-slate-900/90 backdrop-blur-md">
                                <span className="text-white font-mono font-bold tracking-widest uppercase">Project_Intake_Form</span>
                                <button
                                    onClick={closeModal}
                                    className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                                >
                                    <FiX className="text-xl" />
                                </button>
                            </div>

                            {/* Form Content */}
                            <div className="p-8 sm:p-12 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none"></div>

                                {status === "success" ? (
                                    <div className="text-center py-12 animate-in fade-in zoom-in duration-500 relative z-10">
                                        <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-500/50">
                                            <FiSend className="w-8 h-8 text-emerald-400" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-white mb-2">Transmission Successful</h3>
                                        <p className="text-slate-400 mb-8">Your data payload has been securely routed to our engineering team. We will review your parameters and initiate contact shortly.</p>
                                        <button
                                            onClick={closeModal}
                                            className="px-8 py-3 bg-slate-800 hover:bg-slate-700 text-white font-mono text-sm rounded-lg transition-colors border border-slate-700 hover:border-slate-600"
                                        >
                                            Close_Terminal
                                        </button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="flex flex-col gap-6 relative z-10">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            <div className="flex flex-col gap-2">
                                                <label htmlFor="name" className="text-sm font-mono text-slate-300 uppercase tracking-widest">Name</label>
                                                <input
                                                    id="name"
                                                    type="text"
                                                    required
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                    className="bg-slate-950/50 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                                                    placeholder="Jane Doe"
                                                />
                                            </div>

                                            <div className="flex flex-col gap-2">
                                                <label htmlFor="email" className="text-sm font-mono text-slate-300 uppercase tracking-widest">Email Address</label>
                                                <input
                                                    id="email"
                                                    type="email"
                                                    required
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    className="bg-slate-950/50 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                                                    placeholder="jane@company.com"
                                                />
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-2">
                                            <label htmlFor="message" className="text-sm font-mono text-slate-300 uppercase tracking-widest">Service Requested / Notes</label>
                                            <textarea
                                                id="message"
                                                required
                                                rows={4}
                                                value={formData.message}
                                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                className="bg-slate-950/50 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors resize-y"
                                                placeholder="Briefly describe what you are looking to build..."
                                            ></textarea>
                                        </div>

                                        {status === "error" && (
                                            <div className="text-red-400 text-sm font-mono bg-red-400/10 p-3 rounded-lg border border-red-400/20">
                                                [ERROR]: Transmission failed. Please ensure your network connection is stable and try again.
                                            </div>
                                        )}

                                        <button
                                            type="submit"
                                            disabled={status === "submitting"}
                                            className="mt-4 w-full sm:w-auto self-end px-10 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                        >
                                            {status === "submitting" ? "Transmitting Data..." : <><FiSend /> Transmit_Payload</>}
                                        </button>
                                    </form>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}