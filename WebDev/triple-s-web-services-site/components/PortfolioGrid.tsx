"use client";

import { FiExternalLink, FiGithub } from "react-icons/fi";

export default function PortfolioGrid() {
    const projects = [
        {
            title: "Property Management Portal",
            description: "A full-stack dashboard and maintenance application for a residential complex. Features custom role-based access control, secure tenant data routing, and automated request tracking.",
            techStack: ["React", "Node.js", "MongoDB", "AWS Amplify"],
            gradient: "from-blue-500 to-cyan-400",
        },
        {
            title: "Subliminal Sarcasm Studios",
            description: "The official corporate hub for an independent game development studio. Engineered for lightning-fast media asset delivery and global distribution using advanced edge caching.",
            techStack: ["Next.js", "Tailwind CSS", "AWS CloudFront", "S3"],
            gradient: "from-emerald-500 to-teal-400",
        },
        {
            title: "Project Aegis: Promotional Experience",
            description: "A highly interactive, conversion-optimized landing page for an upcoming FPS/Tower Defense hybrid title. Features complex scroll animations and embedded media to drive user acquisition.",
            techStack: ["React", "Framer Motion", "Tailwind CSS"],
            gradient: "from-purple-500 to-pink-400",
        },
    ];

    return (
        <div className="w-full max-w-6xl mx-auto my-24 relative z-10 px-6 sm:px-0">
            <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-5xl font-bold text-white mb-4 font-sans tracking-tight">
                    Recent_Engineering
                </h2>
                <p className="text-slate-400 font-mono text-sm max-w-2xl mx-auto">
                    // A selection of full-stack architectures and high-performance interfaces.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project, index) => (
                    <div
                        key={index}
                        className="group relative bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-600 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex flex-col h-full"
                    >
                        {/* Mock Image / Gradient Header */}
                        <div className={`h-48 w-full bg-gradient-to-br ${project.gradient} opacity-80 group-hover:opacity-100 transition-opacity duration-300 relative overflow-hidden`}>
                            {/* Subtle grid overlay to make it look technical */}
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 mix-blend-overlay"></div>
                        </div>

                        {/* Card Content */}
                        <div className="p-6 flex flex-col flex-grow text-center">
                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                                {project.title}
                            </h3>
                            <p className="text-slate-400 text-sm mb-6 flex-grow leading-relaxed text-left">
                                {project.description}
                            </p>

                            {/* Tech Stack Tags - NOW CENTERED */}
                            <div className="flex flex-wrap justify-center gap-2 mb-6">
                                {project.techStack.map((tech, i) => (
                                    <span key={i} className="px-2 py-1 rounded-md bg-slate-800/50 border border-slate-700 text-xs font-mono text-slate-300">
                    {tech}
                  </span>
                                ))}
                            </div>

                            {/* Action Links */}
                            <div className="flex justify-center gap-4 border-t border-slate-800 pt-4 mt-auto">
                                <button className="flex items-center gap-2 text-sm font-mono text-slate-400 hover:text-white transition-colors">
                                    <FiExternalLink /> View_Live
                                </button>
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