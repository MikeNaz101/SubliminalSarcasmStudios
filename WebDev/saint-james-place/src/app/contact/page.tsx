"use client";
import Navbar from '@/components/Navbar';
import { useState, FormEvent } from 'react';

export default function Contact() {
    const [result, setResult] = useState("");

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setResult("Sending....");

        // 1. Gather the data manually to match our API structure
        const form = e.currentTarget;
        const formData = {
            firstName: (form.elements.namedItem('first_name') as HTMLInputElement).value,
            lastName: (form.elements.namedItem('last_name') as HTMLInputElement).value,
            phone: (form.elements.namedItem('phone') as HTMLInputElement).value,
            // Collect all checked checkboxes for "assistance"
            assistance: Array.from(form.querySelectorAll('input[name="assistance"]:checked'))
                .map((cb) => (cb as HTMLInputElement).value),
            referral: (form.elements.namedItem('referral') as HTMLSelectElement).value,
            message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
        };

        // 2. Send to our OWN backend
        const response = await fetch("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (data.success) {
            setResult("Message Sent Successfully!");
            (e.target as HTMLFormElement).reset();
        } else {
            setResult("Error sending message. Please try again.");
        }
    };

    return (
        <main className="min-h-screen bg-slate-50">
            <div className="bg-slate-900 pb-20">
                <Navbar />
                <div className="container mx-auto px-6 pt-32 pb-10 text-center text-white">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Contact Us</h1>
                    <p className="text-slate-400 max-w-xl mx-auto">
                        Ready to start your next chapter? Reach out to our leasing team today.
                    </p>
                </div>
            </div>

            <section className="container mx-auto px-6 -mt-16 pb-24 relative z-10">
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden grid md:grid-cols-5 border border-slate-200">

                    {/* LEFT: The Form (Takes up 3/5 of the grid on desktop) */}
                    <div className="p-10 md:p-14 md:col-span-3">
                        <h2 className="text-3xl font-serif text-slate-900 mb-6">Let us know!</h2>

                        {result ? (
                            <div className="bg-green-50 border border-green-200 text-green-800 p-6 rounded-lg text-center">
                                <h3 className="font-bold text-xl mb-2">{result}</h3>
                                <button onClick={() => setResult("")} className="mt-4 text-sm font-bold underline hover:text-green-600">Send another</button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">

                                {/* 1. NAME */}
                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-slate-600 text-xs font-bold mb-2 uppercase tracking-wider">First Name *</label>
                                        <input
                                            name="first_name"
                                            required
                                            type="text"
                                            className="w-full bg-slate-50 border border-slate-200 p-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 transition-all text-slate-900 placeholder-slate-400"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-slate-600 text-xs font-bold mb-2 uppercase tracking-wider">Last Name *</label>
                                        <input
                                            name="last_name"
                                            required
                                            type="text"
                                            className="w-full bg-slate-50 border border-slate-200 p-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 transition-all text-slate-900 placeholder-slate-400"
                                        />
                                    </div>
                                </div>

                                {/* 2. PHONE */}
                                <div>
                                    <label className="block text-slate-600 text-xs font-bold mb-2 uppercase tracking-wider">Phone *</label>
                                    <input
                                        name="phone"
                                        required
                                        type="tel"
                                        className="w-full bg-slate-50 border border-slate-200 p-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 transition-all text-slate-900 placeholder-slate-400"
                                    />
                                </div>

                                {/* 3. ASSISTANCE CHECKBOXES */}
                                <div>
                                    <label className="block text-slate-600 text-xs font-bold mb-4 uppercase tracking-wider">What can we assist you with?</label>
                                    <div className="space-y-3 pl-1">
                                        <label className="flex items-center space-x-3 cursor-pointer group">
                                            <div className="relative flex items-center justify-center">
                                                <input type="checkbox" name="assistance" value="Guided Tour" className="peer appearance-none w-5 h-5 border-2 border-slate-300 rounded cursor-pointer checked:bg-gold-600 checked:border-gold-600 transition-colors" />
                                                <svg className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path></svg>
                                            </div>
                                            <span className="text-slate-700 group-hover:text-slate-900 transition-colors">Taking a guided tour</span>
                                        </label>
                                        <label className="flex items-center space-x-3 cursor-pointer group">
                                            <div className="relative flex items-center justify-center">
                                                <input type="checkbox" name="assistance" value="Learn More" className="peer appearance-none w-5 h-5 border-2 border-slate-300 rounded cursor-pointer checked:bg-gold-600 checked:border-gold-600 transition-colors" />
                                                <svg className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path></svg>
                                            </div>
                                            <span className="text-slate-700 group-hover:text-slate-900 transition-colors">Learning more about renting with us</span>
                                        </label>
                                        <label className="flex items-center space-x-3 cursor-pointer group">
                                            <div className="relative flex items-center justify-center">
                                                <input type="checkbox" name="assistance" value="Apply to Rent" className="peer appearance-none w-5 h-5 border-2 border-slate-300 rounded cursor-pointer checked:bg-gold-600 checked:border-gold-600 transition-colors" />
                                                <svg className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path></svg>
                                            </div>
                                            <span className="text-slate-700 group-hover:text-slate-900 transition-colors">Applying to Rent</span>
                                        </label>
                                    </div>
                                </div>

                                {/* 4. REFERRAL DROPDOWN */}
                                <div>
                                    <label className="block text-slate-600 text-xs font-bold mb-2 uppercase tracking-wider">How did you hear about us?</label>
                                    <select
                                        name="referral"
                                        className="w-full bg-slate-50 border border-slate-200 p-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 transition-all text-slate-900"
                                    >
                                        <option value="" className="text-slate-400">Select an option...</option>
                                        <option value="Google">Google Search</option>
                                        <option value="Drive By">Drove By</option>
                                        <option value="Friend">Friend / Family</option>
                                        <option value="Zillow">Zillow / Apartments.com</option>
                                    </select>
                                </div>

                                {/* 5. MESSAGE */}
                                <div>
                                    <label className="block text-slate-600 text-xs font-bold mb-2 uppercase tracking-wider">Message</label>
                                    <textarea
                                        name="message"
                                        rows={4}
                                        className="w-full bg-slate-50 border border-slate-200 p-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 transition-all text-slate-900 placeholder-slate-400 resize-none"
                                        placeholder="Any specific questions?"
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    disabled={result === "Sending...."}
                                    className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-gold-600 transition-colors disabled:opacity-50 mt-4 tracking-wide uppercase text-sm shadow-md"
                                >
                                    {result === "Sending...." ? "Sending..." : "Submit Inquiry"}
                                </button>
                            </form>
                        )}
                    </div>

                    {/* RIGHT: The Info Panel (Luxury Redesign - Takes up 2/5 of the grid) */}
                    <div className="relative p-10 md:p-14 md:col-span-2 flex flex-col justify-center bg-slate-900 text-white overflow-hidden">

                        {/* Ambient Background Glows */}
                        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-gold-600/10 blur-3xl pointer-events-none"></div>
                        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-blue-500/10 blur-3xl pointer-events-none"></div>

                        <div className="relative z-10 space-y-12">

                            {/* Header Section */}
                            <div className="border-b border-slate-800 pb-8">
                                <h3 className="text-gold-400 font-bold uppercase tracking-widest text-xs mb-3">Leasing Center</h3>
                                <p className="text-3xl font-serif text-white mb-4">Saint James Place</p>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    Experience luxury townhome living. Our leasing professionals are here to help you find your perfect home.
                                </p>
                            </div>

                            {/* Visit Us */}
                            <div className="group">
                                <div className="flex items-center gap-4 mb-3">
                                    <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-gold-400 shadow-sm group-hover:scale-110 group-hover:bg-slate-700 transition-all">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                    </div>
                                    <h4 className="text-lg font-serif text-white tracking-wide">Visit Us</h4>
                                </div>
                                <div className="pl-14">
                                    <p className="text-slate-400 text-sm leading-relaxed">123 Saint James Place<br />Queensbury, NY 12804</p>
                                </div>
                            </div>

                            {/* Hours */}
                            <div className="group">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-gold-400 shadow-sm group-hover:scale-110 group-hover:bg-slate-700 transition-all">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                    </div>
                                    <h4 className="text-lg font-serif text-white tracking-wide">Office Hours</h4>
                                </div>
                                <div className="pl-14">
                                    <ul className="text-slate-400 text-sm space-y-3">
                                        <li className="flex justify-between border-b border-slate-800 pb-2">
                                            <span>Monday - Friday</span>
                                            <span className="text-white font-medium tracking-wide">9AM - 5PM</span>
                                        </li>
                                        <li className="flex justify-between border-b border-slate-800 pb-2">
                                            <span>Saturday</span>
                                            <span className="text-white font-medium tracking-wide">10AM - 4PM</span>
                                        </li>
                                        <li className="flex justify-between pb-2">
                                            <span>Sunday</span>
                                            <span className="text-gold-400 italic">By Appointment</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </section>
        </main>
    );
}