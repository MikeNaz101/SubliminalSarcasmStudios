"use client";
import Navbar from '@/components/Navbar';
import { useState, FormEvent } from 'react';
// Web3Forms Access Key = 8daef273-9bf6-4b8d-ad0e-2fa94c17d6a9
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
                <div className="bg-white rounded-xl shadow-2xl overflow-hidden grid md:grid-cols-2">

                    {/* LEFT: The Form (Your Requested Fields) */}
                    <div className="p-10 md:p-14">
                        <h2 className="text-3xl font-serif text-slate-900 mb-6">Let us know!</h2>

                        {result ? (
                            <div className="bg-green-50 border border-green-200 text-green-800 p-6 rounded-lg text-center">
                                <h3 className="font-bold text-xl mb-2">{result}</h3>
                                <button onClick={() => setResult("")} className="mt-4 text-sm font-bold underline">Send another</button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">

                                {/* 1. NAME */}
                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-slate-600 text-sm font-bold mb-2 uppercase tracking-wide">First Name *</label>
                                        <input name="first_name" required type="text" className="w-full bg-slate-50 border border-slate-200 p-3 rounded focus:outline-none focus:border-gold-500 transition-colors" />
                                    </div>
                                    <div>
                                        <label className="block text-slate-600 text-sm font-bold mb-2 uppercase tracking-wide">Last Name *</label>
                                        <input name="last_name" required type="text" className="w-full bg-slate-50 border border-slate-200 p-3 rounded focus:outline-none focus:border-gold-500 transition-colors" />
                                    </div>
                                </div>

                                {/* 2. PHONE */}
                                <div>
                                    <label className="block text-slate-600 text-sm font-bold mb-2 uppercase tracking-wide">Phone *</label>
                                    <input name="phone" required type="tel" className="w-full bg-slate-50 border border-slate-200 p-3 rounded focus:outline-none focus:border-gold-500 transition-colors" />
                                </div>

                                {/* 3. ASSISTANCE CHECKBOXES */}
                                <div>
                                    <label className="block text-slate-600 text-sm font-bold mb-3 uppercase tracking-wide">What can we assist you with?</label>
                                    <div className="space-y-3 pl-1">
                                        <label className="flex items-center space-x-3 cursor-pointer">
                                            <input type="checkbox" name="assistance" value="Guided Tour" className="w-5 h-5 text-gold-600 rounded focus:ring-gold-500" />
                                            <span className="text-slate-700">Taking a guided tour</span>
                                        </label>
                                        <label className="flex items-center space-x-3 cursor-pointer">
                                            <input type="checkbox" name="assistance" value="Learn More" className="w-5 h-5 text-gold-600 rounded focus:ring-gold-500" />
                                            <span className="text-slate-700">Learning more about renting with us</span>
                                        </label>
                                        <label className="flex items-center space-x-3 cursor-pointer">
                                            <input type="checkbox" name="assistance" value="Apply to Rent" className="w-5 h-5 text-gold-600 rounded focus:ring-gold-500" />
                                            <span className="text-slate-700">Applying to Rent</span>
                                        </label>
                                    </div>
                                </div>

                                {/* 4. REFERRAL DROPDOWN */}
                                <div>
                                    <label className="block text-slate-600 text-sm font-bold mb-2 uppercase tracking-wide">How did you hear about us?</label>
                                    <select name="referral" className="w-full bg-slate-50 border border-slate-200 p-3 rounded focus:outline-none focus:border-gold-500 transition-colors text-slate-600">
                                        <option value="">Select an option</option>
                                        <option value="Google">Google Search</option>
                                        <option value="Drive By">Drove By</option>
                                        <option value="Friend">Friend / Family</option>
                                        <option value="Zillow">Zillow / Apartments.com</option>
                                    </select>
                                </div>

                                {/* 5. MESSAGE */}
                                <div>
                                    <label className="block text-slate-600 text-sm font-bold mb-2 uppercase tracking-wide">Message</label>
                                    <textarea name="message" rows={4} className="w-full bg-slate-50 border border-slate-200 p-3 rounded focus:outline-none focus:border-gold-500 transition-colors" placeholder="Any specific questions?"></textarea>
                                </div>

                                <button
                                    type="submit"
                                    disabled={result === "Sending...."}
                                    className="w-full bg-slate-900 text-white font-bold py-4 hover:bg-gold-600 transition-colors disabled:opacity-50"
                                >
                                    {result === "Sending...." ? "Sending..." : "Submit Inquiry"}
                                </button>
                            </form>
                        )}
                    </div>

                    {/* RIGHT: The Info Panel (Kept the Luxury Look) */}
                    <div className="bg-slate-100 p-10 md:p-14 flex flex-col justify-center border-t md:border-t-0 md:border-l border-slate-200">
                        <div className="space-y-10">

                            <div>
                                <h3 className="text-gold-600 font-bold uppercase tracking-widest text-sm mb-2">Visit Us</h3>
                                <p className="text-2xl font-serif text-slate-900">Saint James Place</p>
                                <p className="text-slate-600 mt-2">
                                    123 Saint James Place<br />
                                    Queensbury, NY 12804
                                </p>
                            </div>

                            <div>
                                <h3 className="text-gold-600 font-bold uppercase tracking-widest text-sm mb-2">Contact</h3>
                                <p className="text-slate-600 text-lg mb-1">
                                    <span className="font-bold text-slate-900 block">Leasing Office:</span>
                                    (518) 555-0123
                                </p>
                                <p className="text-slate-600 text-lg">
                                    <span className="font-bold text-slate-900 block">Email:</span>
                                    leasing@saintjames.com
                                </p>
                            </div>

                            <div>
                                <h3 className="text-gold-600 font-bold uppercase tracking-widest text-sm mb-2">Hours</h3>
                                <ul className="text-slate-600 space-y-2">
                                    <li className="flex justify-between border-b border-slate-200 pb-2">
                                        <span>Monday - Friday</span>
                                        <span className="font-bold">9am - 5pm</span>
                                    </li>
                                    <li className="flex justify-between border-b border-slate-200 pb-2">
                                        <span>Saturday</span>
                                        <span className="font-bold">10am - 4pm</span>
                                    </li>
                                    <li className="flex justify-between pb-2">
                                        <span>Sunday</span>
                                        <span className="italic">By Appointment</span>
                                    </li>
                                </ul>
                            </div>

                        </div>
                    </div>

                </div>
            </section>
        </main>
    );
}