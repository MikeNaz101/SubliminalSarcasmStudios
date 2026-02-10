import Navbar from '@/components/Navbar';
import Link from 'next/link';
import Image from 'next/image';
import Landmarks from '@/components/Landmarks';

export default function Home() {
  return (
      <main className="min-h-screen bg-slate-50 text-slate-800 font-sans">
        <Navbar />

        {/* --- HERO SECTION --- */}
        <section className="relative h-screen flex items-center justify-center">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            {/* Replace src with your actual hero image path */}
            <Image
                src="/images/hero-exterior.jpg"
                alt="Saint James Place Exterior"
                fill
                className="object-cover"
                priority
            />
            <div className="absolute inset-0 bg-black/40" /> {/* Dark overlay for text readability */}
          </div>

          {/* Hero Content */}
          <div className="relative z-10 text-center text-white max-w-4xl px-4">
            <h2 className="text-lg md:text-xl uppercase tracking-[0.3em] mb-4">Luxury Townhouse Living</h2>
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-8 leading-tight">
              Welcome Home to <br /> <span className="text-yellow-500">Queensbury</span>
            </h1>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Link href="/floorplans" className="px-8 py-4 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold tracking-wide transition-all">
                View Floor Plans
              </Link>
              <Link href="/contact" className="px-8 py-4 border-2 border-white hover:bg-white hover:text-slate-900 text-white font-semibold tracking-wide transition-all">
                Schedule a Tour
              </Link>
            </div>
          </div>
        </section>

        {/* --- INTRO / LIFESTYLE SECTION --- */}
        <section className="py-20 px-6">
          <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-yellow-600 font-bold tracking-wider uppercase text-sm">Experience the Difference</h3>
              <h2 className="text-4xl font-serif text-slate-900">Elevated Living in Upstate NY</h2>
              <p className="text-slate-600 leading-relaxed">
                Saint James Place offers more than just an apartment; we offer a lifestyle.
                Enjoy the privacy of townhouse living with private entrances, attached garages,
                and a quiet community atmosphere, all just minutes from the excitement of Saratoga.
              </p>
              <ul className="grid grid-cols-2 gap-4 pt-4">
                {['Private Entrances', 'Attached Garages', 'Pet Friendly', 'In-Unit Laundry'].map((item) => (
                    <li key={item} className="flex items-center text-slate-700 font-medium">
                      <span className="w-2 h-2 bg-yellow-600 rounded-full mr-3"></span>
                      {item}
                    </li>
                ))}
              </ul>
            </div>
            {/* Feature Image */}
            <div className="relative h-[500px] w-full rounded-lg overflow-hidden shadow-2xl">
              <Image
                  src="/images/amenity-interior.jpg"
                  alt="Interior Living Room"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </section>

        {/* --- FEATURED FLOOR PLANS PREVIEW --- */}
        <section className="py-20 bg-slate-100">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-serif text-slate-900 mb-4">Our Residences</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Choose from our spacious layouts designed for modern comfort and style.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Example Card 1 */}
              <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group">
                <div className="relative h-64 bg-slate-200">
                  <Image src="/images/floorplan-2bed.jpg" alt="2 Bedroom Layout" fill className="object-contain p-4" />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-serif mb-2">The Saratoga</h3>
                  <p className="text-sm text-slate-500 uppercase tracking-wide mb-4">2 Bed | 2 Bath | 1,200 Sq Ft</p>
                  <div className="flex justify-between items-center border-t border-slate-100 pt-6">
                    <span className="text-xl font-bold text-slate-800">$1,850<span className="text-sm font-normal text-slate-500">/mo</span></span>
                    <Link href="/floorplans" className="text-yellow-600 font-semibold group-hover:text-yellow-700">
                      View Details →
                    </Link>
                  </div>
                </div>
              </div>

              {/* Duplicate for other cards... */}
              {/* Example Card 2 */}
              <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group">
                <div className="relative h-64 bg-slate-200">
                  <Image src="/images/floorplan-3bed.jpg" alt="3 Bedroom Layout" fill className="object-contain p-4" />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-serif mb-2">The Adirondack</h3>
                  <p className="text-sm text-slate-500 uppercase tracking-wide mb-4">3 Bed | 2.5 Bath | 1,500 Sq Ft</p>
                  <div className="flex justify-between items-center border-t border-slate-100 pt-6">
                    <span className="text-xl font-bold text-slate-800">$2,200<span className="text-sm font-normal text-slate-500">/mo</span></span>
                    <Link href="/floorplans" className="text-yellow-600 font-semibold group-hover:text-yellow-700">
                      View Details →
                    </Link>
                  </div>
                </div>
              </div>

              {/* Example Card 3 - "Coming Soon" or special unit */}
              <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group opacity-75">
                <div className="relative h-64 bg-slate-200 flex items-center justify-center">
                  <span className="text-slate-400 font-serif text-lg">Coming Soon</span>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-serif mb-2">The Estate</h3>
                  <p className="text-sm text-slate-500 uppercase tracking-wide mb-4">3 Bed | 3 Bath | 1,800 Sq Ft</p>
                  <div className="flex justify-between items-center border-t border-slate-100 pt-6">
                    <span className="text-xl font-bold text-slate-800">Inquire<span className="text-sm font-normal text-slate-500"></span></span>
                    <Link href="/contact" className="text-yellow-600 font-semibold group-hover:text-yellow-700">
                      Contact Us →
                    </Link>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        <section className="py-20 bg-white border-t border-slate-100">
          <div className="container mx-auto px-6">
            <Landmarks limit={4} />
            <div className="text-center mt-12">
              <Link href="/neighborhood" className="text-gold-600 font-bold border-b-2 border-gold-500 pb-1 hover:text-slate-900 transition-colors">
                EXPLORE THE FULL NEIGHBORHOOD →
              </Link>
            </div>
          </div>
        </section>
      </main>
  );
}