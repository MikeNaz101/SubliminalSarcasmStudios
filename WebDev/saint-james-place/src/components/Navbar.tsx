"use client";
import Link from 'next/link';
import AuthButtons from "@/components/auth/AuthButtons";
import { useState, useEffect } from 'react';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    // Effect to handle scroll transparency
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${
            scrolled ? 'bg-slate-900 shadow-md py-4' : 'bg-transparent py-6'
        }`}>
            <div className="container mx-auto px-6 flex justify-between items-center text-white">
                {/* Brand Logo - Serif font for luxury feel */}
                <Link href="/" className="text-2xl font-serif tracking-widest font-bold">
                    SAINT JAMES PLACE
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex space-x-8 uppercase text-sm tracking-wider font-medium">
                    <Link href="/" className="hover:text-gold-400 transition-colors">Home</Link>
                    <Link href="/floorplans" className="hover:text-gold-400 transition-colors">Floor Plans</Link>
                    <Link href="/amenities" className="hover:text-gold-400 transition-colors">Amenities</Link>
                    <Link href="/gallery" className="hover:text-gold-400 transition-colors">Gallery</Link>
                </div>

                {/* CTA Buttons */}
                <div className="hidden md:flex space-x-4">
                    <div className="hidden md:block">
                        <AuthButtons />
                    </div>
                    <Link href="/contact" className="px-5 py-2 bg-yellow-600 text-white text-sm font-semibold hover:bg-yellow-700 transition-all">
                        Check Availability
                    </Link>
                </div>

                {/* Mobile Menu Button (Hamburger) would go here */}
            </div>
        </nav>
    );
}