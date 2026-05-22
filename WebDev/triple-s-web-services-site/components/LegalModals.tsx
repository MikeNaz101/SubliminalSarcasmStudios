"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiShield, FiFileText } from "react-icons/fi";

export default function LegalModals() {
    // Tracks which modal is open: 'privacy', 'terms', or null (closed)
    const [activeModal, setActiveModal] = useState<"privacy" | "terms" | null>(null);

    useEffect(() => {
        const openPrivacy = () => setActiveModal("privacy");
        const openTerms = () => setActiveModal("terms");

        // Also close these if the contact form opens
        const closeAll = () => setActiveModal(null);

        window.addEventListener('open-privacy-modal', openPrivacy);
        window.addEventListener('open-terms-modal', openTerms);
        window.addEventListener('open-contact-modal', closeAll);

        return () => {
            window.removeEventListener('open-privacy-modal', openPrivacy);
            window.removeEventListener('open-terms-modal', openTerms);
            window.removeEventListener('open-contact-modal', closeAll);
        };
    }, []);

    // Lock background scrolling when either modal is open
    useEffect(() => {
        if (activeModal) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => { document.body.style.overflow = "auto"; };
    }, [activeModal]);

    return (
        <AnimatePresence>
            {activeModal && (
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
                        className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl flex flex-col"
                    >
                        {/* Modal Header */}
                        <div className="flex-shrink-0 flex justify-between items-center p-6 border-b border-slate-800 bg-slate-900/90 backdrop-blur-md">
              <span className="text-white font-mono font-bold tracking-widest uppercase flex items-center gap-2 text-sm">
                {activeModal === "privacy" ? (
                    <><FiShield className="text-emerald-400" /> Privacy_Policy</>
                ) : (
                    <><FiFileText className="text-emerald-400" /> Terms_of_Service</>
                )}
              </span>
                            <button
                                onClick={() => setActiveModal(null)}
                                className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                            >
                                <FiX className="text-xl" />
                            </button>
                        </div>

                        {/* Scrollable Document Content */}
                        <div className="p-8 sm:p-12 overflow-y-auto custom-scrollbar relative">
                            {/* Subtle background glow */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-[80px] pointer-events-none"></div>

                            <div className="space-y-8 text-slate-300 text-sm sm:text-base leading-relaxed relative z-10">

                                {activeModal === "privacy" && (
                                    <>
                                        <div>
                                            <h2 className="text-2xl font-bold text-white mb-2">Triple S Web Services Privacy Policy</h2>
                                            <p className="text-slate-400 font-mono text-xs uppercase tracking-widest">Last Updated: {new Date().toLocaleDateString()}</p>
                                        </div>

                                        <section>
                                            <h3 className="text-lg font-bold text-white mb-2">1. Data Collection and Usage</h3>
                                            <p>Triple S Web Services ("we", "our", or "us") operates as a specialized software architecture firm. We collect information you provide directly to us when you request a technical audit, submit project parameters via our secure intake forms, or engage in engineering consultations. This data may include your name, email address, company details, and infrastructure requirements. We use this data solely to evaluate your project, communicate regarding services, and execute active engineering contracts.</p>
                                        </section>

                                        <section>
                                            <h3 className="text-lg font-bold text-white mb-2">2. New York SHIELD Act Compliance</h3>
                                            <p>As a business operating within the State of New York, we maintain reasonable administrative, technical, and physical safeguards designed to protect your private information in accordance with the Stop Hacks and Improve Electronic Data Security (SHIELD) Act. Client data is transmitted via encrypted channels and stored in secure, access-controlled cloud environments.</p>
                                        </section>

                                        <section>
                                            <h3 className="text-lg font-bold text-white mb-2">3. Third-Party Infrastructure</h3>
                                            <p>In the execution of our services, we utilize enterprise-grade cloud providers (such as Amazon Web Services and Google Cloud). While your project data may be processed through these services, we do not sell, rent, or lease your personal or corporate data to third-party data brokers or marketing agencies.</p>
                                        </section>

                                        <section>
                                            <h3 className="text-lg font-bold text-white mb-2">4. Analytics and Tracking</h3>
                                            <p>Our website may utilize localized analytics to monitor system performance and user engagement. This data is aggregated and anonymized to help us optimize the performance and architecture of our own digital properties.</p>
                                        </section>

                                        <section>
                                            <h3 className="text-lg font-bold text-white mb-2">5. Contact Information</h3>
                                            <p>For questions or concerns regarding this Privacy Policy, or to request the deletion of your intake data, please initiate contact via our primary communications terminal or directly to our data management team.</p>
                                        </section>
                                    </>
                                )}

                                {activeModal === "terms" && (
                                    <>
                                        <div>
                                            <h2 className="text-2xl font-bold text-white mb-2">Triple S Web Services Terms of Service</h2>
                                            <p className="text-slate-400 font-mono text-xs uppercase tracking-widest">Last Updated: {new Date().toLocaleDateString()}</p>
                                        </div>

                                        <section>
                                            <h3 className="text-lg font-bold text-white mb-2">1. Acceptance of Terms</h3>
                                            <p>By accessing this website and initiating communications with Triple S Web Services, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you are prohibited from utilizing our site or submitting project parameters.</p>
                                        </section>

                                        <section>
                                            <h3 className="text-lg font-bold text-white mb-2">2. Engineering Services</h3>
                                            <p>Triple S Web Services provides custom web architecture, application development, and cloud infrastructure deployment. All project engagements (Phase 1, Phase 2, and Phase 3) are governed by specific, individualized Master Services Agreements (MSAs) and Statements of Work (SOWs) which supersede these general website terms upon execution.</p>
                                        </section>

                                        <section>
                                            <h3 className="text-lg font-bold text-white mb-2">3. Intellectual Property</h3>
                                            <p>Unless explicitly stated otherwise in a direct client contract, all materials, methodologies, code libraries, and technical architectures displayed on this website are the intellectual property of Triple S Web Services. Upon full payment for completed client projects, intellectual property rights for the custom-developed codebase transfer to the client as defined in their specific SOW.</p>
                                        </section>

                                        <section>
                                            <h3 className="text-lg font-bold text-white mb-2">4. Limitation of Liability</h3>
                                            <p>In no event shall Triple S Web Services or its engineers be liable for any damages (including, without limitation, damages for loss of data, revenue, or business interruption) arising out of the use or inability to use the materials on this website, even if notified orally or in writing of the possibility of such damage.</p>
                                        </section>

                                        <section>
                                            <h3 className="text-lg font-bold text-white mb-2">5. Governing Law</h3>
                                            <p>These terms and conditions are governed by and construed in accordance with the laws of the State of New York. You irrevocably submit to the exclusive jurisdiction of the courts located in New York State for the resolution of any disputes.</p>
                                        </section>
                                    </>
                                )}

                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="flex-shrink-0 p-6 border-t border-slate-800 bg-slate-900 flex justify-end">
                            <button
                                onClick={() => setActiveModal(null)}
                                className="px-8 py-3 bg-slate-800 hover:bg-slate-700 text-white font-mono text-sm rounded-lg transition-colors border border-slate-700 hover:border-slate-600"
                            >
                                Acknowledge_&_Close
                            </button>
                        </div>

                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}