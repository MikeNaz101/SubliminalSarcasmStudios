export default function Navbar() {
    return (
        <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                <div className="text-2xl font-black text-blue-600 tracking-tighter">
                    ACCESS<span className="text-slate-900">STORAGE</span>
                </div>
                <div className="hidden md:flex gap-8 text-sm font-bold text-slate-600">
                    <a href="#units" className="hover:text-blue-600 transition-colors">Storage Units</a>
                    <a href="#facility" className="hover:text-blue-600 transition-colors">Our Facility</a>
                    <a href="#contact" className="hover:text-blue-600 transition-colors">Contact</a>
                </div>
                <button className="bg-slate-900 text-white px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-slate-800 transition-colors shadow-md">
                    Tenant Portal
                </button>
            </div>
        </nav>
    );
}