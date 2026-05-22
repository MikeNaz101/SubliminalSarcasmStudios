"use client";

import { FiExternalLink, FiGithub } from "react-icons/fi";

export default function PortfolioGrid() {
    const projects = [
        {
            title: "Saint James Place Portal",
            description: "A Progressive Web App (PWA) maintenance companion and management dashboard for a residential complex. Features secure tenant routing and automated request tracking.",
            techStack: ["React", "Node.js", "MongoDB", "AWS Amplify"],
            gradient: "from-blue-500 to-cyan-400",
            liveLink: "https://stjamespl.rentals",
        },
        {
            title: "Subliminal Sarcasm Studios",
            description: "The official corporate hub for an independent game development studio. Engineered for lightning-fast media asset delivery and global distribution using advanced edge caching.",
            techStack: ["Next.js", "Tailwind CSS", "AWS CloudFront"],
            gradient: "from-emerald-500 to-teal-400",
            liveLink: "https://subliminalsarcasmstudios.com/",
        },
        {
            title: "Access Storage Platform",
            description: "A high-performance digital storefront and customer portal for a self-storage facility. Optimized for local SEO, sub-second load times, and seamless user booking flows.",
            techStack: ["React", "Next.js", "AWS Amplify"],
            gradient: "from-cyan-500 to-blue-500",
            liveLink: "https://www.accessclimatecontrolledstorage.com/",
        },
        {
            title: "Ad-Opt GIS Dashboard",
            description: "Served as Lead Developer for a comprehensive 3D GIS visualization tool mapped to Albany, NY. Engineered to handle large-scale spatial data and interactive mapping features.",
            techStack: ["React", "WebGL", "Node.js", "AWS"],
            gradient: "from-amber-500 to-orange-400",
            liveLink: "https://main.d346s7bbuu124c.amplifyapp.com",
        },
        {
            title: "Scout & Route (XR Architecture)",
            description: "An award-winning XR hackathon project developed for Europa-Park. Focused on highly interactive spatial routing, augmented reality layers, and low-latency data fetching.",
            techStack: ["WebXR", "React", "AWS Amplify"],
            gradient: "from-indigo-500 to-blue-400",
            liveLink: "https://main.d19wjhq169xzv7.amplifyapp.com",
        },
        {
            title: "Real Estate AI Flow",
            description: "An automated data pipeline and analytics dashboard built for Hayes Properties. Designed to ingest, process, and visualize complex real estate metrics in real-time.",
            techStack: ["Next.js", "Python", "Supabase", "API Gateway"],
            gradient: "from-teal-500 to-emerald-400",
            liveLink: "https://main.d3jent6323q1c4.amplifyapp.com",
        },
        {
            title: "The Donner Party Game",
            description: "A high-concurrency, multiplayer web-based social survival game. Architected from the ground up featuring a real-time, low-latency WebSocket voting system.",
            techStack: ["React", "WebSockets", "Express.js"],
            gradient: "from-red-500 to-rose-400",
            liveLink: "https://subliminalsarcasmstudios.com/donner-party",
        },
        {
            title: "Void Runner Web Infrastructure",
            description: "Arcade-style 3D flying shooter with a heavy focus on procedural generation. Adapted complex Unity/C# rendering logic into a high-performance web environment.",
            techStack: ["Three.js", "React", "WebGL"],
            gradient: "from-violet-500 to-purple-400",
            liveLink: "https://subliminalsarcasmstudios.com/void-runner",
        },
        {
            title: "Tablet Commander",
            description: "A centralized, touch-optimized administrative dashboard. Built specifically for remote system administration, multi-device monitoring, and secure access control.",
            techStack: ["Next.js", "Tailwind CSS", "AWS CloudWatch"],
            gradient: "from-fuchsia-500 to-pink-400",
        },
        {
            title: "Project Aegis: Promotional Experience",
            description: "A highly interactive, conversion-optimized landing page for an upcoming FPS/Tower Defense hybrid title. Features complex scroll animations to drive user acquisition.",
            techStack: ["React", "Framer Motion", "Tailwind CSS"],
            gradient: "from-blue-600 to-indigo-500",
            liveLink: "https://subliminalsarcasmstudios.com/fptd-bugs",
        },
    ];

    return (
        <div id="work" className="w-full max-w-7xl mx-auto my-24 relative z-10 px-6 sm:px-0">
            <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-5xl font-bold text-white mb-4 font-sans tracking-tight">
                    Recent_Engineering
                </h2>
                <p className="text-slate-400 font-mono text-sm max-w-2xl mx-auto">
                    A selection of full-stack architectures, real-time applications, and high-performance interfaces.
                </p>
            </div>

            <div className="flex flex-wrap justify-center gap-8 items-stretch">
                {projects.map((project, index) => (
                    <div
                        key={index}
                        className="w-full md:w-[340px] lg:w-[380px] group relative bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-600 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex flex-col"
                    >
                        {/* Mock Image / Gradient Header */}
                        <div className={`h-40 sm:h-48 w-full bg-gradient-to-br ${project.gradient} opacity-80 group-hover:opacity-100 transition-opacity duration-300 relative overflow-hidden`}>
                            {/* Subtle grid overlay to make it look technical */}
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 mix-blend-overlay"></div>
                        </div>

                        {/* Card Content - ALL CENTERED */}
                        <div className="p-6 flex flex-col flex-grow items-center text-center">
                            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors">
                                {project.title}
                            </h3>
                            <p className="text-slate-400 text-sm mb-6 flex-grow leading-relaxed">
                                {project.description}
                            </p>

                            {/* Tech Stack Tags */}
                            <div className="flex flex-wrap justify-center gap-2 mb-6">
                                {project.techStack.map((tech, i) => (
                                    <span key={i} className="px-2 py-1 rounded-md bg-slate-800/50 border border-slate-700 text-xs font-mono text-slate-300">
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            {/* Action Links */}
                            <div className="flex justify-center gap-6 border-t border-slate-800 w-full pt-4 mt-auto">

                                {/* CONDITIONAL RENDER: Only shows if liveLink exists */}
                                {project.liveLink && (
                                    <a
                                        href={project.liveLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 text-sm font-mono text-slate-400 hover:text-white transition-colors"
                                    >
                                        <FiExternalLink /> View_Live
                                    </a>
                                )}

                                {/* You can do the exact same thing here with a githubLink property! */}
                                <button className="flex items-center gap-2 text-sm font-mono text-slate-400 hover:text-white transition-colors">
                                    <FiGithub /> Architecture
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}