"use client";
import React, { useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Marker, DirectionsRenderer } from '@react-google-maps/api';

// Defined Type to fix TS2339
type Landmark = {
    name: string;
    category: string;
    desc: string;
    img: string;
    coords: {
        lat: number;
        lng: number;
    };
};

// Saint James Place (Queensbury, NY) - Your Starting Point 43.30406854312871, -73.66632165029924
const SJP_LOCATION = { lat: 43.304069, lng: -73.666322 };

const allLandmarks: Landmark[] = [
    // --- POINTS OF CONVENIENCE ---
    { name: "Hannaford", category: "Services", coords: { lat: 43.30454, lng: -73.66166 }, desc: "Located exactly 0.2 miles from your front door. 4 minute walk.", img: "/images/hannaford.jpg" },
    { name: "Anytime Fitness Gym", category: "Health", coords: { lat: 43.30408, lng: -73.66245 }, desc: "24/7 gym located in the same plaza as Hannaford.", img: "/images/anytime.jpg" },
    { name: "CVS / Pharmacy", category: "Services", coords: { lat: 43.30291, lng: -73.66364 }, desc: "Located 0.2 miles away for all prescription needs. 5 minute walk.", img: "/images/cvs.jpg" },
    { name: "Glens Falls High School", category: "Education", coords: { lat: 43.30916, lng: -73.66128 }, desc: "Within a mile of the community, offering academic and athletic excellence.", img: "/images/school.jpg" },
    { name: "Hudson River Credit Union", category: "Services", coords: { lat: 43.30394, lng: -73.65870 }, desc: "Closest bank is only 0.4 miles away (9 minute walk).", img: "/images/bank.jpg" },
    { name: "WellNow - Urgent Care", category: "Health", coords: { lat: 43.30220, lng: -73.66231 }, desc: "Only a 7 minute walk, ensuring emergencies are solvable quickly.", img: "/images/wellnow.jpg" },
    { name: "Cool Beans Cafe", category: "Dining", coords: { lat: 43.30357, lng: -73.66309 }, desc: "Best coffee in the region! THE BIG BLT is a must try.", img: "/images/cool-beans.jpg" },
    { name: "Jim's Liquor", category: "Services", coords: { lat: 43.30416, lng: -73.66322 }, desc: "Located across from Hannaford for all spirits and supplies.", img: "/images/jims.jpg" },
    { name: "Child Care Center", category: "Education", coords: { lat: 43.30386, lng: -73.66374 }, desc: "Multiple options like Building Kids within a 4-minute walk.", img: "/images/childcare.jpg" },
    { name: "Taco Bell", category: "Dining", coords: { lat: 43.29696, lng: -73.68104 }, desc: "Only 1.2 miles away! A 24 minute walk for taco needs.", img: "/images/tacobell.jpg" },
    { name: "McDonalds", category: "Dining", coords: { lat: 43.29764, lng: -73.68077 }, desc: "Right across from Taco Bell, offering quick options.", img: "/images/mcdonalds.jpg" },
    { name: "Exit 18 of the Northway", category: "Services", coords: { lat: 43.29753, lng: -73.67908 }, desc: "Located only 0.3 miles from the Northway for effortless commuting.", img: "/images/exit18.jpg" },

    // --- POINTS OF INTEREST ---
    { name: "Lake George", category: "Outdoors", coords: { lat: 43.4262, lng: -73.7123 }, desc: "The edge of the Adirondacks, only 14 minutes away.", img: "/images/lake-george.jpg" },
    { name: "Saratoga Race Track", category: "Entertainment", coords: { lat: 43.0734, lng: -73.7663 }, desc: "World Famous Race Track open during the summer. 19 mins away.", img: "/images/saratoga-track.jpg" },
    { name: "West Mountain Ski Resort", category: "Outdoors", coords: { lat: 43.2985, lng: -73.7258 }, desc: "Skiing in winter and mountain sports in the summer. 7 min drive.", img: "/images/west-mtn.jpg" },
    { name: "Saratoga Racino", category: "Entertainment", coords: { lat: 43.0652, lng: -73.7695 }, desc: "Saratoga Hotel and Casino is only 3 exits South on the Northway.", img: "/images/racino.jpg" },
    { name: "Glens Falls Civic Center", category: "Entertainment", coords: { lat: 43.3088, lng: -73.6442 }, desc: "Vibrant hub hosting sports to local festivals.", img: "/images/civic-center.jpg" },
    { name: "Six Flags Great Escape", category: "Entertainment", coords: { lat: 43.34982, lng: -73.69247 }, desc: "Roller coasters and water park 2 exits north.", img: "/images/six-flags.jpg" },
    { name: "The Outlets", category: "Services", coords: { lat: 43.36377, lng: -73.70054 }, desc: "Top-brand shops for all attire needs. 7 exits away.", img: "/images/outlets.jpg" },
    { name: "Martha's Ice Cream", category: "Dining", coords: { lat: 43.34816, lng: -73.69044 }, desc: "Legendary ice-cream shop just across from Six Flags.", img: "/images/marthas.jpg" },

    // --- INSIDER LANDMARKS ---
    { name: "Warren County Bike Path", category: "Outdoors", coords: { lat: 43.3105, lng: -73.6502 }, desc: "Scenic 9-mile paved trail to Lake George.", img: "/images/bikepath.jpg" },
    { name: "Crandall Library & Park", category: "Education", coords: { lat: 43.3095, lng: -73.6455 }, desc: "Modern library hosting summer concerts and playgrounds.", img: "/images/crandall.jpg" },
    { name: "Aviation Mall", category: "Services", coords: { lat: 43.3385, lng: -73.6912 }, desc: "Home to Target and Regal Cinemas, less than 10 mins away.", img: "/images/aviation-mall.jpg" },
    { name: "Cole’s Woods", category: "Outdoors", coords: { lat: 43.32168, lng: -73.66734 }, desc: "Pioneering groomed ski trails and lush hiking paths.", img: "/images/coles-woods.jpg" },
    { name: "Common Roots Brewing", category: "Dining", coords: { lat: 43.2975, lng: -73.5938 }, desc: "World-class craft brewery and major social hub.", img: "/images/common-roots.jpg" },

    // --- INDOOR ADVENTURE ---
    { name: "Sky Zone Trampoline Park", category: "Entertainment", coords: { lat: 43.29658, lng: -73.68447 }, desc: "Wall-to-wall aerial action for high-energy family fun.", img: "/images/sky-zone.jpg" },
    { name: "The Fun Spot", category: "Entertainment", coords: { lat: 43.34323, lng: -73.68588 }, desc: "Indoor rock climbing, go-karts, laser tag, and skating.", img: "/images/fun-spot.jpg" },
];

export default function Landmarks({ limit }: { limit?: number }) {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string
    });

    const [filter, setFilter] = useState('All');
    const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
    const [routeInfo, setRouteInfo] = useState<{ distance: string; duration: string } | null>(null);
    const categories = ['All', 'Services', 'Dining', 'Outdoors', 'Entertainment', 'Health', 'Education'];

    const calculateRoute = (dest: { lat: number, lng: number }) => {
        if (!window.google) return;
        const service = new google.maps.DirectionsService();
        service.route(
            {
                origin: SJP_LOCATION,
                destination: dest,
                travelMode: google.maps.TravelMode.DRIVING
            },
            (result, status) => {
                if (status === "OK" && result) {
                    setDirections(result);

                    // Extract the distance and time from the first leg of the route
                    const leg = result.routes[0].legs[0];
                    setRouteInfo({
                        distance: leg.distance?.text || "",
                        duration: leg.duration?.text || ""
                    });
                }
            }
        );
    };

    const filteredData = allLandmarks.filter(item => filter === 'All' || item.category === filter).slice(0, limit || allLandmarks.length);

    return (
        <div className="flex flex-col lg:flex-row gap-8 relative max-w-7xl mx-auto px-4 py-10">
            {/* STICKY MAP SECTION */}
            <div className="w-full lg:w-1/2 h-[350px] lg:h-[650px] sticky top-0 lg:top-24 z-20 rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                {isLoaded ? (
                    <GoogleMap
                        mapContainerStyle={{ width: '100%', height: '100%' }}
                        center={SJP_LOCATION}
                        zoom={12}
                        options={{ disableDefaultUI: true, zoomControl: true }}
                    >
                        <Marker position={SJP_LOCATION} label="SJP" />
                        {directions && <DirectionsRenderer directions={directions} />}

                        {/* Floating Trip Summary Overlay */}
                        {routeInfo && (
                            <div className="absolute bottom-6 left-6 right-6 bg-white p-4 rounded-xl shadow-2xl border border-slate-100 z-30 animate-in fade-in slide-in-from-bottom-4">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="text-[10px] font-black text-gold-600 uppercase">Estimated Travel</p>
                                        <h5 className="text-xl font-bold text-slate-900">{routeInfo.duration}</h5>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-bold text-slate-500">{routeInfo.distance}</p>
                                        <p className="text-[10px] text-slate-400">from Saint James Place</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </GoogleMap>
                ) : (
                    <div className="bg-slate-200 animate-pulse h-full w-full flex items-center justify-center font-bold">Loading Map...</div>
                )}
            </div>

            {/* SCROLLABLE LIST SECTION */}
            <div className="w-full lg:w-1/2 space-y-8">
                <div className="flex flex-wrap gap-2 mb-6 justify-center lg:justify-start">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-3 py-1 rounded-full text-[10px] font-bold border transition-all ${
                                filter === cat ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-500 border-slate-200 hover:border-slate-900'
                            }`}
                        >
                            {cat.toUpperCase()}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 gap-6">
                    {filteredData.map((item) => (
                        <div
                            key={item.name}
                            onClick={() => calculateRoute(item.coords)}
                            className="flex gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg cursor-pointer group transition-all"
                        >
                            <div className="w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden shadow-inner">
                                <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            </div>
                            <div className="flex flex-col justify-center">
                                <span className="text-[9px] font-black text-gold-600 uppercase tracking-tighter mb-1">{item.category}</span>
                                <h4 className="font-serif font-bold text-slate-900 text-lg leading-tight">{item.name}</h4>
                                <p className="text-xs text-slate-600 line-clamp-2 mt-1">{item.desc}</p>
                                <span className="mt-2 text-[10px] font-bold text-slate-400 group-hover:text-gold-600 transition-colors">
                  CLICK TO VIEW ROUTE →
                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}