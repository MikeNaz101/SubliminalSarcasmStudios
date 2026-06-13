"use client";

import Link from 'next/link';
import { FiCheckCircle, FiCpu, FiShield, FiCode, FiArrowRight } from 'react-icons/fi';

export default function PromoLandingPage() {

    // The Dispatch Function: Fires the event to open the contact modal and injects the promo code
    const handleStartDevelopment = () => {
        const event = new CustomEvent('open-contact-modal', {
            detail: { promoCode: 'SUMMER50' }
        });
        window.dispatchEvent(event);
    };

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 font-sans relative">

            {/* Top Navigation: Subtle Return Home */}
            <div className="absolute top-6 left-6 sm:top-8 sm:left-8 z-20">
                <Link href="/" className="group flex items-center text-sm font-bold tracking-widest text-white uppercase hover:text-cyan-400 transition-colors">
                    TRIPLE S <span className="text-slate-500 font-normal ml-1 group-hover:text-cyan-600 transition-colors">WEB SERVICES</span>
                </Link>
            </div>

            {/* Main Content Wrapper */}
            <div className="w-full max-w-3xl bg-slate-900 rounded-2xl shadow-[0_0_40px_rgba(6,182,212,0.1)] border border-slate-800 p-8 sm:p-12 relative overflow-hidden mt-12 sm:mt-0">

                {/* Futuristic Background Accents */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-cyan-400 to-emerald-400"></div>
                <div className="absolute -top-32 -right-32 w-64 h-64 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none"></div>

                {/* Header Section */}
                <div className="text-center mb-10 relative z-10">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-sm font-bold tracking-widest uppercase mb-6">
                        Verified QR Scan
                    </span>
                    <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 tracking-tight">
                        Next-Generation <br className="hidden sm:block" /> Web Architecture.
                    </h1>
                    <p className="text-xl text-cyan-400 font-mono">
                        Exclusive 50% Off Development Grant.
                    </p>
                </div>

                {/* Pitch Section */}
                <div className="space-y-6 text-slate-300 text-base sm:text-lg leading-relaxed relative z-10 mb-10">
                    <p>
                        You found this page because you scanned our localized QR code. At Triple S Web Services, we build digital infrastructure designed to scale—and for a strictly limited time, we are offering a 50% reduction on all initial development and architecture costs for new local projects.
                    </p>
                </div>

                {/* Value Pillars Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12 relative z-10">
                    {[
                        { icon: <FiCpu className="text-cyan-400 text-xl" />, title: "Custom Architecture", desc: "Built from the ground up for your specific operational needs." },
                        { icon: <FiCode className="text-emerald-400 text-xl" />, title: "Modern Tech Stack", desc: "Lightning-fast, highly responsive React and Next.js interfaces." },
                        { icon: <FiShield className="text-cyan-400 text-xl" />, title: "Enterprise Security", desc: "Encrypted data routing and strictly enforced access controls." },
                        { icon: <FiCheckCircle className="text-emerald-400 text-xl" />, title: "Phase 1 - 3 Execution", desc: "A transparent, structured engineering and deployment process." },
                    ].map((feature, idx) => (
                        <div key={idx} className="bg-slate-950 p-5 rounded-xl border border-slate-800 flex items-start gap-4">
                            <div className="mt-1 bg-slate-900 p-2 rounded-lg border border-slate-800">
                                {feature.icon}
                            </div>
                            <div>
                                <h3 className="text-white font-bold text-sm mb-1">{feature.title}</h3>
                                <p className="text-slate-400 text-xs leading-relaxed">{feature.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Call To Action */}
                <div className="text-center relative z-10 border-t border-slate-800 pt-8 mt-4">
                    <p className="text-slate-500 text-sm font-mono mb-6 uppercase tracking-wider">
                        Awaiting Project Parameters
                    </p>

                    <button
                        onClick={handleStartDevelopment}
                        className="inline-block w-full sm:w-auto px-10 py-4 rounded-lg font-bold text-lg transition-all shadow-[0_0_20px_rgba(34,211,238,0.2)] hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] bg-cyan-500 hover:bg-cyan-400 text-slate-950"
                    >
                        Start Development Today!
                    </button>

                    <p className="mt-4 text-xs text-slate-500">
                        Code <strong className="text-cyan-500">SUMMER50</strong> will be automatically applied to your intake file.
                    </p>

                    {/* Bottom Navigation Link */}
                    <div className="mt-8 pt-6">
                        <Link href="/" className="inline-flex items-center gap-2 text-sm font-mono text-slate-400 hover:text-cyan-400 transition-colors">
                            Explore the Main Site <FiArrowRight />
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    );
}