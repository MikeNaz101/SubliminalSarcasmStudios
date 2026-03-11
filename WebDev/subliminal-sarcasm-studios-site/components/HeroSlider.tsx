"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

// Moved the data array here
const heroSlides = [
    {
        id: 'donner',
        image: '/images/DPG_1_full.png',
        title: 'The Donner Party... Game?',
        tagline: 'Survival. Betrayal. Oregon Trail Re-imagined.',
        link: '/donner-party'
    },
    {
        id: 'bugs',
        image: '/images/bugs_concept.jpg',
        title: 'Project Aegis', // Updated to the new name!
        tagline: 'A high-octane hybrid of fast-paced FPS and strategic tower defense.',
        link: '/fptd-bugs'
    },
    {
        id: 'syncity',
        image: '/images/syn_city_concept.jpg',
        title: 'Syn City',
        tagline: 'Error 404: Hope Not Found',
        link: '/syn-city'
    },
    {
        id: 'voidrunner',
        image: '/images/void_runner_bg.jpg',
        title: 'Vector Void',
        tagline: 'High-Speed Infinite Arcade Combat.',
        link: '/void-runner'
    },
    {
        id: 'stealth',
        image: '/images/stealth_bg.jpg',
        title: 'Dimensional Stealth',
        tagline: 'Hunt. Shift. Survive.',
        link: '/dimensional-stealth'
    }
];

export default function HeroSlider() {
    // The state now lives ONLY in the slider
    const [currentSlide, setCurrentSlide] = useState(0);

    // The timer now only triggers a re-render for the slider
    useEffect(() => {
        const slideInterval = setInterval(() => {
            setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
        }, 5000);

        return () => clearInterval(slideInterval);
    }, []);

    return (
        <section className="hero-slider">
            {heroSlides.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`slide ${index === currentSlide ? 'active' : ''}`}
                    style={{ backgroundImage: `url(${slide.image})` }}
                >
                    <div className="slide-content">
                        <h1 className="slide-title">{slide.title}</h1>
                        <p className="slide-tagline">{slide.tagline}</p>
                        <Link href={slide.link} className="hero-btn">VIEW PROJECT</Link>
                    </div>
                </div>
            ))}

            <div className="slider-dots">
                {heroSlides.map((_, index) => (
                    <div
                        key={index}
                        className={`dot ${index === currentSlide ? 'active' : ''}`}
                        onClick={() => setCurrentSlide(index)}
                    />
                ))}
            </div>
        </section>
    );
}