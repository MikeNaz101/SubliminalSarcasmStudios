// src/app/page.tsx
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 max-w-5xl mx-auto">
        <div className="max-w-2xl">
          <h1 className="text-5xl font-extrabold tracking-tight mb-6">
            Hi, I'm Mike Naz.
          </h1>
          <h2 className="text-2xl text-gray-600 mb-8 font-light">
            Computer Science Student @ UAlbany & <br />
            Founder of <span className="font-semibold text-blue-600">Subliminal Sarcasm Studios</span>.
          </h2>
          <p className="text-lg text-gray-600 mb-10 leading-relaxed">
            I am a software engineer and game developer specializing in 
            <strong className="text-gray-900"> Unity, Unreal Engine, and VR/MR technologies</strong>. 
            Currently serving as Chair of the UAlbany ASIS&T Undergrad Chapter and working on 
            immersive research for library sciences.
          </p>
          
          <div className="flex gap-4">
            <Link 
              href="/projects" 
              className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-all"
            >
              View My Work <ArrowRight size={18} />
            </Link>
            <a 
              href="mailto:your-email@albany.edu" 
              className="inline-flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-all"
            >
              Contact Me
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}