import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-white/10">
            <div className="max-w-7xl mx-auto px-6 sm:px-12 h-20 flex items-center justify-between">

                {/* Logo / Brand */}
                <Link href="/" className="flex flex-col group">
          <span className="text-white font-bold text-xl tracking-tight group-hover:text-emerald-400 transition-colors">
            TRIPLE S
          </span>
                    <span className="text-slate-400 font-mono text-xs tracking-widest uppercase">
            Web Services
          </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-8 font-mono text-sm">
                    <Link href="#services" className="text-slate-300 hover:text-emerald-400 transition-colors">
                        // Services
                    </Link>
                    <Link href="#work" className="text-slate-300 hover:text-emerald-400 transition-colors">
                        // Work
                    </Link>
                    <Link href="#leadership" className="text-slate-300 hover:text-emerald-400 transition-colors">
                        // Leadership
                    </Link>
                </div>

                {/* Client Login CTA */}
                <div className="flex items-center gap-4">
                    <button className="hidden sm:block text-slate-400 hover:text-white font-mono text-sm transition-colors">
                        Client_Portal
                    </button>
                    <button className="px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-emerald-400 font-mono text-sm transition-all shadow-[0_0_15px_rgba(16,185,129,0.1)] hover:shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                        Initiate_Comms
                    </button>
                </div>

            </div>
        </nav>
    );
}