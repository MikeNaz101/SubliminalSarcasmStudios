"use client";

import { useEffect } from 'react';
import Link from 'next/link';
import '../game-page.css';

export default function SynCity() {
    const SERVER_URL = "https://subliminal-backend.onrender.com";

    useEffect(() => {
        // I noticed you didn't have a tracking script on the Syn City HTML,
        // but I added one here to match the others!
        fetch(`${SERVER_URL}/track`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ gameName: 'Syn City', type: 'view' })
        }).catch(err => console.log("Tracking Error:", err));
    }, []);

    // --- THE PAGE-SPECIFIC THEME ---
    // This overrides the global cyan/green colors with Syn City's Neon Pink/Cyan
    const synCityTheme = {
        '--primary-color': '#ff0055', // Neon Pink/Red
        '--accent-color': '#00FFFF',  // Cyan
        '--bg-dark': '#0d1117',       // VS Code / Editor Dark Mode
        '--bg-section-alt': '#161b22',
        '--text-main': '#c9d1d9',
        '--text-muted': '#8b949e',
        '--code-bg': '#000000',
    } as React.CSSProperties;

    return (
        // Apply the theme directly to the wrapper
        <main style={synCityTheme}>
            <header className="game-hero" style={{ background: `linear-gradient(to bottom, rgba(13,17,23,0.7), var(--bg-dark)), url('/images/syn_city_concept.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="game-hero-content">
                    {/* Notice we can still use the shared .game-title class! */}
                    <h1 className="game-title" style={{ fontFamily: 'monospace', textShadow: '2px 2px 0px var(--primary-color), -2px -2px 0px var(--accent-color)' }}>Syn City</h1>
                    <p className="game-tagline" style={{ backgroundColor: 'rgba(0,0,0,0.6)', padding: '5px 15px', display: 'inline-block', fontFamily: 'monospace' }}>
                        Error 404: <span style={{ color: 'var(--primary-color)' }}>Hope Not Found</span>
                    </p>
                    <br />
                    <a href="#play-now" className="play-btn-large" style={{ backgroundColor: 'transparent', border: '2px solid var(--primary-color)', color: 'var(--primary-color)' }}>Start Debugging</a>
                </div>
            </header>

            <div className="stats-bar" style={{ borderBottom: '1px solid var(--primary-color)' }}>
                <div className="stat-item"><span className="stat-label">Genre</span><div className="stat-value" style={{ fontFamily: 'monospace' }}>Educational Puzzler</div></div>
                <div className="stat-item"><span className="stat-label">Language</span><div className="stat-value" style={{ fontFamily: 'monospace' }}>C# / .NET</div></div>
                <div className="stat-item"><span className="stat-label">Status</span><div className="stat-value" style={{ color: 'var(--accent-color)', fontFamily: 'monospace' }}>Early Access</div></div>
            </div>

            <section className="game-section">
                <h2 style={{ fontFamily: 'monospace' }}>Fix The Code, Save The City</h2>
                <p>Welcome to <strong>Syn City</strong>, a digital metropolis on the brink of collapse. The Source Code that governs reality has been corrupted by rogue malware, causing gravity to fail, buildings to glitch, and logic to break down.</p>
                <p>You play as a <strong>Runtime Agent</strong>, armed with a debugger tool. Your mission: traverse the glitching districts and rewrite the C# scripts that control the environment.</p>

                {/* Visual Code Block */}
                <div style={{ backgroundColor: 'var(--code-bg)', padding: '20px', borderRadius: '5px', fontFamily: 'monospace', color: '#33ff33', fontSize: '0.9rem', marginBottom: '40px', borderLeft: '3px solid var(--primary-color)' }}>
                    <span style={{ color: '#569cd6' }}>void</span> <span style={{ color: '#dcdcaa' }}>RepairBridge</span>() {'{'}<br />
                    &nbsp;&nbsp;<span style={{ color: '#569cd6' }}>if</span> (!isBroken) <span style={{ color: '#c586c0' }}>return</span>;<br />
                    &nbsp;&nbsp;<span style={{ color: '#6a9955' }}>// TODO: Player must fix this syntax error to proceed!</span><br />
                    &nbsp;&nbsp;bridge.<span style={{ color: '#dcdcaa' }}>SetActive</span>(<span style={{ color: '#569cd6' }}>true</span>);<br />
                    {'}'}
                </div>
            </section>

            <div className="alt-bg">
                <div className="alt-bg-inner">
                    <h2 style={{ fontFamily: 'monospace' }}>Learning Modules</h2>
                    <div className="features-grid">
                        <div className="feature-card"><h3 style={{ fontFamily: 'monospace' }}>Visual Debugging</h3><p>See code execution in real-time. If you write an infinite loop, you'll see the world freeze around you.</p></div>
                        <div className="feature-card"><h3 style={{ fontFamily: 'monospace' }}>Syntax & Semantics</h3><p>Learn the difference between build errors (walls blocking your path) and runtime errors (falling through the floor).</p></div>
                        <div className="feature-card"><h3 style={{ fontFamily: 'monospace' }}>Object-Oriented Combat</h3><p>Defeat enemies by identifying their class weaknesses and instantiating the correct counter-objects.</p></div>
                        <div className="feature-card"><h3 style={{ fontFamily: 'monospace' }}>Real C# Skills</h3><p>No drag-and-drop blocks. You will type actual C# syntax, variables, loops, and methods to solve puzzles.</p></div>
                    </div>
                </div>
            </div>

            <section id="play-now" style={{ textAlign: 'center', paddingTop: '40px', paddingBottom: '60px' }}>
                <h2 style={{ border: 'none', marginBottom: '30px' }}>Initialize Runtime</h2>
                <div style={{ display: 'flex', justifyContent: 'center', padding: '0 20px' }}>
                    <div style={{ position: 'relative', width: '960px', height: '600px', maxWidth: '100%', aspectRatio: '16/9', background: '#000', border: '3px solid var(--primary-color)', boxShadow: '0 0 30px rgba(255, 0, 85, 0.2)', borderRadius: '4px', overflow: 'hidden' }}>
                        <iframe
                            src="https://d1u9qse8chzfnc.cloudfront.net/syn-city-game/index.html"
                            style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
                            title="Syn City WebGL"
                            allow="autoplay; fullscreen; xr-spatial-tracking; payment; camera; microphone"
                            scrolling="no"
                        />
                    </div>
                </div>
            </section>
        </main>
    );
}