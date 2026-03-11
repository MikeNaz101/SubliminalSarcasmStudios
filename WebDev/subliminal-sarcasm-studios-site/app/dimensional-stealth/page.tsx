"use client";

import { useEffect } from 'react';
import Link from 'next/link';
import '../game-page.css';

export default function DimensionalStealth() {
    const SERVER_URL = "https://subliminal-backend.onrender.com";

    useEffect(() => {
        fetch(`${SERVER_URL}/track`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ gameName: 'Dimensional Stealth', type: 'view' })
        }).catch(err => console.log("Tracking Error:", err));
    }, []);

    // --- DIMENSIONAL THEME ---
    // Ghostly Teal vs. Aggressive Crimson
    const stealthTheme = {
        '--primary-color': '#00ffcc',
        '--accent-color': '#ff0033',
        '--bg-dark': '#051010',
        '--bg-section-alt': '#0a1a1a',
        '--text-main': '#d0f0f0',
        '--text-muted': '#80a0a0',
    } as React.CSSProperties;

    return (
        <main style={stealthTheme}>
            <header className="game-hero" style={{ background: `linear-gradient(to bottom, rgba(5,16,16,0.6), var(--bg-dark)), url('/images/stealth_bg.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="game-hero-content">
                    <h1 className="game-title" style={{ letterSpacing: '4px' }}>Dimensional Stealth</h1>
                    <p className="game-tagline">Hunt. Shift. Survive.</p>
                    <a href="#play-now" className="play-btn-large" style={{ backgroundColor: 'transparent', border: '2px solid var(--primary-color)', color: 'var(--primary-color)' }}>View Prototype</a>
                </div>
            </header>

            <div className="stats-bar">
                <div className="stat-item"><span className="stat-label">Genre</span><div className="stat-value">First-Person Stealth</div></div>
                <div className="stat-item"><span className="stat-label">Mechanic</span><div className="stat-value">Reality Shifting</div></div>
                <div className="stat-item"><span className="stat-label">Status</span><div className="stat-value" style={{ color: 'var(--primary-color)' }}>Prototyping</div></div>
            </div>

            <section className="game-section">
                <h2>Master Two Realities</h2>
                <p>In this tense First-Person FPS, survival depends on your ability to seamlessly toggle between two distinct realities. Traverse complex puzzle chunks by shifting your physical presence to bypass obstacles and outmaneuver threats.</p>
                <p>Every shift carries a risk. You must carefully balance your time between hunting and hiding, constantly aware of which dimension you occupy.</p>
            </section>

            <div className="alt-bg">
                <div className="alt-bg-inner">
                    <h2>Dual-Dimension Mechanics</h2>
                    <div className="features-grid">
                        <div className="feature-card" style={{ borderLeft: '4px solid var(--primary-color)' }}>
                            <h3 style={{ color: 'var(--primary-color)' }}>Dimension A: Hunting Grounds</h3>
                            <p>A serene but elusive reality populated by passive creatures. Here, you are the predator, gathering resources and tracking your prey.</p>
                        </div>
                        <div className="feature-card" style={{ borderLeft: '4px solid var(--accent-color)' }}>
                            <h3 style={{ color: 'var(--accent-color)' }}>Dimension B: Danger Zone</h3>
                            <p>A hostile, nightmarish reflection of the world. Aggressive enemies patrol these grounds, requiring perfect stealth and rapid traversal to survive.</p>
                        </div>
                        <div className="feature-card">
                            <h3 style={{ color: '#fff' }}>Behavior Tree AI</h3>
                            <p>Entities react intelligently to your presence across dimensions, utilizing advanced Behavior Trees to dynamically Freeze, Flee, or Roam based on your actions.</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}