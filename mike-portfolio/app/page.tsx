// src/app/page.tsx
import Navbar from "@/components/Navbar";
import ParticleBackground from "@/components/ParticleBackground"; // IMPORT THE PARTICLES
import { projects } from "@/data/projects";
import { Github, ExternalLink, ChevronRight } from "lucide-react";
import Image from "next/image";

export default function Home() {
    return (
        <main className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-blue-500/30 relative z-0">

            {/* The Particle Effect Component */}
            <ParticleBackground />

            <Navbar />

            <section className="px-6 max-w-5xl mx-auto pb-20 relative z-10">

                {/* HEADER: Updated to mention both branches of the LLC */}
                <div className="pt-28 pb-8 min-h-[20vh] flex flex-col justify-end">
                    <h1 className="text-5xl font-black tracking-tight mb-4 text-white">Projects</h1>
                    <p className="text-xl text-zinc-400 max-w-2xl leading-relaxed">
                        A selection of my work in game development, VR research, and full-stack engineering under my LLC, featuring projects from <strong className="text-zinc-200 font-semibold">Subliminal Sarcasm Studios</strong> and <strong className="text-zinc-200 font-semibold">Triple S Web Services</strong>.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {projects.map((project, index) => (
                        <div
                            key={index}
                            /* Added backdrop-blur-sm and a slightly transparent background (bg-zinc-900/90) so the particles subtly show through the cards */
                            className="bg-zinc-900/90 backdrop-blur-sm border-2 border-zinc-800 rounded-none shadow-[4px_4px_0px_0px_rgba(59,130,246,0.15)] hover:border-blue-500/50 hover:shadow-[4px_4px_0px_0px_rgba(59,130,246,0.3)] transition-all flex flex-col h-[55vh] min-h-[550px] overflow-hidden"
                        >
                            {/* MEDIA */}
                            {project.video ? (
                                <div className="w-full h-[40%] min-h-[200px] relative border-b-2 border-zinc-800 bg-black shrink-0">
                                    <video
                                        src={project.video}
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity"
                                    />
                                </div>
                            ) : project.image ? (
                                <div className="w-full h-[40%] min-h-[200px] relative border-b-2 border-zinc-800 bg-zinc-950 shrink-0">
                                    <Image
                                        src={project.image}
                                        alt={`${project.title} screenshot`}
                                        fill
                                        className="object-cover opacity-90 hover:opacity-100 transition-opacity"
                                    />
                                </div>
                            ) : (
                                <div className="w-full h-[40%] min-h-[200px] relative border-b-2 border-zinc-800 bg-zinc-950 shrink-0 flex items-center justify-center">
                                    <span className="text-zinc-700 font-mono text-sm">No Media</span>
                                </div>
                            )}

                            {/* CONTENT */}
                            <div className="p-6 md:p-8 flex flex-col flex-grow overflow-y-auto custom-scrollbar">
                                <div className="mb-4">
                                    <div className="flex justify-between items-start mb-2">
                                        <h2 className="text-2xl font-bold tracking-tight text-white">{project.title}</h2>
                                        <div className="flex gap-3 shrink-0">
                                            {project.github && (
                                                <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-colors">
                                                    <Github size={22} />
                                                </a>
                                            )}
                                            {project.link && (
                                                <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-colors">
                                                    <ExternalLink size={22} />
                                                </a>
                                            )}
                                        </div>
                                    </div>

                                    {project.role && (
                                        <p className="text-sm font-semibold text-blue-400 uppercase tracking-wider mb-3">
                                            {project.role}
                                        </p>
                                    )}

                                    <p className="text-zinc-400 leading-relaxed text-sm md:text-base">
                                        {project.description}
                                    </p>
                                </div>

                                {project.contributions && project.contributions.length > 0 && (
                                    <div className="mt-auto pt-4 border-t border-zinc-800">
                                        <h3 className="text-sm font-bold text-zinc-200 mb-2 flex items-center">
                                            <ChevronRight size={16} className="text-blue-500 mr-1 shrink-0" />
                                            Key Contributions
                                        </h3>
                                        <ul className="space-y-1.5 mb-4">
                                            {project.contributions.map((contribution, idx) => (
                                                <li key={idx} className="text-sm text-zinc-400 pl-5 relative before:content-[''] before:absolute before:left-1.5 before:top-2 before:w-1.5 before:h-1.5 before:bg-zinc-600 before:rounded-full">
                                                    {contribution}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Tech Stack Pills */}
                                <div className={`${(!project.contributions || project.contributions.length === 0) ? 'mt-auto pt-4 border-t border-zinc-800' : ''} flex flex-wrap gap-2`}>
                                    {project.techStack.map((tech) => (
                                        <span key={tech} className="px-2.5 py-1 bg-zinc-800/80 backdrop-blur-sm text-zinc-300 border border-zinc-700 text-xs font-medium rounded-sm">
                      {tech}
                    </span>
                                    ))}
                                </div>

                            </div>

                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}