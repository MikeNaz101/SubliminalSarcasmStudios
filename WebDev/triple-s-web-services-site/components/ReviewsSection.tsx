"use client";

import { motion } from "framer-motion";
import { FiStar } from "react-icons/fi";
import { FaQuoteLeft } from "react-icons/fa";

export default function ReviewsSection() {
    const reviews = [
        {
            client: "Vinny V",
            role: "Producer",
            company: "Subliminal Sarcasm Studios, LLC",
            content: "As a game studio, we demand extremely high performance. Triple S brought game-engine optimization principles directly to the DOM. They built us a corporate hub with lightning-fast edge caching that handles our soon-to-be global media distribution flawlessly."
        }
    ];

    return (
        <div id="reviews" className="w-full max-w-7xl mx-auto my-32 relative z-10 px-6 sm:px-0 scroll-mt-24">

            {/* Header Section */}
            <div className="text-center mb-16">
                <div className="inline-block mb-4 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-emerald-400 text-sm font-mono tracking-wide backdrop-blur-sm">
                    SYSTEM_VALIDATION
                </div>
                <h2 className="text-3xl sm:text-5xl font-bold text-white mb-4 tracking-tight">
                    Proven Architecture.
                </h2>
                <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
                    We let our deployments speak for themselves. Hear from the partners relying on our custom infrastructure to run their daily operations.
                </p>
            </div>

            {/* Reviews Grid */}
            <div className="flex flex-wrap justify-center gap-8 items-stretch">
                {reviews.map((review, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.5, delay: index * 0.15 }}
                        className="w-full md:w-[340px] lg:w-[380px] bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-2xl p-8 relative flex flex-col hover:border-slate-600 transition-colors group"
                    >
                        {/* Subtle Gradient Glow on Hover */}
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"></div>

                        {/* Quote Icon & Stars */}
                        <div className="flex justify-between items-start mb-6 relative z-10">
                            <FaQuoteLeft className="text-3xl text-slate-700 group-hover:text-emerald-500/30 transition-colors" />
                            <div className="flex gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <FiStar key={i} className="text-emerald-500 fill-emerald-500/20 text-sm" />
                                ))}
                            </div>
                        </div>

                        {/* Review Content */}
                        <p className="text-slate-300 text-sm leading-relaxed mb-8 flex-grow relative z-10">
                            "{review.content}"
                        </p>

                        {/* Client Info */}
                        <div className="mt-auto border-t border-slate-800 pt-4 relative z-10">
                            <h4 className="text-white font-bold">{review.client}</h4>
                            <p className="text-slate-500 font-mono text-xs uppercase tracking-widest mt-1">
                                {review.role} // <span className="text-emerald-400">{review.company}</span>
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>

        </div>
    );
}