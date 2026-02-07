// src/components/Navbar.tsx
import Link from 'next/link';
import { Github, Linkedin, Terminal } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="w-full fixed top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo / Name */}
        <Link href="/" className="font-bold text-xl tracking-tight hover:text-blue-600 transition-colors">
          Mike "NAZ" Nasierowski
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          <Link href="/" className="hover:text-black transition-colors">About</Link>
          <Link href="/projects" className="hover:text-black transition-colors">Projects</Link>
          {/* <Link href="/resume.pdf" className="hover:text-black transition-colors">Resume</Link> */}
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-4">
          <a href="https://github.com/mikenaz101" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-black">
            <Github size={20} />
          </a>
          <a href="https://linkedin.com/in/mike-nasierowski" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-600">
            <Linkedin size={20} />
          </a>
        </div>
      </div>
    </nav>
  );
}