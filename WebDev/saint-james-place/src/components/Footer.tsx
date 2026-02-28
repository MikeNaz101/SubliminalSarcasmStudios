import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-[#0b1120] text-white py-16 border-t border-slate-800 relative overflow-hidden">
            {/* Subtle Top Border Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-gold-600/50 to-transparent"></div>

            <div className="container mx-auto px-6 grid md:grid-cols-4 gap-12 relative z-10">

                {/* Brand Column */}
                <div className="space-y-4">
                    <h3 className="text-2xl font-serif tracking-widest font-bold text-white">SAINT JAMES PLACE</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                        Luxury townhome living in the heart of Queensbury. Experience the perfect blend of comfort and convenience.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 className="text-gold-500 font-bold uppercase tracking-wider text-sm mb-6">Explore</h4>
                    <ul className="space-y-3 text-slate-300 text-sm">
                        <li><Link href="/" className="hover:text-gold-400 transition-colors">Home</Link></li>
                        <li><Link href="/floorplans" className="hover:text-gold-400 transition-colors">Floor Plans</Link></li>
                        <li><Link href="/amenities" className="hover:text-gold-400 transition-colors">Amenities</Link></li>
                        <li><Link href="/gallery" className="hover:text-gold-400 transition-colors">Gallery</Link></li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <h4 className="text-gold-500 font-bold uppercase tracking-wider text-sm mb-6">Location</h4>
                    <ul className="space-y-3 text-slate-300 text-sm">
                        <li>123 Saint James Place</li>
                        <li>Queensbury, NY 12804</li>
                    </ul>
                </div>

                {/* Office Hours */}
                <div>
                    <h4 className="text-gold-500 font-bold uppercase tracking-wider text-sm mb-6">Leasing Hours</h4>
                    <ul className="space-y-3 text-slate-300 text-sm">
                        <li className="flex justify-between border-b border-slate-800/70 pb-2"><span>Mon - Fri:</span> <span>9:00 AM - 5:00 PM</span></li>
                        <li className="flex justify-between border-b border-slate-800/70 pb-2"><span>Saturday:</span> <span>10:00 AM - 4:00 PM</span></li>
                        <li className="flex justify-between"><span>Sunday:</span> <span className="italic text-slate-500">Closed</span></li>
                    </ul>
                </div>
            </div>

            {/* Copyright & Agency Tag */}
            <div className="container mx-auto px-6 mt-16 pt-8 border-t border-slate-800 relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">

                {/* Standard Copyright */}
                <p className="text-slate-500 text-sm text-center md:text-left">
                    &copy; {new Date().getFullYear()} Saint James Place. All rights reserved.
                </p>

                {/* The "POP" Agency Tag */}
                <div className="flex items-center gap-2 text-sm text-slate-400 bg-slate-900/50 px-5 py-2.5 rounded-full border border-slate-700/50 backdrop-blur-md shadow-lg">
                    <span>Crafted by</span>
                    <a
                        href="https://tripleswebservices.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative group inline-flex items-center"
                    >
                        {/* Animated Glow Behind the Text */}
                        <span className="absolute -inset-2 bg-gradient-to-r from-gold-600 via-yellow-500 to-gold-400 rounded-lg blur-md opacity-0 group-hover:opacity-30 transition duration-500"></span>

                        {/* The Text Itself */}
                        <span className="relative bg-gradient-to-r from-gold-400 to-yellow-200 bg-clip-text text-transparent font-bold tracking-wide group-hover:from-yellow-200 group-hover:to-white transition-all duration-300">
                            Triple S Web Services
                        </span>

                        {/* Sliding External Link Icon */}
                        <svg
                            className="w-4 h-4 ml-1 text-gold-400 opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 relative"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                        </svg>
                    </a>
                </div>

            </div>
        </footer>
    );
}