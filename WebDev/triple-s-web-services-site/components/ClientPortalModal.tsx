"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiLock, FiClock } from "react-icons/fi";

export default function ClientPortalModal() {
    const [isOpen, setIsOpen] = useState(false);

    // Listen for the custom global event from the Navbar
    useEffect(() => {
        const handleOpen = () => setIsOpen(true);
        const handleClose = () => setIsOpen(false);

        window.addEventListener('open-client-portal-modal', handleOpen);

        // Also listen for the contact modal opening so they don't overlap
        window.addEventListener('open-contact-modal', handleClose);

        return () => {
            window.removeEventListener('open-client-portal-modal', handleOpen);
            window.removeEventListener('open-contact-modal', handleClose);
        };
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

    return (
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
                        className="relative w-full max-w-md overflow-hidden bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl"
                    >
                        {/* Modal Header */}
                        <div className="flex justify-between items-center p-6 border-b border-slate-800 bg-slate-900/90 backdrop-blur-md">
              <span className="text-white font-mono font-bold tracking-widest uppercase flex items-center gap-2 text-sm">
                <FiLock className="text-emerald-400" /> Secure_Access
              </span>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                            >
                                <FiX className="text-xl" />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-8 text-center relative">
                            {/* Subtle background glow */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-[50px] pointer-events-none"></div>

                            <div className="w-16 h-16 bg-slate-800 border border-slate-700 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner">
                                <FiClock className="text-3xl text-slate-400" />
                            </div>

                            <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">Portal Offline</h3>
                            <p className="text-slate-400 text-sm leading-relaxed mb-8">
                                The Triple S client dashboard is currently undergoing architectural upgrades. Secure project routing and billing access will be re-enabled shortly.
                            </p>

                            <button
                                onClick={() => setIsOpen(false)}
                                className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg transition-colors shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                            >
                                Acknowledge_Status
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}