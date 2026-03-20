// src/app/about/page.tsx
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-blue-500/30">
            <Navbar />

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-6 max-w-5xl mx-auto">
                <div className="max-w-2xl">
                    <h1 className="text-5xl font-black tracking-tight mb-6 text-white">
                        Hi, I'm Mike NAZ.
                    </h1>
                    <h2 className="text-2xl text-zinc-400 mb-8 font-light">
                        Computer Science Student @ UAlbany & <br />
                        Founder of{" "}
                        <a
                            href="https://SubliminalSarcasmStudios.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-semibold text-blue-500 hover:text-blue-400 transition-colors"
                        >
                            Subliminal Sarcasm Studios
                        </a>.
                    </h2>
                    <p className="text-lg text-zinc-400 mb-10 leading-relaxed">
                        I am a software engineer and game developer specializing in
                        <strong className="text-zinc-200"> Unity, Unreal Engine, and VR/MR technologies</strong>.
                        Currently serving as Treasurer of the UAlbany Game Design Club and working on
                        immersive research for library sciences.
                    </p>

                    <div className="flex gap-4">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-none font-medium hover:bg-blue-500 transition-colors"
                        >
                            View My Work <ArrowRight size={18} />
                        </Link>
                        <a
                            href="mailto:mnaz@albany.edu"
                            className="inline-flex items-center gap-2 bg-zinc-900 border border-zinc-800 text-zinc-300 px-6 py-3 rounded-none font-medium hover:border-zinc-700 hover:text-white transition-colors"
                        >
                            Contact Me
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
}