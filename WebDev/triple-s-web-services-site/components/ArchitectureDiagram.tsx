"use client";

import { motion } from "framer-motion";
import { FaLaptopCode, FaServer, FaDatabase, FaGlobe } from "react-icons/fa";
import { SiAmazonroute53, SiAmazons3 } from "react-icons/si";

export default function ArchitectureDiagram() {
    return (
        <div className="w-full max-w-4xl mx-auto my-24 p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md relative overflow-hidden">
            <h3 className="text-2xl font-bold text-white mb-12 text-center font-mono">System_Architecture</h3>

            <div className="flex flex-col sm:flex-row items-center justify-between relative z-10 px-4 sm:px-12">

                {/* Step 1: User */}
                <div className="flex flex-col items-center gap-3">
                    <div className="w-16 h-16 rounded-xl bg-blue-500/20 border border-blue-500/50 flex items-center justify-center text-blue-400 text-3xl shadow-[0_0_20px_rgba(59,130,246,0.2)]">
                        <FaLaptopCode />
                    </div>
                    <span className="text-slate-400 font-mono text-sm">Client</span>
                </div>

                {/* Animated Line 1 */}
                <div className="hidden sm:block flex-1 h-[2px] bg-slate-800 mx-4 relative">
                    <motion.div
                        className="absolute top-0 left-0 h-full w-1/3 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_10px_rgba(52,211,153,0.8)]"
                        animate={{ left: ["-30%", "100%"] }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                    />
                </div>

                {/* Step 2: Route 53 / CloudFront */}
                <div className="flex flex-col items-center gap-3 my-8 sm:my-0">
                    <div className="w-16 h-16 rounded-xl bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-emerald-400 text-3xl shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                        <SiAmazonroute53 />
                    </div>
                    <span className="text-slate-400 font-mono text-sm">Route 53</span>
                </div>

                {/* Animated Line 2 */}
                <div className="hidden sm:block flex-1 h-[2px] bg-slate-800 mx-4 relative">
                    <motion.div
                        className="absolute top-0 left-0 h-full w-1/3 bg-gradient-to-r from-transparent via-blue-400 to-transparent shadow-[0_0_10px_rgba(59,130,246,0.8)]"
                        animate={{ left: ["-30%", "100%"] }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "linear", delay: 0.5 }}
                    />
                </div>

                {/* Step 3: S3 / Server */}
                <div className="flex flex-col items-center gap-3">
                    <div className="w-16 h-16 rounded-xl bg-purple-500/20 border border-purple-500/50 flex items-center justify-center text-purple-400 text-3xl shadow-[0_0_20px_rgba(168,85,247,0.2)]">
                        <SiAmazons3 />
                    </div>
                    <span className="text-slate-400 font-mono text-sm">AWS S3 / Edge</span>
                </div>

            </div>
        </div>
    );
}