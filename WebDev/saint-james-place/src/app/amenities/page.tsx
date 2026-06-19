import Navbar from '@/components/Navbar';
import Image from 'next/image';
import Link from 'next/link';

// Merged data from both your original code and the Squarespace content
const amenitiesList = [
    {
        title: "Brand New Town Homes",
        desc: "BRAND NEW properties! Be the first souls to reside in these luxurious town homes. Untouched by another person, live unblemished by traces of previous tenants.",
        icon: "✨"
    },
    {
        title: "Private Backyard",
        desc: "Every home has its own back door giving every Community Member access to their own private outdoor space.",
        icon: "🌳"
    },
    {
        title: "3 & 4 Bedroom Units",
        desc: "Spacious and modern styles with ample closet space. Strategic bedroom locations allow for flexible family arrangements.",
        icon: "🛏️"
    },
    {
        title: "Maximum Sound Proofing",
        desc: "Rest easy and worry not about hearing your neighbors. With thick sound proofing between each townhouse wall, it's like they don't even exist.",
        icon: "🔇"
    },
    {
        title: "Multiple Family Rooms",
        desc: "Separated by entire floors, families with children can enjoy the option of having a kids area or come together in the larger living room space.",
        icon: "🛋️"
    },
    {
        title: "Modern Seamless Flooring",
        desc: "Furnished with modern seamless flooring, making cleaning a breeze and giving you unprecedented control over allergies.",
        icon: "🧹"
    },
    {
        title: "Central Air & Heating",
        desc: "Setup with Energy Star Certified Central HVAC. Utilities will average 30% - 40% less than older properties.",
        icon: "❄️"
    },
    {
        title: "Washer & Dryer Hook-Ups",
        desc: "Each Townhouse is fitted with Washer and Dryer Hook-Ups for your ultimate convenience.",
        icon: "🧺"
    },
    {
        title: "Large Open Spaces",
        desc: "A large grassy area safe for children and families to enjoy the pure Adirondack air. Summer on fresh cut grass is paradise.",
        icon: "🏞️"
    },
    {
        title: "Family Fire Pits",
        desc: "Residential fire places are located on the outskirts of the grass fields. Private access is available at all times throughout the year.",
        icon: "🔥"
    },
    {
        title: "Pet Friendly",
        desc: "We welcome cats and small dogs. Your furry family members are welcome here. (Restrictions apply).",
        icon: "🐾"
    },
    {
        title: "Maintenance Free",
        desc: "Full service landscaping and winter snow removal are completely included.",
        icon: "🚜"
    }
];

export default function Amenities() {
    return (
        <main className="min-h-screen bg-slate-50">
            <Navbar />

            {/* --- HERO SECTION --- */}
            <section className="relative h-[60vh] flex items-center justify-center">
                <div className="absolute inset-0 bg-slate-900">
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

            {/* --- FEATURE 1: PRIVACY & SOUNDPROOFING --- */}
            <section className="py-20 px-6 bg-white">
                <div className="container mx-auto max-w-6xl grid md:grid-cols-2 gap-16 items-center">
                    <div className="order-2 md:order-1 relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
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
                            Experience the quiet of townhouse living. Unlike standard apartments, our brand new units feature
                            private entrances and multi-floor layouts, ensuring maximum privacy.
                        </p>
                        <ul className="space-y-4 pt-4">
                            <li className="flex items-start text-slate-700">
                                <span className="text-gold-500 text-xl mr-3 leading-none mt-1">✓</span>
                                <div>
                                    <strong className="block text-slate-900">Maximum Sound Proofing</strong>
                                    Thick sound dampening between each wall makes it feel like neighbors don't even exist.
                                </div>
                            </li>
                            <li className="flex items-start text-slate-700">
                                <span className="text-gold-500 text-xl mr-3 leading-none mt-1">✓</span>
                                <div>
                                    <strong className="block text-slate-900">Private Backyards</strong>
                                    Every home has its own back door giving you access to your own personal outdoor space.
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* --- FEATURE 2: CONVENIENCE & SPACE --- */}
            <section className="py-20 px-6 bg-slate-100">
                <div className="container mx-auto max-w-6xl grid md:grid-cols-2 gap-16 items-center">
                    <div className="space-y-6">
                        <span className="text-gold-500 font-bold tracking-widest uppercase text-sm">Everyday Ease</span>
                        <h2 className="text-4xl font-serif text-slate-900">Designed for Your Lifestyle</h2>
                        <p className="text-slate-600 leading-relaxed text-lg">
                            Say goodbye to fighting for a parking spot. Our townhomes feature your own personal driveway
                            steps away from your door. Inside, enjoy flexible layouts designed to accommodate families of all sizes.
                        </p>
                        <ul className="space-y-4 pt-4 pb-4">
                            <li className="flex items-start text-slate-700">
                                <span className="text-gold-500 text-xl mr-3 leading-none mt-1">✓</span>
                                <div>
                                    <strong className="block text-slate-900">Multiple Family Rooms</strong>
                                    Separate floors allow for dedicated kids' areas and main living spaces.
                                </div>
                            </li>
                            <li className="flex items-start text-slate-700">
                                <span className="text-gold-500 text-xl mr-3 leading-none mt-1">✓</span>
                                <div>
                                    <strong className="block text-slate-900">Energy Star Certified</strong>
                                    Central air and heating save you 30% - 40% on utilities compared to older properties.
                                </div>
                            </li>
                        </ul>
                        <Link href="/floorplans" className="inline-block text-slate-900 font-bold border-b-2 border-gold-500 hover:text-gold-600 transition-colors">
                            View Our Floor Plans →
                        </Link>
                    </div>
                    <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                        <Image
                            src="/images/private-driveway.jpg"
                            alt="Personal Driveway and Private Entrance"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
            </section>

            {/* --- FULL AMENITIES GRID --- */}
            <section className="py-24 px-6 bg-slate-900">
                <div className="container mx-auto max-w-7xl">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-serif text-white mb-4">Complete Community Features</h2>
                        <p className="text-slate-400 max-w-2xl mx-auto">
                            Everything you need for a comfortable, modern, and worry-free lifestyle in the Adirondacks.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {amenitiesList.map((item, index) => (
                            <div
                                key={index}
                                className="bg-slate-800 border border-slate-700 p-8 rounded-2xl hover:bg-slate-800/80 hover:-translate-y-1 transition-all duration-300"
                            >
                                <div className="text-4xl mb-4 bg-slate-900 w-16 h-16 rounded-full flex items-center justify-center border border-slate-700 shadow-inner">
                                    {item.icon}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">
                                    {item.title}
                                </h3>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}