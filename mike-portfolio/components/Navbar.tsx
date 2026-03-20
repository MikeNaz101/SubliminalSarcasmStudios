// src/components/Navbar.tsx
import Link from 'next/link';
import { Github, Linkedin } from 'lucide-react';

export default function Navbar() {
  return (
      <nav className="w-full fixed top-0 z-50 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo / Name */}
          <Link href="/" className="font-bold text-xl tracking-tight text-white hover:text-blue-500 transition-colors">
            Mike NAZ
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
            <Link href="/" className="hover:text-white transition-colors">Projects</Link>
            <Link href="/about" className="hover:text-white transition-colors">About</Link>
            <Link href="/resume" className="hover:text-white transition-colors">Resume</Link>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            <a href="https://github.com/yourgithub" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white transition-colors">
              <Github size={20} />
            </a>
            <a href="https://linkedin.com/in/yourlinkedin" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-blue-500 transition-colors">
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </nav>
  );
}