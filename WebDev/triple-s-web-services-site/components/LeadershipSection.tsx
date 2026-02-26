"use client";

import { FaMicrochip, FaNetworkWired, FaMemory } from "react-icons/fa";

export default function LeadershipSection() {
    return (
        <div id="leadership" className="w-full max-w-6xl mx-auto my-32 relative z-10 px-6 sm:px-0 scroll-mt-24">

            <div className="flex flex-col lg:flex-row gap-16 items-center">

                {/* Left Side: The Narrative */}
                <div className="w-full lg:w-1/2">
                    <div className="inline-block mb-4 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-emerald-400 text-sm font-mono tracking-wide backdrop-blur-sm">
                        // ENGINEERING_LEADERSHIP
                    </div>
                    <h2 className="text-3xl sm:text-5xl font-bold text-white mb-6 font-sans tracking-tight leading-tight">
                        Game-Engine Performance. <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              Web-Scale Delivery.
            </span>
                    </h2>

                    <div className="space-y-6 text-slate-400 text-lg leading-relaxed">
                        <p>
                            Most web agencies approach development as drawing boxes on a screen. At Triple S Web Services, our foundation is built on the rigorous demands of independent game development and rendering architecture.
                        </p>
                        <p>
                            When you engineer complex state machines, manage memory allocations, and optimize render pipelines to run at 60 frames per second for titles like <em>Project Aegis</em>, standard web development becomes a matter of applying those same high-performance principles to the DOM.
                        </p>
                        <p>
                            We bring the strict optimization, procedural logic, and complex system architecture of game engine development directly into enterprise web and cloud environments.
                        </p>
                    </div>
                </div>

                {/* Right Side: The Technical Translation */}
                <div className="w-full lg:w-1/2 grid gap-4">

                    <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-2xl p-6 flex gap-6 items-start hover:border-emerald-500/50 transition-colors group">
                        <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0 border border-emerald-500/20 group-hover:bg-emerald-500/20 transition-colors">
                            <FaMicrochip className="text-emerald-400 text-xl" />
                        </div>
                        <div>
                            <h4 className="text-white font-bold text-lg mb-1">Complex State Management</h4>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Applying C# game state architecture to complex React logic. We ensure your application data remains perfectly synchronized, no matter how many users interact with it simultaneously.
                            </p>
                        </div>
                    </div>

                    <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-2xl p-6 flex gap-6 items-start hover:border-blue-500/50 transition-colors group">
                        <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0 border border-blue-500/20 group-hover:bg-blue-500/20 transition-colors">
                            <FaMemory className="text-blue-400 text-xl" />
                        </div>
                        <div>
                            <h4 className="text-white font-bold text-lg mb-1">Optimized Render Pipelines</h4>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Treating browser rendering with the same respect as a GPU cycle. Utilizing Next.js Server-Side Rendering to deliver sub-second load times and zero layout shift.
                            </p>
                        </div>
                    </div>

                    <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-2xl p-6 flex gap-6 items-start hover:border-purple-500/50 transition-colors group">
                        <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center flex-shrink-0 border border-purple-500/20 group-hover:bg-purple-500/20 transition-colors">
                            <FaNetworkWired className="text-purple-400 text-xl" />
                        </div>
                        <div>
                            <h4 className="text-white font-bold text-lg mb-1">Multi-Node Architecture</h4>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Translating real-time multiplayer networking concepts into resilient AWS cloud deployments, utilizing load balancers and edge caching for ultimate scalability.
                            </p>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}