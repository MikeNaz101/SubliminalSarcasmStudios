"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import HeroSlider from '../components/HeroSlider'; // <--- Import the new isolated component
import './page.css';

const particlesOptions = {
    background: { color: { value: "transparent" } },
    fpsLimit: 60,
    interactivity: {
        events: { onHover: { enable: true, mode: "repulse" }, resize: { enable: true } },
        modes: { repulse: { distance: 100, duration: 0.4 } }
    },
    particles: {
        color: { value: "#00FFFF" },
        links: { color: "#3d6a3d", distance: 150, enable: true, opacity: 0.5, width: 1 },
        move: { enable: true, speed: 1, outModes: { default: "bounce" as const } },
        number: { density: { enable: true, width: 800 }, value: 80 },
        opacity: { value: 0.5 },
        shape: { type: "circle" },
        size: { value: { min: 1, max: 5 } }
    },
    detectRetina: true
};

export default function Home() {
    const [init, setInit] = useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => setInit(true));
    }, []);

    useEffect(() => {
        const SERVER_URL = "https://subliminal-backend.onrender.com";
        fetch(`${SERVER_URL}/track`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ gameName: 'Home_Page', type: 'view' })
        }).catch(err => console.log("Tracking Error:", err));
    }, []);

    return (
        <main>
            {init && (
                <Particles
                    id="tsparticles"
                    style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: -1 }}
                    options={particlesOptions}
                />
            )}

            {/* Drop the slider component here! */}
            <HeroSlider />

            {/* --- GAMES GRID --- */}
            <h2 className="section-title">Featured Projects</h2>
            <section className="games-grid">

                {/* --- NEW GAME: VECTOR VOID --- */}
                <Link href="/void-runner" className="game-card">
                    <div className="card-image">
                        <img
                            src="/images/void_runner_bg.jpg"
                            alt="Vector Void"
                            onError={(e) => { e.currentTarget.src = 'https://placehold.co/600x400/0a0510/ff8c00?text=Vector+Void'; }}
                        />
                    </div>
                    <div className="card-content">
                        <h3 className="card-title">Vector Void</h3>
                        <p className="card-desc">A high-octane 3D flying arcade shooter featuring adaptive difficulty and Ghost Protocol run assists.</p>
                        <div className="card-meta">
                            <span className="status-badge" style={{ color: '#ff8c00', backgroundColor: 'rgba(255, 140, 0, 0.1)' }}>In Dev</span>
                        </div>
                    </div>
                </Link>

                {/* --- NEW GAME: DIMENSIONAL STEALTH --- */}
                <Link href="/dimensional-stealth" className="game-card">
                    <div className="card-image">
                        <img
                            src="/images/stealth_bg.jpg"
                            alt="Dimensional Stealth"
                            onError={(e) => { e.currentTarget.src = 'https://placehold.co/600x400/051010/00ffcc?text=Dimensional+Stealth'; }}
                        />
                    </div>
                    <div className="card-content">
                        <h3 className="card-title">Dimensional Stealth</h3>
                        <p className="card-desc">A first-person stealth FPS where you shift between Hunting Grounds and Danger Zones to survive.</p>
                        <div className="card-meta">
                            <span className="status-badge" style={{ color: '#00ffcc', backgroundColor: 'rgba(0, 255, 204, 0.1)' }}>Prototyping</span>
                        </div>
                    </div>
                </Link>

                <Link href="/donner-party" className="game-card">
                    <div className="card-image">
                        <img src="/images/DPG_1_small.png" alt="Donner Party Gameplay" />
                    </div>
                    <div className="card-content">
                        <h3 className="card-title">The Donner Party... Game?</h3>
                        <p className="card-desc">A multiplayer, vote-driven survival experience where cooperation and communication determine survival.</p>
                        <div className="card-meta">
                            <span className="status-badge">In Development</span>
                        </div>
                    </div>
                </Link>

                <Link href="/fptd-bugs" className="game-card">
                    <div className="card-image">
                        <img src="/images/bugs_concept.jpg" alt="FP/TD Bugs" />
                    </div>
                    <div className="card-content">
                        <h3 className="card-title">FP/TD Bugs</h3>
                        <p className="card-desc">High-octane hybrid of FPS and Tower Defense. Build towers, shoot bugs, save the core.</p>
                        <div className="card-meta">
                            <span className="status-badge">Active Dev</span>
                        </div>
                    </div>
                </Link>

                <Link href="/geometry-defenders" className="game-card">
                    <div className="card-image">
                        <img src="/images/vr_concept.jpg" alt="Geometry Defenders XR" />
                    </div>
                    <div className="card-content">
                        <h3 className="card-title">Geometry Defenders XR</h3>
                        <p className="card-desc">Immersive VR/XR tower defense experience designed for modern headsets.</p>
                        <div className="card-meta">
                            <span className="status-badge">Alpha</span>
                        </div>
                    </div>
                </Link>

                <Link href="/syn-city" className="game-card">
                    <div className="card-image">
                        <img src="/images/syn_city_concept.jpg" alt="Syn City" />
                    </div>
                    <div className="card-content">
                        <h3 className="card-title">Syn City</h3>
                        <p className="card-desc">A futuristic project currently in early conceptualization.</p>
                        <div className="card-meta">
                            <span className="status-badge">Concept</span>
                        </div>
                    </div>
                </Link>

            </section>
        </main>
    );
}