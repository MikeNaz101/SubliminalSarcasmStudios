"use client";

export default function LighthouseBadge() {
    // The "Triple S" Methodology
    const pillars = [
        { label: "Speed", description: "Sub-second load times" },
        { label: "Security", description: "Enterprise-grade protection" },
        { label: "Scalability", description: "Built for infinite growth" },
    ];

    return (
        <div className="flex flex-col items-center my-12 z-10 relative">
            <div className="text-emerald-400 font-mono text-sm mb-6 tracking-widest uppercase opacity-80">
                The Triple-S Standard
            </div>

            <div className="flex flex-wrap justify-center gap-8 sm:gap-16">
                {pillars.map((item, index) => (
                    <div key={index} className="flex flex-col items-center gap-3">
                        {/* Glowing Checkmark Circle */}
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-[3px] border-emerald-500 text-emerald-400 flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.3)] bg-slate-950/80 backdrop-blur-md">
                            <svg
                                className="w-8 h-8 sm:w-10 sm:h-10 drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={3}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>

                        {/* Text Labels */}
                        <div className="text-center mt-2">
              <span className="block text-lg sm:text-xl font-bold text-white uppercase tracking-widest drop-shadow-md">
                {item.label}
              </span>
                            <span className="text-xs sm:text-sm text-slate-400 font-mono mt-1 block">
                {item.description}
              </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}