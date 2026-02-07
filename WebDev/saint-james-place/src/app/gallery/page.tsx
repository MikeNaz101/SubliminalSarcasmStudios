"use client";
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion'; //

const galleryImages = [
    { id: 1, src: '/images/hero-exterior.jpg', category: 'Exteriors', title: 'Community Entrance' },
    { id: 2, src: '/images/amenity-interior.jpg', category: 'Interiors', title: 'Gourmet Kitchen' },
    { id: 3, src: '/images/exterior-privacy.jpg', category: 'Exteriors', title: 'Private Townhouse Entry' },
    { id: 4, src: '/images/garage-interior.jpg', category: 'Lifestyle', title: 'Attached Garage Space' },
];

const categories = ['All', 'Exteriors', 'Interiors', 'Lifestyle'];

export default function Gallery() {
    const [filter, setFilter] = useState('All');
    const [selectedImage, setSelectedImage] = useState<string | null>(null); // State for Lightbox

    const filteredImages = filter === 'All'
        ? galleryImages
        : galleryImages.filter(img => img.category === filter);

    return (
        <main className="min-h-screen bg-white">
            <div className="bg-slate-900 pb-20">
                <Navbar />
                <div className="container mx-auto px-6 pt-32 pb-10 text-center text-white">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Gallery</h1>
                    <p className="text-slate-400 max-w-xl mx-auto italic">Visualizing your new home.</p>
                </div>
            </div>

            {/* Filter Tabs */}
            <section className="py-12 border-b border-slate-100 flex justify-center gap-4 flex-wrap">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setFilter(cat)}
                        className={`px-6 py-2 rounded-full text-sm font-bold tracking-widest uppercase transition-all ${
                            filter === cat ? 'bg-gold-500 text-white shadow-lg' : 'bg-slate-100 text-slate-500'
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </section>

            {/* Image Grid */}
            <section className="py-16 container mx-auto px-6">
                <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                    {filteredImages.map((image) => (
                        <motion.div
                            layoutId={image.src} // Smooth transition for the image
                            key={image.id}
                            onClick={() => setSelectedImage(image.src)}
                            className="relative group overflow-hidden rounded-lg bg-slate-100 break-inside-avoid shadow-md cursor-zoom-in"
                        >
                            <Image
                                src={image.src}
                                alt={image.title}
                                width={800}
                                height={600}
                                className="w-full h-auto object-cover"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <p className="text-white font-serif text-xl">View Larger</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* LIGHTBOX OVERLAY */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedImage(null)}
                        className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 md:p-10 cursor-zoom-out"
                    >
                        <motion.div
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.8 }}
                            className="relative max-w-5xl max-h-full"
                        >
                            <img
                                src={selectedImage}
                                className="max-w-full max-h-[85vh] rounded shadow-2xl"
                                alt="Selected"
                            />
                            <button
                                className="absolute -top-12 right-0 text-white text-4xl hover:text-gold-500"
                                onClick={() => setSelectedImage(null)}
                            >
                                &times;
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <section className="bg-slate-50 py-20 text-center">
                <Link href="/contact" className="px-10 py-4 bg-slate-900 text-white font-bold tracking-widest hover:bg-gold-600 uppercase">
                    Schedule a Private Tour
                </Link>
            </section>
        </main>
    );
}