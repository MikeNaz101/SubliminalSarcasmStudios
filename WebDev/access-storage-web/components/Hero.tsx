export default function Hero() {
    return (
        <section className="relative bg-slate-900 text-white pt-24 pb-32 px-6 overflow-hidden">
            <div className="absolute inset-0 opacity-30 bg-[url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-transparent"></div>
            <div className="relative max-w-7xl mx-auto flex flex-col items-start z-10">
                <div className="inline-block bg-blue-500/20 text-blue-300 font-bold px-4 py-1.5 rounded-full text-sm mb-6 border border-blue-500/30">
                    📍 South Glens Falls, NY
                </div>
                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 max-w-3xl leading-tight">
                    Store your belongings with absolute <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300">peace of mind.</span>
                </h1>
                <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl leading-relaxed">
                    Upstate NY weather is unpredictable. Your storage shouldn't be. 100% climate-controlled, 24/7 video surveillance, and secure digital gate access.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                    <a href="#units" className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-500 transition-all text-center flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20">
                        View Available Units
                        <svg className="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                        </svg>
                    </a>
                    <button className="bg-white/10 text-white backdrop-blur-md border border-white/20 px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all text-center">
                        Call (518) 926-0231
                    </button>
                </div>
            </div>
        </section>
    );
}