import TerminalContact from "@/components/TerminalContact";
import ParticlesBackground from "@/components/ParticlesBackground";
import LighthouseBadge from "@/components/LighthouseBadge";
import ArchitectureDiagram from "@/components/ArchitectureDiagram";
import PortfolioGrid from "@/components/PortfolioGrid";
import LeadershipSection from "@/components/LeadershipSection";
import TechMarquee from "@/components/TechMarquee";

export default function Home() {
    return (
        <main className="min-h-screen bg-slate-950 flex flex-col items-center pt-24 pb-12 px-6 sm:px-24 relative overflow-hidden font-sans selection:bg-emerald-500/30">

            {/* Interactive Background */}
            <ParticlesBackground />

            {/* Background Glowing Orbs (Static layer behind particles) */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none"></div>

            {/* Hero Section */}
            <div className="z-10 text-center mb-8 max-w-4xl mt-12">
                <div className="inline-block mb-6 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-emerald-400 text-sm font-mono tracking-wide backdrop-blur-sm shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                    TRIPLE S WEB SERVICES
                </div>
                <h1 className="text-5xl sm:text-7xl font-extrabold text-white mb-6 tracking-tight drop-shadow-lg">
                    Engineered for <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Scale.</span>
                </h1>
                <p className="text-slate-400 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed mb-8">
                    We architect high-performance web applications, resilient AWS cloud infrastructure, and custom full-stack solutions for businesses that demand more than just a template.
                </p>

                {/* Gradient CTA Button */}
                <button className="group relative px-8 py-4 bg-slate-950 text-white font-mono font-bold rounded-lg hover:scale-105 transition-all duration-300 z-20">
          <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500 to-emerald-500 p-[2px] opacity-70 group-hover:opacity-100 transition-opacity duration-300">
            <span className="flex w-full h-full bg-slate-950 rounded-[6px]"></span>
          </span>
                    <span className="relative z-10 flex items-center gap-2">
            Initiate_Project <span className="text-emerald-400">{">"}</span>
          </span>
                </button>
            </div>

            {/* 100/100 Lighthouse Proof */}
            <LighthouseBadge />

            {/* Infinite Tech Stack Marquee */}
            <div className="w-full mt-12 mb-8">
                <TechMarquee />
            </div>

            {/* Interactive Terminal */}
            <div className="z-10 w-full flex justify-center mb-24 mt-8">
                <TerminalContact />
            </div>

            {/* Core Services Grid */}
            <div className="z-10 w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6 relative">
                <div className="bg-slate-900/50 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:bg-white/5 transition-colors duration-300 relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center mb-6 border border-blue-500/30">
                        <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">High-Performance Interfaces</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                        We engineer lightning-fast, SEO-optimized digital experiences designed to maximize user conversion. Delivering pixel-perfect frontends powered by Next.js and React.
                    </p>
                </div>

                <div className="bg-slate-900/50 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:bg-white/5 transition-colors duration-300 relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center mb-6 border border-purple-500/30">
                        <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">Scalable Data Architecture</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                        We architect secure, high-availability data layers. Whether your platform requires NoSQL document structures (MongoDB) or robust relational SQL (Supabase/PostgreSQL).
                    </p>
                </div>

                <div className="bg-slate-900/50 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:bg-white/5 transition-colors duration-300 relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="w-12 h-12 rounded-lg bg-emerald-500/20 flex items-center justify-center mb-6 border border-emerald-500/30">
                        <svg className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">Enterprise Cloud Operations</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                        We deploy directly onto resilient, auto-scaling environments. Utilizing AWS S3, CloudFront, and Elastic Beanstalk for military-grade infrastructure.
                    </p>
                </div>
            </div>

            {/* Portfolio Grid */}
            <PortfolioGrid />

            {/* Engineering Leadership (About) */}
            <LeadershipSection />

            {/* Animated Flow Diagram */}
            <ArchitectureDiagram />

        </main>
    );
}