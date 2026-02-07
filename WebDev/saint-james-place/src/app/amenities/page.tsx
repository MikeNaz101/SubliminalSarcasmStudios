import Navbar from '@/components/Navbar';
import Image from 'next/image';
import Link from 'next/link';

export default function Amenities() {
    return (
        <main className="min-h-screen bg-slate-50">
            <Navbar />

            {/* --- HERO SECTION --- */}
            <section className="relative h-[60vh] flex items-center justify-center">
                <div className="absolute inset-0 bg-slate-900">
                    {/* Placeholder for Amenities Hero Image */}
                    <Image
                        src="/images/amenity-hero.jpg"
                        alt="Saint James Place Lifestyle"
                        fill
                        className="object-cover opacity-40"
                    />
                </div>
                <div className="relative z-10 text-center text-white max-w-3xl px-4">
                    <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">Elevated Living</h1>
                    <p className="text-xl text-slate-200">
                        More than just an apartment. A private sanctuary designed for your peace of mind.
                    </p>
                </div>
            </section>

            {/* --- FEATURE 1: PRIVACY --- */}
            <section className="py-20 px-6 bg-white">
                <div className="container mx-auto grid md:grid-cols-2 gap-16 items-center">
                    <div className="order-2 md:order-1 relative h-[500px] rounded-lg overflow-hidden shadow-2xl">
                        <Image
                            src="/images/exterior-privacy.jpg"
                            alt="Private Entrance"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="order-1 md:order-2 space-y-6">
                        <span className="text-gold-500 font-bold tracking-widest uppercase text-sm">True Privacy</span>
                        <h2 className="text-4xl font-serif text-slate-900">No Neighbors Above or Below</h2>
                        <p className="text-slate-600 leading-relaxed text-lg">
                            Experience the quiet of townhouse living. Unlike standard apartments, our units feature
                            private entrances and multi-floor layouts, ensuring you never have to worry about footsteps overhead.
                        </p>
                        <ul className="space-y-3 pt-4">
                            <li className="flex items-center text-slate-700">
                                <span className="text-gold-500 text-xl mr-3">✓</span> Private Front Door
                            </li>
                            <li className="flex items-center text-slate-700">
                                <span className="text-gold-500 text-xl mr-3">✓</span> Sound-Dampening Construction
                            </li>
                            <li className="flex items-center text-slate-700">
                                <span className="text-gold-500 text-xl mr-3">✓</span> Private Patio Space
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* --- FEATURE 2: CONVENIENCE --- */}
            <section className="py-20 px-6 bg-slate-100">
                <div className="container mx-auto grid md:grid-cols-2 gap-16 items-center">
                    <div className="space-y-6">
                        <span className="text-gold-500 font-bold tracking-widest uppercase text-sm">Everyday Ease</span>
                        <h2 className="text-4xl font-serif text-slate-900">Attached Garages & Parking</h2>
                        <p className="text-slate-600 leading-relaxed text-lg">
                            Say goodbye to scraping ice off your car in the Upstate winter.
                            Our townhomes feature attached garages and private driveways,
                            giving you direct access from your car to your kitchen.
                        </p>
                        <Link href="/floorplans" className="inline-block mt-4 text-slate-900 font-bold border-b-2 border-gold-500 hover:text-gold-600 transition-colors">
                            View Layouts with Garages →
                        </Link>
                    </div>
                    <div className="relative h-[500px] rounded-lg overflow-hidden shadow-2xl">
                        <Image
                            src="/images/garage-interior.jpg"
                            alt="Garage and Driveway"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
            </section>

            {/* --- AMENITY GRID --- */}
            <section className="py-24 px-6 bg-slate-900 text-white text-center">
                <div className="container mx-auto">
                    <h2 className="text-3xl font-serif mb-16">Community Features</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                        {/* Item 1 */}
                        <div className="space-y-4">
                            <div className="w-16 h-16 bg-gold-500 rounded-full mx-auto flex items-center justify-center text-3xl">
                                ❄️
                            </div>
                            <h3 className="font-bold text-lg">Snow Removal</h3>
                            <p className="text-slate-400 text-sm">Full service landscaping and winter maintenance included.</p>
                        </div>
                        {/* Item 2 */}
                        <div className="space-y-4">
                            <div className="w-16 h-16 bg-gold-500 rounded-full mx-auto flex items-center justify-center text-3xl">
                                🐱
                            </div>
                            <h3 className="font-bold text-lg">Pet Friendly</h3>
                            <p className="text-slate-400 text-sm">We welcome cats and small dogs. (Restrictions apply).</p>
                        </div>
                        {/* Item 3 */}
                        <div className="space-y-4">
                            <div className="w-16 h-16 bg-gold-500 rounded-full mx-auto flex items-center justify-center text-3xl">
                                🧺
                            </div>
                            <h3 className="font-bold text-lg">In-Unit Laundry</h3>
                            <p className="text-slate-400 text-sm">Washer and dryer hookups in every single unit.</p>
                        </div>
                        {/* Item 4 */}
                        <div className="space-y-4">
                            <div className="w-16 h-16 bg-gold-500 rounded-full mx-auto flex items-center justify-center text-3xl">
                                📍
                            </div>
                            <h3 className="font-bold text-lg">Prime Location</h3>
                            <p className="text-slate-400 text-sm">Minutes from I-87, Aviation Mall, and Lake George.</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}