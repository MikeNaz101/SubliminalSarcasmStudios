"use client";

import { FaCodeBranch, FaLayerGroup, FaNetworkWired } from "react-icons/fa";

export default function LeadershipSection() {
    return (
        <div id="leadership" className="w-full max-w-6xl mx-auto my-32 relative z-10 px-6 sm:px-0 scroll-mt-24">

            <div className="flex flex-col lg:flex-row gap-16 items-center">

                {/* Left Side: The Narrative */}
                <div className="w-full lg:w-1/2">
                    <div className="inline-block mb-4 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-emerald-400 text-sm font-mono tracking-wide backdrop-blur-sm">
                        ENGINEERING_LEADERSHIP
                    </div>
                    <h2 className="text-3xl sm:text-5xl font-bold text-white mb-6 font-sans tracking-tight leading-tight">
                        Beyond Websites. <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              Engineered Business Tools.
            </span>
                    </h2>

                    <div className="space-y-6 text-slate-400 text-lg leading-relaxed">
                        <p>
                            Most agencies force your business into a pre-built template. At Triple S Web Services, we architect adaptive software systems tailored entirely to the unique operational demands of your company.
                        </p>
                        <p>
                            A digital presence should not be a static brochure. We partner with our clients to engineer solutions that evolve their brand into the realm of functional business tools, whether that means building a secure maintenance portal, automating a complex data pipeline, or designing a highly immersive user experience.
                        </p>
                        <p>
                            We analyze your specific workflows and build bespoke web architecture designed to scale seamlessly alongside your growth.
                        </p>
                    </div>
                </div>

                {/* Right Side: The Technical Translation */}
                <div className="w-full lg:w-1/2 grid gap-4">

                    <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-2xl p-6 flex gap-6 items-start hover:border-emerald-500/50 transition-colors group">
                        <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0 border border-emerald-500/20 group-hover:bg-emerald-500/20 transition-colors">
                            <FaCodeBranch className="text-emerald-400 text-xl" />
                        </div>
                        <div>
                            <h4 className="text-white font-bold text-lg mb-1">Adaptive Software Systems</h4>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                We engineer custom logic to fit your operations, not the other way around. From role-based dashboards to internal management tools, we build software that adapts to how you work.
                            </p>
                        </div>
                    </div>

                    <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-2xl p-6 flex gap-6 items-start hover:border-blue-500/50 transition-colors group">
                        <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0 border border-blue-500/20 group-hover:bg-blue-500/20 transition-colors">
                            <FaLayerGroup className="text-blue-400 text-xl" />
                        </div>
                        <div>
                            <h4 className="text-white font-bold text-lg mb-1">Immersive Web Experiences</h4>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Evolving beyond standard layouts. We utilize modern frameworks to create highly interactive, conversion-optimized platforms that leave a lasting impression on your users.
                            </p>
                        </div>
                    </div>

                    <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-2xl p-6 flex gap-6 items-start hover:border-purple-500/50 transition-colors group">
                        <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center flex-shrink-0 border border-purple-500/20 group-hover:bg-purple-500/20 transition-colors">
                            <FaNetworkWired className="text-purple-400 text-xl" />
                        </div>
                        <div>
                            <h4 className="text-white font-bold text-lg mb-1">Scalable Infrastructure</h4>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Your business isn&#39;t static, and your hosting shouldn&#39;t be either. We deploy resilient, auto-scaling cloud solutions that effortlessly handle your growth without skipping a beat.
                            </p>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}