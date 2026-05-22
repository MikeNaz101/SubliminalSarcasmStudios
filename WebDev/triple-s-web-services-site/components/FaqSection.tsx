"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus, FiMinus, FiHelpCircle } from "react-icons/fi";

type FAQ = {
    question: string;
    answer: string;
};

const faqs: FAQ[] = [
    {
        question: "Why do you engineer custom applications instead of using WordPress or Shopify?",
        answer: "Off-the-shelf platforms are built to serve the masses, which means they come loaded with bloated code, rigid templates, and security vulnerabilities. At Triple S Web Services, we build custom Next.js and React architectures. This allows us to deliver sub-second page loads, bank-grade security, and custom operational logic that fits your exact business workflows—not the other way around."
    },
    {
        question: "How long does a typical Phase 2 (System Engineering) build take?",
        answer: "A standard adaptive system or custom portal typically takes between 5 to 12 weeks from the completion of Phase 1 (Architecture). This timeline depends heavily on the complexity of your database requirements, role-based user authentication, and any third-party API integrations."
    },
    {
        question: "Do you handle the hosting and server infrastructure?",
        answer: "Yes. We deploy exclusively on enterprise-grade cloud infrastructure, primarily utilizing AWS (Amazon Web Services). This ensures your application is highly secure, auto-scales during traffic spikes, and benefits from global edge caching. Hosting and maintenance can be handled via our Phase 3 Cloud Operations retainer."
    },
    {
        question: "What happens after the 90-day post-launch support period?",
        answer: "We offer two paths. You can either transition into a monthly Enterprise Operations retainer where we handle all proactive monitoring, AWS scaling, and continuous feature development, or we can package the codebase and hand over the administrative keys to your internal IT team. You own the code we write for you."
    },
    {
        question: "I already have a website. Can you just add a portal to it?",
        answer: "Absolutely. We often engineer decoupled web applications (like a secure client dashboard or data pipeline) that live on a subdomain (e.g., portal.yourcompany.com) and connect seamlessly to your existing marketing website and databases."
    },
    {
        question: "How does the Technical Blueprinting credit work?",
        answer: "The $2,500 Phase 1 investment covers the deep architectural planning required for a successful build. If you decide to move forward with Triple S Web Services for the Phase 2 implementation, 100% of that $2,500 is applied directly as a credit toward your final build cost. It essentially makes the planning phase free for our active clients."
    }
];

export default function FaqSection() {
    // Track which FAQ is currently open (null if all are closed)
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFaq = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div id="faq" className="w-full max-w-4xl mx-auto my-32 relative z-10 px-6 sm:px-0">

            {/* Header */}
            <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-emerald-400 text-sm font-mono tracking-wide backdrop-blur-sm">
                    <FiHelpCircle />SYSTEM_QUERIES
                </div>
                <h2 className="text-3xl sm:text-5xl font-bold text-white mb-4 tracking-tight">
                    Client Briefing.
                </h2>
                <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
                    Common architectural and operational questions regarding our engineering process, infrastructure deployments, and engagement models.
                </p>
            </div>

            {/* Accordion */}
            <div className="space-y-4">
                {faqs.map((faq, index) => {
                    const isOpen = openIndex === index;

                    return (
                        <div
                            key={index}
                            className={`border rounded-xl transition-all duration-300 overflow-hidden backdrop-blur-md ${
                                isOpen
                                    ? "bg-slate-900/80 border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.1)]"
                                    : "bg-slate-900/30 border-slate-800 hover:border-slate-700 hover:bg-slate-900/50"
                            }`}
                        >
                            {/* The Clickable Question Header */}
                            <button
                                onClick={() => toggleFaq(index)}
                                className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 focus:outline-none"
                            >
                <span className={`font-bold transition-colors ${isOpen ? "text-emerald-400" : "text-white"}`}>
                  {faq.question}
                </span>

                                {/* Plus/Minus Icon */}
                                <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                                    isOpen ? "bg-emerald-500/20 text-emerald-400" : "bg-slate-800 text-slate-400"
                                }`}>
                                    {isOpen ? <FiMinus className="text-lg" /> : <FiPlus className="text-lg" />}
                                </div>
                            </button>

                            {/* The Animated Answer Body */}
                            <AnimatePresence initial={false}>
                                {isOpen && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                    >
                                        <div className="px-6 pb-6 text-slate-400 text-sm sm:text-base leading-relaxed border-t border-slate-800/50 mt-2 pt-4">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    );
                })}
            </div>

        </div>
    );
}