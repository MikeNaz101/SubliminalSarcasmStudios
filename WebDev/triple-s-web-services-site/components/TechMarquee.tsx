"use client";

import { motion } from "framer-motion";
import { FaReact, FaNodeJs, FaAws } from "react-icons/fa";
import { SiNextdotjs, SiTypescript, SiTailwindcss, SiMongodb, SiSupabase, SiUnity } from "react-icons/si";
import { TbBrandCSharp } from "react-icons/tb";

export default function TechMarquee() {
    // We duplicate the array to create the seamless infinite loop effect
    const techStack = [
        { name: "Next.js", icon: <SiNextdotjs /> },
        { name: "React", icon: <FaReact /> },
        { name: "TypeScript", icon: <SiTypescript /> },
        { name: "Tailwind CSS", icon: <SiTailwindcss /> },
        { name: "Node.js", icon: <FaNodeJs /> },
        { name: "MongoDB", icon: <SiMongodb /> },
        { name: "Supabase", icon: <SiSupabase /> },
        { name: "AWS", icon: <FaAws /> },
        { name: "C#", icon: <TbBrandCSharp /> },
        { name: "Unity", icon: <SiUnity /> },
    ];

    const duplicatedStack = [...techStack, ...techStack];

    return (
        <div className="w-full bg-slate-950/50 border-y border-white/5 py-8 overflow-hidden relative z-10 flex items-center">

            {/* Left/Right Gradient Fades for a seamless entering/exiting effect */}
            <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-48 bg-gradient-to-r from-slate-950 to-transparent z-20"></div>
            <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-48 bg-gradient-to-l from-slate-950 to-transparent z-20"></div>

            <motion.div
                className="flex gap-16 sm:gap-24 items-center whitespace-nowrap"
                animate={{
                    x: ["0%", "-50%"],
                }}
                transition={{
                    ease: "linear",
                    duration: 30,
                    repeat: Infinity,
                }}
            >
                {duplicatedStack.map((tech, index) => (
                    <div
                        key={index}
                        className="flex items-center gap-3 text-slate-500 hover:text-emerald-400 transition-colors duration-300 group cursor-default"
                    >
            <span className="text-3xl sm:text-4xl opacity-70 group-hover:opacity-100 transition-opacity">
              {tech.icon}
            </span>
                        <span className="font-mono text-sm sm:text-base font-bold uppercase tracking-widest opacity-70 group-hover:opacity-100 transition-opacity">
              {tech.name}
            </span>
                    </div>
                ))}
            </motion.div>
        </div>
    );
}