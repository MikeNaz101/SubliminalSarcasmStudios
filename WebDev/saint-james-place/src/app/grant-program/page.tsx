import Navbar from '@/components/Navbar';
import Link from 'next/link';

// Extracted qualifications from your original site
const qualifications = [
    { title: "Military & Veterans", desc: "If you or a direct relative is a Veteran", icon: "🎖️" },
    { title: "First Responders", desc: "If you are a firefighter or first responder", icon: "🚒" },
    { title: "Youth Mentors", desc: "If you are a Youth Coach", icon: "哨" }, // Whistle emoji
    { title: "Educators", desc: "If you are a Teacher", icon: "📚" },
    { title: "Healthcare Heroes", desc: "If you are a Nurse or Doctor", icon: "🩺" },
    { title: "Academic Excellence", desc: "If your child is an Honor roll student", icon: "🎓" },
    { title: "Athletics", desc: "If you or your child is a Student Athlete", icon: "⚽" },
    { title: "Extracurriculars", desc: "If your child is a Student Activities Participant", icon: "🎨" },
    { title: "Widows & Widowers", desc: "If you are a Widow or a Widower", icon: "🕊️" },
];

export default function GrantProgram() {
    return (
        <main className="min-h-screen bg-slate-50">
            <Navbar />

            {/* --- HERO SECTION --- */}
            <section className="bg-slate-900 text-white py-20 px-6 border-b-8 border-gold-500">
                <div className="max-w-4xl mx-auto text-center space-y-6">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold leading-tight">
                        Hayes Group Good Citizen <br />
                        <span className="text-gold-500">Affordability Grant Program</span>
                    </h1>
                    <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                        Qualify for our Grant Lottery for Rent Reduction Assistance.
                    </p>
                </div>
            </section>

            {/* --- QUALIFICATIONS GRID --- */}
            <section className="py-20 px-6 max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-serif text-slate-900 mb-4">Who is Eligible?</h2>
                    <p className="text-slate-600">
                        You may qualify for rent reduction assistance if any of the following apply to you:
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {qualifications.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-gold-300 transition-all flex items-start space-x-4"
                        >
                            <div className="text-3xl bg-slate-50 p-3 rounded-full border border-slate-100">
                                {item.icon}
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900">{item.title}</h3>
                                <p className="text-slate-600 text-sm mt-1 leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* --- DISCLAIMER / FOOTER SECTION --- */}
            <section className="pb-24 px-6">
                <div className="max-w-4xl mx-auto bg-slate-200 p-8 rounded-2xl text-center border border-slate-300">
                    <div className="w-12 h-12 bg-slate-900 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-serif italic text-xl">
                        i
                    </div>
                    <p className="text-slate-700 leading-relaxed font-medium">
                        This Program is a Lottery, Self Funded by the Hayes Group, NOT a Government Program.
                        Hayes Group is proud to promote old fashioned American values that we believe make for a
                        better country and for a better Community.
                    </p>
                    <div className="mt-8">
                        <Link
                            href="/contact"
                            className="inline-block bg-slate-900 text-white font-bold uppercase tracking-widest text-sm px-8 py-4 rounded-full hover:bg-gold-500 hover:text-slate-900 transition-colors"
                        >
                            Inquire About The Grant
                        </Link>
                    </div>
                </div>
            </section>

        </main>
    );
}