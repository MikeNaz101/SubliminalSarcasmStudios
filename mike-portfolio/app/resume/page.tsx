// src/app/resume/page.tsx
import Navbar from "@/components/Navbar";
import { Download, Briefcase, GraduationCap, Trophy } from "lucide-react";

export default function ResumePage() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 pb-20">
      <Navbar />
      
      <section className="pt-32 px-6 max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold">Resume</h1>
          <a 
            href="/resume.pdf" 
            download 
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Download size={18} /> Download PDF
          </a>
        </div>

        <div className="space-y-12">
          {/* Education Section */}
          <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <GraduationCap className="text-blue-600" size={24} />
              <h2 className="text-2xl font-bold">Education</h2>
            </div>
            
            <div className="mb-6">
              <div className="flex justify-between items-baseline mb-2">
                <h3 className="text-xl font-semibold">University at Albany, SUNY</h3>
                <span className="text-gray-500 text-sm">Expected 2026</span>
              </div>
              <p className="text-gray-700">Bachelor of Science in Computer Science</p>
              <p className="text-gray-600 mt-2 text-sm">
                Relevant Coursework: Systems Programming, Operating Systems, Data Structures, Algorithms.
              </p>
            </div>
          </div>

          {/* Experience Section */}
          <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <Briefcase className="text-blue-600" size={24} />
              <h2 className="text-2xl font-bold">Professional Experience</h2>
            </div>

            {/* Role 1 */}
            <div className="mb-8 border-b border-gray-100 pb-8 last:border-0 last:pb-0">
              <div className="flex justify-between items-baseline mb-2">
                <h3 className="text-xl font-semibold">Founder & Lead Developer</h3>
                <span className="text-gray-500 text-sm">Aug 2025 - Present</span>
              </div>
              <p className="text-blue-600 mb-3 font-medium">Subliminal Sarcasm Studios, LLC</p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Established an indie game studio in New York, managing business formation and branding.</li>
                <li>Developing "The Donner Party... Game?", a multiplayer MERN stack survival game.</li>
                <li>Designed website infrastructure and company portfolio.</li>
              </ul>
            </div>

            {/* Role 2 */}
            <div className="mb-8 border-b border-gray-100 pb-8 last:border-0 last:pb-0">
              <div className="flex justify-between items-baseline mb-2">
                <h3 className="text-xl font-semibold">Digital Content Creator Student Assistant</h3>
                <span className="text-gray-500 text-sm">Jan 2025 - Present</span>
              </div>
              <p className="text-blue-600 mb-3 font-medium">University at Albany College Library</p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Assisting in the creation of digital assets for library services.</li>
                <li>Researched and implemented VR de-escalation training simulations presented at ASIS&T 2025.</li>
              </ul>
            </div>
          </div>

          {/* Leadership Section */}
          <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <Trophy className="text-blue-600" size={24} />
              <h2 className="text-2xl font-bold">Leadership</h2>
            </div>
            
            <div>
              <div className="flex justify-between items-baseline mb-2">
                <h3 className="text-xl font-semibold">Treasurer</h3>
                <span className="text-gray-500 text-sm">Feb 2025 - Present</span>
              </div>
              <p className="text-blue-600 mb-2 font-medium">UAlbany Game Design Club</p>
              <p className="text-gray-600">Managing club finances and organizing game jams and workshops for student developers.</p>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}