import Navbar from '@/components/Navbar';
import Image from 'next/image';
import Link from 'next/link';

// Mock Data - You will eventually replace this with real database data
const units = [
    {
        id: 1,
        name: "The Saratoga",
        type: "2 Bedroom Townhouse",
        sqft: 1200,
        price: 1850,
        baths: 1.5,
        availability: "Available Now",
        image: "/images/floorplan-2bed.jpg", // Make sure this image exists!
        tourLink: "#", // You will put your Zillow/Marzipano link here later
        features: ["Private Entrance", "Granite Countertops", "Patio"]
    },
    {
        id: 2,
        name: "The Adirondack",
        type: "2 Bed End-Unit",
        sqft: 1350,
        price: 2100,
        baths: 2,
        availability: "Waitlist",
        image: "/images/floorplan-3bed.jpg",
        tourLink: "#",
        features: ["Attached Garage", "Fireplace", "Corner Unit"]
    },
    {
        id: 3,
        name: "The Champlain",
        type: "3 Bedroom Estate",
        sqft: 1600,
        price: 2450,
        baths: 2.5,
        availability: "Sept 1st",
        image: "/images/floorplan-3bed.jpg",
        tourLink: "#",
        features: ["2-Car Garage", "Master Suite", "Walk-in Closets"]
    }
];

export default function FloorPlans() {
    return (
        <main className="min-h-screen bg-slate-50">
            {/* Re-use Navbar, but force it to have a dark background since we don't have a hero image here */}
            <div className="bg-slate-900 pb-20">
                <Navbar />
                <div className="container mx-auto px-6 pt-32 pb-10 text-center text-white">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Floor Plans</h1>
                    <p className="text-slate-400 max-w-xl mx-auto">
                        Discover our spacious townhouse layouts, designed for modern living and comfort.
                    </p>
                </div>
            </div>

            {/* Plans Grid */}
            <section className="container mx-auto px-6 -mt-16 pb-24 relative z-10">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {units.map((unit) => (
                        <div key={unit.id} className="bg-white rounded-xl shadow-xl overflow-hidden hover:-translate-y-2 transition-transform duration-300">

                            {/* Image Area */}
                            <div className="relative h-64 bg-slate-100 border-b border-slate-100">
                                <div className="absolute top-4 right-4 z-10">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                      unit.availability === "Available Now" ? "bg-green-100 text-green-800" :
                          unit.availability === "Waitlist" ? "bg-orange-100 text-orange-800" : "bg-blue-100 text-blue-800"
                  }`}>
                    {unit.availability}
                  </span>
                                </div>
                                <Image
                                    src={unit.image}
                                    alt={unit.name}
                                    fill
                                    className="object-contain p-6"
                                />
                            </div>

                            {/* Content Area */}
                            <div className="p-8">
                                <div className="flex justify-between items-baseline mb-2">
                                    <h3 className="text-2xl font-serif text-slate-900">{unit.name}</h3>
                                    <span className="text-xl font-bold text-slate-900">${unit.price}</span>
                                </div>
                                <p className="text-slate-500 text-sm font-bold uppercase tracking-wide mb-4">{unit.type}</p>

                                {/* Stats Row */}
                                <div className="flex justify-between text-slate-600 text-sm mb-6 border-y border-slate-100 py-4">
                                    <span>{unit.sqft} Sq Ft</span>
                                    <span>{unit.baths} Bath</span>
                                    <span>Garage</span>
                                </div>

                                {/* Features List */}
                                <ul className="mb-8 space-y-2">
                                    {unit.features.map(feature => (
                                        <li key={feature} className="text-slate-500 text-sm flex items-center">
                                            <span className="w-1.5 h-1.5 bg-gold-400 rounded-full mr-2"></span>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                {/* Buttons */}
                                <div className="grid grid-cols-2 gap-4">
                                    <button className="px-4 py-3 border border-slate-300 text-slate-700 font-semibold hover:border-slate-900 hover:bg-slate-50 transition-colors">
                                        3D Tour
                                    </button>
                                    <Link href="/contact" className="px-4 py-3 bg-slate-900 text-white font-semibold text-center hover:bg-gold-600 transition-colors">
                                        Apply Now
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}