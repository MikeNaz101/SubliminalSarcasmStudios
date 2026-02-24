"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase"; // Import your new database connection!

// We update our Type to match exactly what we built in the SQL table
type Unit = {
    id: string;
    size: string;
    price: number;
    climate: boolean;
    available: boolean;
    description: string;
};

export default function UnitGrid() {
    // 1. New State for our live data and loading status
    const [units, setUnits] = useState<Unit[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const [filterAvailable, setFilterAvailable] = useState(false);
    const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);

    // 2. The Fetch Effect (Runs once when the component loads)
    useEffect(() => {
        async function fetchUnits() {
            // Supabase Query: Fetch all columns (*), order by price lowest to highest
            const { data, error } = await supabase
                .from("units")
                .select("*")
                .order("price", { ascending: true });

            if (error) {
                console.error("Error fetching units:", error);
            } else if (data) {
                setUnits(data);
            }
            setIsLoading(false); // Turn off the loading state
        }

        fetchUnits();
    }, []);

    // Filter logic applied to our live database array
    const displayedUnits = filterAvailable
        ? units.filter(unit => unit.available)
        : units;

    const handleReservation = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // 1. Grab the data from the form inputs
        const formData = new FormData(e.currentTarget);
        const fullName = formData.get("fullName") as string;
        const email = formData.get("email") as string;
        const phone = formData.get("phone") as string;
        const moveInDate = formData.get("moveInDate") as string;

        if (!selectedUnit) return;

        // 2. Send it to Supabase
        const { error } = await supabase
            .from("reservations")
            .insert([
                {
                    unit_id: selectedUnit.id,
                    full_name: fullName,
                    email: email,
                    phone: phone,
                    move_in_date: moveInDate,
                }
            ]);

        // 3. Handle the result
        if (error) {
            console.error("Error saving reservation:", error);
            alert("There was an error processing your reservation. Please try again.");
        } else {
            alert(`Success! ${selectedUnit.size} reserved for ${fullName}.`);
            setSelectedUnit(null); // Close the modal
        }
    };

    return (
        <>
            <section id="units" className="py-20 px-6">
                <div className="max-w-7xl mx-auto mb-12 flex flex-col md:flex-row justify-between items-end gap-6">
                    <div>
                        <h2 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Select Your Unit</h2>
                        <p className="text-lg text-slate-600 max-w-2xl">Transparent pricing with no hidden fees. Reserve online instantly.</p>
                    </div>
                    <button
                        onClick={() => setFilterAvailable(!filterAvailable)}
                        className={`px-6 py-3 rounded-full font-bold transition-colors shadow-sm ${
                            filterAvailable ? "bg-blue-600 text-white" : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
                        }`}
                    >
                        {filterAvailable ? "Showing Available Only" : "Filter: Available Units"}
                    </button>
                </div>

                {/* 3. Handling the Loading State */}
                {isLoading ? (
                    <div className="max-w-7xl mx-auto py-12 flex justify-center items-center">
                        <div className="animate-pulse flex flex-col items-center">
                            <div className="h-12 w-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
                            <p className="text-slate-500 font-bold">Loading live inventory...</p>
                        </div>
                    </div>
                ) : (
                    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {displayedUnits.map((unit) => (
                            <div key={unit.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 flex flex-col hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                                {!unit.available && (
                                    <div className="absolute top-6 right-6 bg-red-100 text-red-700 text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest">Waitlist</div>
                                )}
                                <div className="flex justify-between items-end mb-4">
                                    <h3 className="text-4xl font-black text-slate-900">{unit.size}</h3>
                                    <div className="text-right">
                                        <span className="text-3xl font-black text-blue-600">${unit.price}</span>
                                        <span className="text-slate-500 font-medium">/mo</span>
                                    </div>
                                </div>
                                {/* Note: changed from unit.desc to unit.description to match our SQL database */}
                                <p className="text-slate-600 mb-8 flex-grow leading-relaxed">{unit.description}</p>
                                <div className="flex items-center gap-2 mb-8 text-sm text-slate-600 font-bold bg-slate-50 p-3 rounded-lg border border-slate-100">
                                    <svg className="w-5 h-5 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                    Climate Controlled
                                </div>
                                <button
                                    onClick={() => setSelectedUnit(unit)}
                                    disabled={!unit.available}
                                    className={`w-full py-4 rounded-xl font-black text-lg transition-all ${
                                        unit.available
                                            ? "bg-slate-900 text-white hover:bg-blue-600 shadow-md hover:shadow-lg"
                                            : "bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200"
                                    }`}
                                >
                                    {unit.available ? "Reserve Now" : "Join Waitlist"}
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* Modal */}
            {selectedUnit && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={() => setSelectedUnit(null)}></div>
                    <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        <div className="bg-slate-50 p-6 border-b border-slate-100 flex justify-between items-start">
                            <div>
                                <h3 className="text-2xl font-black text-slate-900 mb-1">Reserve Unit</h3>
                                <p className="text-slate-500 font-medium">Climate Controlled • {selectedUnit.size}</p>
                            </div>
                            <div className="text-right">
                                <div className="text-2xl font-black text-blue-600">${selectedUnit.price}</div>
                                <div className="text-sm text-slate-500 font-medium">due monthly</div>
                            </div>
                        </div>
                        <form onSubmit={handleReservation} className="p-6">
                            <div className="space-y-4 mb-8">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-1">Full Name</label>
                                    <input required type="text" className="w-full border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all" placeholder="John Doe" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-1">Email Address</label>
                                    <input required type="email" className="w-full border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all" placeholder="john@example.com" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-1">Phone Number</label>
                                        <input required type="tel" className="w-full border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all" placeholder="(555) 000-0000" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-1">Move-in Date</label>
                                        <input required type="date" className="w-full border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all" />
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <button type="button" onClick={() => setSelectedUnit(null)} className="w-1/3 py-4 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors">Cancel</button>
                                <button type="submit" className="w-2/3 py-4 rounded-xl font-black text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20">Proceed to Payment</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}