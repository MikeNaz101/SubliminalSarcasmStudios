"use client";

import Link from "next/link";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { data: session } = useSession();

    // Helper to close the menu when a link is clicked on mobile
    const closeMenu = () => setIsOpen(false);

    return (
        <nav className="bg-[#0b1120] text-white w-full z-50 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-24">

                    {/* LOGO */}
                    <Link href="/" className="flex-shrink-0 flex flex-col justify-center" onClick={closeMenu}>
            <span className="font-serif text-2xl font-bold tracking-widest uppercase leading-tight">
              Saint James
            </span>
                        <span className="font-serif text-2xl font-bold tracking-widest uppercase leading-tight">
              Place
            </span>
                    </Link>

                    {/* DESKTOP MENU (Hidden on Mobile) */}
                    <div className="hidden lg:flex items-center space-x-8">
                        <Link href="/" className="text-sm font-bold tracking-widest uppercase hover:text-gold-500 transition-colors">Home</Link>
                        <Link href="/floor-plans" className="text-sm font-bold tracking-widest uppercase hover:text-gold-500 transition-colors">Floor Plans</Link>
                        <Link href="/amenities" className="text-sm font-bold tracking-widest uppercase hover:text-gold-500 transition-colors">Amenities</Link>
                        <Link href="/gallery" className="text-sm font-bold tracking-widest uppercase hover:text-gold-500 transition-colors">Gallery</Link>

                        {/* Auth Section */}
                        {session ? (
                            <div className="flex items-center space-x-6 border-l border-slate-700 pl-6">
                                <span className="text-sm text-slate-400">Hi, {session.user?.name?.split(" ")[0]}</span>
                                <button onClick={() => signOut({ callbackUrl: '/' })} className="text-sm font-bold tracking-widest uppercase text-slate-400 hover:text-white transition-colors">
                                    Sign Out
                                </button>
                                <Link href="/dashboard" className="text-sm font-bold tracking-widest uppercase hover:text-gold-500 transition-colors">
                                    Dashboard
                                </Link>
                            </div>
                        ) : (
                            <div className="border-l border-slate-700 pl-6">
                                <Link href="/auth/signin" className="text-sm font-bold tracking-widest uppercase hover:text-gold-500 transition-colors">
                                    Resident Login
                                </Link>
                            </div>
                        )}

                        {/* CTA Button */}
                        <Link href="/contact" className="bg-[#c59f27] text-slate-900 px-6 py-3 font-bold uppercase tracking-wide text-sm hover:bg-yellow-500 transition-colors">
                            Check Availability
                        </Link>
                    </div>

                    {/* MOBILE HAMBURGER BUTTON (Hidden on Desktop) */}
                    <div className="lg:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-white hover:text-gray-300 focus:outline-none p-2"
                        >
                            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {isOpen ? (
                                    // "X" Icon
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    // "Hamburger" Icon
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* MOBILE MENU DROPDOWN */}
            {isOpen && (
                <div className="lg:hidden bg-[#0b1120] border-t border-slate-800 shadow-xl absolute w-full left-0">
                    <div className="px-4 pt-4 pb-6 space-y-4 flex flex-col">
                        <Link href="/" onClick={closeMenu} className="block text-base font-bold tracking-widest uppercase hover:text-gold-500">Home</Link>
                        <Link href="/floor-plans" onClick={closeMenu} className="block text-base font-bold tracking-widest uppercase hover:text-gold-500">Floor Plans</Link>
                        <Link href="/amenities" onClick={closeMenu} className="block text-base font-bold tracking-widest uppercase hover:text-gold-500">Amenities</Link>
                        <Link href="/gallery" onClick={closeMenu} className="block text-base font-bold tracking-widest uppercase hover:text-gold-500">Gallery</Link>

                        <div className="border-t border-slate-700 pt-4 mt-2 space-y-4">
                            {session ? (
                                <>
                                    <span className="block text-base text-slate-400">Hi, {session.user?.name?.split(" ")[0]}</span>
                                    <Link href="/dashboard" onClick={closeMenu} className="block text-base font-bold tracking-widest uppercase hover:text-gold-500">Dashboard</Link>
                                    <button onClick={() => { signOut({ callbackUrl: '/' }); closeMenu(); }} className="block w-full text-left text-base font-bold tracking-widest uppercase text-slate-400 hover:text-white">
                                        Sign Out
                                    </button>
                                </>
                            ) : (
                                <Link href="/auth/signin" onClick={closeMenu} className="block text-base font-bold tracking-widest uppercase hover:text-gold-500">
                                    Resident Login
                                </Link>
                            )}
                        </div>

                        <div className="pt-4">
                            <Link href="/contact" onClick={closeMenu} className="block text-center w-full bg-[#c59f27] text-slate-900 px-6 py-4 font-bold uppercase tracking-wide text-sm">
                                Check Availability
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}