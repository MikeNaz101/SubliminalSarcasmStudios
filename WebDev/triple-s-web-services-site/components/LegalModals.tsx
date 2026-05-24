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

                                        <div className="space-y-4">
                                            <p>Triple S Web Services, operating under Subliminal Sarcasm Studios LLC ("we," "our," or "us"), is committed to protecting the privacy and security of your personal data. This Privacy Policy governs the collection, use, and processing of information through our digital infrastructure, client portals, and engineering services.</p>
                                            <p>By accessing our website, communicating with our engineering team, or utilizing our software architecture services, you agree to the data practices described in this policy.</p>
                                        </div>

                                        <section>
                                            <h3 className="text-lg font-bold text-white mb-2">1. Scope and Information We Collect</h3>
                                            <p className="mb-4">We collect information that identifies, relates to, or could reasonably be linked to you ("Personal Data"). The scope of data we collect depends heavily on your interaction with our systems—whether you are submitting a project intake form, accessing a client dashboard, or utilizing a web application we host on your behalf.</p>

                                            <h4 className="font-bold text-white mb-2 mt-4">A. Information You Provide Directly</h4>
                                            <ul className="list-disc pl-5 space-y-2 mb-4">
                                                <li><strong className="text-slate-200">Contact & Identity Data:</strong> Names, professional email addresses, phone numbers, and business affiliations submitted through our contact routing or project intake forms.</li>
                                                <li><strong className="text-slate-200">Authentication Data:</strong> Secure login credentials and cryptographic session data used to access our administrative and client-facing dashboards.</li>
                                                <li><strong className="text-slate-200">Project & Financial Data:</strong> Technical specifications, architecture requirements, billing information, and transaction history related to the engineering and hosting of your systems.</li>
                                            </ul>

                                            <h4 className="font-bold text-white mb-2 mt-4">B. Information Collected Automatically</h4>
                                            <ul className="list-disc pl-5 space-y-2">
                                                <li><strong className="text-slate-200">Diagnostic & Usage Data:</strong> When you access our infrastructure, our servers automatically record standard operational data, including your IP address, browser type, device information, and interaction timestamps.</li>
                                                <li><strong className="text-slate-200">Cookies & Session Management:</strong> We utilize strictly necessary cookies and authentication tokens (such as Supabase session data) to maintain secure logins and ensure our web applications function efficiently.</li>
                                            </ul>
                                        </section>

                                        <section>
                                            <h3 className="text-lg font-bold text-white mb-2">2. How We Use Your Information</h3>
                                            <p className="mb-4">We do not monetize your personal data. We act primarily as digital architects and system operators. The information we collect is strictly utilized to engineer, deliver, and maintain your software systems. We use your data to:</p>
                                            <ul className="list-disc pl-5 space-y-2">
                                                <li><strong className="text-slate-200">Execute Engineering Services:</strong> To design, build, test, and deploy custom web applications, APIs, and cloud infrastructure.</li>
                                                <li><strong className="text-slate-200">Provide System Operations:</strong> To maintain active server hosting, manage domain routing, and ensure the uptime and security of deployed applications.</li>
                                                <li><strong className="text-slate-200">Facilitate Communication:</strong> To dispatch architectural proposals, project updates, billing invoices, and critical security alerts.</li>
                                                <li><strong className="text-slate-200">Enhance Security:</strong> To authenticate users, prevent fraudulent access to client portals, and debug network errors.</li>
                                            </ul>
                                        </section>

                                        <section>
                                            <h3 className="text-lg font-bold text-white mb-2">3. Information Sharing and Disclosure</h3>
                                            <p className="mb-4">We maintain a strict boundary regarding your data. We do not sell, rent, or trade Personal Data to third-party data brokers or marketing agencies. We only disclose information under the following operational circumstances:</p>
                                            <ul className="list-disc pl-5 space-y-2">
                                                <li><strong className="text-slate-200">Cloud Infrastructure Partners:</strong> We share necessary routing and storage data with our enterprise-grade infrastructure providers (e.g., serverless cloud hosting environments, managed database services, and secure email transport protocols) strictly for the purpose of keeping your systems online and functional. These providers are contractually bound to secure your data.</li>
                                                <li><strong className="text-slate-200">Legal Compliance:</strong> We may disclose your information if required to do so by law, or in response to a valid subpoena, court order, or formal request from United States law enforcement agencies.</li>
                                                <li><strong className="text-slate-200">Business Transfers:</strong> In the event of a merger, acquisition, or asset sale involving Subliminal Sarcasm Studios LLC, client data and active operational contracts may be transferred as a business asset.</li>
                                            </ul>
                                        </section>

                                        <section>
                                            <h3 className="text-lg font-bold text-white mb-2">4. Data Security and Architecture</h3>
                                            <p className="mb-4">We engineer our systems with security as a foundational layer. We deploy commercially reasonable physical, technical, and administrative safeguards to protect your data from unauthorized access, alteration, or destruction.</p>
                                            <ul className="list-disc pl-5 space-y-2 mb-4">
                                                <li><strong className="text-slate-200">Encryption:</strong> Data transmitted between your browser and our servers is secured using modern cryptographic protocols (TLS/SSL).</li>
                                                <li><strong className="text-slate-200">Access Controls:</strong> Access to production databases and client project files is strictly restricted to authorized engineering personnel.</li>
                                                <li><strong className="text-slate-200">Database Isolation:</strong> Client data housed within our managed relational databases is protected by strict row-level security (RLS) policies to prevent unauthorized access and cross-contamination.</li>
                                            </ul>
                                            <p className="italic text-slate-400 text-sm">Despite these rigorous precautions, no cloud infrastructure can guarantee absolute security. We cannot warrant the 100% security of any information transmitted across the public internet.</p>
                                        </section>

                                        <section>
                                            <h3 className="text-lg font-bold text-white mb-2">5. Data Retention</h3>
                                            <p className="mb-4">We retain your Personal Data only for as long as is necessary to fulfill the operational purposes outlined in this Policy, or as required by legal, tax, or accounting obligations.</p>
                                            <ul className="list-disc pl-5 space-y-2">
                                                <li><strong className="text-slate-200">Active Clients:</strong> Data is retained for the duration of our hosting and maintenance agreements.</li>
                                                <li><strong className="text-slate-200">Archived Projects:</strong> Upon termination of a contract, structural project data may be securely archived for a limited period to facilitate future system restorations, unless immediate deletion is explicitly requested.</li>
                                            </ul>
                                        </section>

                                        <section>
                                            <h3 className="text-lg font-bold text-white mb-2">6. Your Privacy Rights</h3>
                                            <p className="mb-4">We believe you should have total control over your digital footprint. Depending on your jurisdiction within the United States, you hold specific rights regarding your data:</p>
                                            <ul className="list-disc pl-5 space-y-2 mb-4">
                                                <li><strong className="text-slate-200">Right to Access:</strong> You may request a copy of the Personal Data we currently hold about you.</li>
                                                <li><strong className="text-slate-200">Right to Correction:</strong> You may request that we update or correct inaccurate administrative or billing information.</li>
                                                <li><strong className="text-slate-200">Right to Deletion:</strong> You may request the erasure of your Personal Data from our active systems. Please note that fulfilling a deletion request may require us to terminate your active web hosting or dashboard access.</li>
                                            </ul>
                                            <p>To exercise any of these rights, please submit a formal request to our engineering team.</p>
                                        </section>

                                        <section>
                                            <h3 className="text-lg font-bold text-white mb-2">7. Changes to this Policy</h3>
                                            <p>As our technological stack evolves and federal/state privacy laws shift, we will update this Policy to reflect changes in our data architecture. We will post the revised Policy on our website and update the "Last Updated" date. For material changes that significantly alter how we process existing data, we will notify active clients directly via email.</p>
                                        </section>

                                        <section>
                                            <h3 className="text-lg font-bold text-white mb-2">8. Contact the Engineering Team</h3>
                                            <p>If you have technical questions regarding how your data is routed, stored, or protected, or if you need to exercise your privacy rights, please direct your inquiries to our operational team:</p>
                                            <div className="mt-4 p-4 bg-slate-950 rounded-lg border border-slate-800 font-mono text-sm inline-block">
                                                <p className="text-emerald-400 font-bold mb-1">Triple S Web Services</p>
                                                <p>Email: <a href="mailto:engineering@tripleswebservices.com" className="text-cyan-400 hover:text-cyan-300 transition-colors">engineering@tripleswebservices.com</a></p>
                                            </div>
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