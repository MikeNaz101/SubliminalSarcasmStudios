// src/app/projects/page.tsx
import Navbar from "@/components/Navbar";
import { projects } from "@/data/projects";
import { Github, ExternalLink } from "lucide-react";

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <Navbar />
      
      <section className="pt-32 pb-20 px-6 max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-12">Selected Projects</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <div key={index} className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold">{project.title}</h3>
                <div className="flex gap-3">
                  {project.github && (
                    <a href={project.github} target="_blank" className="text-gray-400 hover:text-black">
                      <Github size={20} />
                    </a>
                  )}
                  {project.link && (
                    <a href={project.link} target="_blank" className="text-gray-400 hover:text-blue-600">
                      <ExternalLink size={20} />
                    </a>
                  )}
                </div>
              </div>
              
              <p className="text-gray-600 mb-6 h-20">{project.description}</p>
              
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span key={tech} className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded-full">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}