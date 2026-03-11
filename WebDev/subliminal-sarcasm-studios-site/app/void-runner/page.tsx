"use client";

import { useEffect } from 'react';
import Link from 'next/link';
import '../game-page.css';

export default function VoidRunner() {
    const SERVER_URL = "https://subliminal-backend.onrender.com";

    useEffect(() => {
        fetch(`${SERVER_URL}/track`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ gameName: 'Void Runner', type: 'view' })
        }).catch(err => console.log("Tracking Error:", err));
    }, []);

    // --- VECTOR VOID THEME ---
    // High-energy Electric Orange and Deep Space Purple
    const voidTheme = {
        '--primary-color': '#ff8c00',
        '--accent-color': '#8a2be2',
        '--bg-dark': '#0a0510',
        '--bg-section-alt': '#140a20',
        '--text-main': '#e0d8f0',
        '--text-muted': '#a090b0',
    } as React.CSSProperties;

    return (
        <main style={voidTheme}>
            <header className="game-hero" style={{ background: `linear-gradient(to bottom, rgba(10,5,16,0.5), var(--bg-dark)), url('/images/void_runner_bg.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="game-hero-content">
                    <h1 className="game-title" style={{ fontStyle: 'italic', letterSpacing: '2px' }}>Vector Void</h1>
                    <p className="game-tagline">High-Speed Infinite Arcade Combat.</p>
                    <a href="#play-now" className="play-btn-large">Enter the Void</a>
                </div>
            </header>

            <div className="stats-bar">
                <div className="stat-item"><span className="stat-label">Genre</span><div className="stat-value">Arcade Flight-Shooter</div></div>
                <div className="stat-item"><span className="stat-label">Style</span><div className="stat-value">Infinite Runner</div></div>
                <div className="stat-item"><span className="stat-label">Status</span><div className="stat-value" style={{ color: 'var(--primary-color)' }}>In Development</div></div>
            </div>

            <section className="game-section">
                <h2>Survive the Endless Run</h2>
                <p>Vector Void is a high-octane 3D flying arcade shooter where reflexes mean everything. Navigate treacherous, infinitely generating cosmic pathways while engaging in classic, Star Fox-style dogfighting combat.</p>
                <p>The void is unrelenting, but you are not alone. As you push further into the unknown, the game adapts to your skill level, ensuring that every run is as challenging as it is exhilarating.</p>
            </section>

            <div className="alt-bg">
                <div className="alt-bg-inner">
                    <h2>Flight Systems</h2>
                    <div className="features-grid">
                        <div className="feature-card">
                            <h3>Adaptive Difficulty AI</h3>
                            <p>The game dynamically adjusts enemy spawns, hazard density, and combat intensity in real-time based on your current performance.</p>
                        </div>
                        <div className="feature-card">
                            <h3>Ghost Protocol</h3>
                            <p>An advanced assist system that utilizes data from your past runs to guide you, offering strategic advantages and split-second warnings.</p>
                        </div>
                        <div className="feature-card">
                            <h3>Arcade Combat</h3>
                            <p>Lock on, barrel roll, and unleash devastating payloads. Fluid, responsive controls designed for high-speed engagement.</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}