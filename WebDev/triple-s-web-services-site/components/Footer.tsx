import Link from "next/link";

export default function Footer() {
    return (
        <footer className="w-full bg-slate-950 border-t border-white/10 pt-16 pb-8 relative z-10 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 sm:px-12 flex flex-col md:flex-row justify-between items-start gap-12">

                {/* Brand & Value Prop */}
                <div className="max-w-sm">
          <span className="text-white font-bold text-2xl tracking-tight block mb-2">
            TRIPLE S
          </span>
                    <p className="text-slate-400 text-sm leading-relaxed mb-6">
                        Engineered for scale. We architect high-performance web applications and resilient cloud infrastructure for businesses that demand more.
                    </p>
                    <div className="flex gap-4">
                        {/* Social / Github Links placeholder */}
                        <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-emerald-400 hover:border-emerald-500/50 transition-all cursor-pointer">
                            GH
                        </div>
                        <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-emerald-400 hover:border-emerald-500/50 transition-all cursor-pointer">
                            IN
                        </div>
                    </div>
                </div>

                {/* Quick Links */}
                <div className="flex gap-16 font-mono text-sm">
                    <div className="flex flex-col gap-3">
                        <span className="text-white font-bold uppercase tracking-widest mb-2">Navigation</span>
                        <Link href="#services" className="text-slate-400 hover:text-emerald-400">Services</Link>
                        <Link href="#work" className="text-slate-400 hover:text-emerald-400">Portfolio</Link>
                        <Link href="#leadership" className="text-slate-400 hover:text-emerald-400">Leadership</Link>
                    </div>
                    <div className="flex flex-col gap-3">
                        <span className="text-white font-bold uppercase tracking-widest mb-2">Legal</span>
                        <Link href="#" className="text-slate-400 hover:text-emerald-400">Privacy Policy</Link>
                        <Link href="#" className="text-slate-400 hover:text-emerald-400">Terms of Service</Link>
                    </div>
                </div>
            </div>

            {/* The Legal DBA Copyright Line */}
            <div className="max-w-7xl mx-auto px-6 sm:px-12 mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono text-slate-500">
                <p>© 2026 Triple S Web Services. A DBA of Subliminal Sarcasm Studios, LLC.</p>
                <p>All systems operational.</p>
            </div>
        </footer>
    );
}