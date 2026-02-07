import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-slate-900 text-white py-16 border-t border-slate-800">
            <div className="container mx-auto px-6 grid md:grid-cols-4 gap-12">

                {/* Brand Column */}
                <div className="space-y-4">
                    <h3 className="text-2xl font-serif tracking-widest font-bold text-white">SAINT JAMES PLACE</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                        Luxury townhome living in the heart of Queensbury. Experience the perfect blend of comfort and convenience.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 className="text-gold-400 font-bold uppercase tracking-wider text-sm mb-6">Explore</h4>
                    <ul className="space-y-3 text-slate-300 text-sm">
                        <li><Link href="/" className="hover:text-gold-400 transition-colors">Home</Link></li>
                        <li><Link href="/floorplans" className="hover:text-gold-400 transition-colors">Floor Plans</Link></li>
                        <li><Link href="/amenities" className="hover:text-gold-400 transition-colors">Amenities</Link></li>
                        <li><Link href="/gallery" className="hover:text-gold-400 transition-colors">Gallery</Link></li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <h4 className="text-gold-400 font-bold uppercase tracking-wider text-sm mb-6">Contact Us</h4>
                    <ul className="space-y-3 text-slate-300 text-sm">
                        <li>123 Saint James Place</li>
                        <li>Queensbury, NY 12804</li>
                        <li className="pt-2"><a href="tel:5185550123" className="hover:text-white transition-colors">(518) 555-0123</a></li>
                    </ul>
                </div>

                {/* Office Hours */}
                <div>
                    <h4 className="text-gold-400 font-bold uppercase tracking-wider text-sm mb-6">Leasing Hours</h4>
                    <ul className="space-y-3 text-slate-300 text-sm">
                        <li className="flex justify-between"><span>Mon - Fri:</span> <span>9:00 AM - 5:00 PM</span></li>
                        <li className="flex justify-between"><span>Saturday:</span> <span>10:00 AM - 4:00 PM</span></li>
                        <li className="flex justify-between"><span>Sunday:</span> <span>Closed</span></li>
                    </ul>
                </div>
            </div>

            {/* Copyright */}
            <div className="container mx-auto px-6 mt-16 pt-8 border-t border-slate-800 text-center text-slate-500 text-xs">
                <p>&copy; {new Date().getFullYear()} Saint James Place. All rights reserved.</p>
            </div>
        </footer>
    );
}