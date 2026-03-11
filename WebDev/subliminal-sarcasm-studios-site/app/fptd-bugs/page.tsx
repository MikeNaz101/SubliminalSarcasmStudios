"use client";

import { useEffect } from 'react';
import Link from 'next/link';
import '../game-page.css';

export default function ProjectAegis() {
    const SERVER_URL = "https://subliminal-backend.onrender.com";

    useEffect(() => {
        fetch(`${SERVER_URL}/track`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ gameName: 'FPS_TD_BUG_Game', type: 'view' })
        }).catch(err => console.log("Tracking Error:", err));
    }, []);

    const trackPlay = () => {
        fetch(`${SERVER_URL}/track`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ gameName: 'FPS_TD_BUG_Game', type: 'play' })
        }).catch(err => console.log("Tracking Error:", err));
    };

    return (
        <main>
            <header className="game-hero" style={{ background: `linear-gradient(to bottom, rgba(12,26,26,0.3), var(--bg-dark)), url('/images/bugs_concept.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="game-hero-content">
                    <h1 className="game-title">Project Aegis</h1>
                    <p className="game-tagline">A high-octane hybrid of fast-paced FPS and strategic tower defense.</p>
                    <a href="#play-now" className="play-btn-large" onClick={trackPlay}>Play Web Alpha</a>
                </div>
            </header>

            <div className="stats-bar">
                <div className="stat-item"><span className="stat-label">Genre</span><div className="stat-value">FPS / Tower Defense</div></div>
                <div className="stat-item"><span className="stat-label">Engine</span><div className="stat-value">Unity</div></div>
                <div className="stat-item"><span className="stat-label">Status</span><div className="stat-value" style={{ color: 'var(--primary-color)' }}>Active Development</div></div>
            </div>

            <section className="game-section">
                <h2>About The Game</h2>
                <p>Project Aegis throws you into a claustrophobic alien swarm. You must defend your core against waves of enemies using an arsenal of weaponry while dynamically constructing and upgrading defensive towers on the fly. Success requires both twitch-reflex gunplay and quick, strategic resource management.</p>
                <p>Will you use your limited resources (Scrap) for that crucial tower upgrade, or save it to buy a more powerful weapon? Your choices determine the fate of the Core.</p>
            </section>

            <div className="alt-bg">
                <div className="alt-bg-inner">
                    <h2>Core Features</h2>
                    <div className="features-grid">
                        <div className="feature-card"><h3>Dynamic Player Controller</h3><p>Fast, responsive, Doom-inspired movement for high-speed engagement.</p></div>
                        <div className="feature-card"><h3>Grid-less Tower Building</h3><p>Build and upgrade defensive towers anywhere on the map using collected 'Scrap'.</p></div>
                        <div className="feature-card"><h3>Advanced Enemy AI</h3><p>NavMesh-based AI with target prioritization (Player, Core, Doors) and environmental awareness.</p></div>
                        <div className="feature-card"><h3>Adaptive Difficulty Director</h3><p>An 'AI Director' monitors player accuracy and performance, adjusting enemy aggression and behavior in real-time.</p></div>
                        <div className="feature-card"><h3>Complex Weapon System</h3><p>Hitscan weapon controller complete with recoil, aiming down sights (ADS), and damage drop-off.</p></div>
                        <div className="feature-card"><h3>Enemy Behavior</h3><p>Enemies react to player-made sounds (gunshots) and use a Field of View component to acquire targets.</p></div>
                    </div>
                </div>
            </div>

            <section className="game-section" id="roadmap">
                <h2>What's Next (Roadmap)</h2>
                <p>The team is currently focused on:</p>
                <ul style={{ color: 'var(--text-main)', fontSize: '1.1rem', paddingLeft: '20px', lineHeight: '1.5', listStyleType: 'disc' }}>
                    <li>Expanding the arsenal with new weapons and tower types.</li>
                    <li>Designing more complex enemy types (like the 'Spawner' Queen).</li>
                    <li>Building and balancing a full set of levels.</li>
                    <li>Creating the final 3D models and sound design.</li>
                </ul>
            </section>

            <div className="alt-bg">
                <div className="alt-bg-inner">
                    <h2>Development Team</h2>
                    <div className="team-list">
                        <div className="team-member"><span className="team-role">Lead Developer & Programmer</span><div className="team-name">Mike Nasierowski</div></div>
                        <div className="team-member"><span className="team-role">Project Lead & Level Designer</span><div className="team-name">Vinny Verda</div></div>
                        <div className="team-member"><span className="team-role">Project Manager & Ass't Programmer</span><div className="team-name">Jason Scott</div></div>
                        <div className="team-member"><span className="team-role">QA & Gameplay Balancing</span><div className="team-name">Derek?</div></div>
                    </div>
                </div>
            </div>

            <section id="play-now" style={{ textAlign: 'center', paddingTop: '40px', paddingBottom: '60px' }}>
                <h2 style={{ border: 'none', marginBottom: '30px' }}>Play Online</h2>
                <div style={{ display: 'flex', justifyContent: 'center', padding: '0 20px' }}>
                    <div style={{ position: 'relative', width: '960px', height: '600px', maxWidth: '100%', aspectRatio: '16/9', background: '#000', border: '3px solid var(--primary-color)', boxShadow: '0 0 30px rgba(0, 255, 255, 0.15)', borderRadius: '4px', overflow: 'hidden' }}>
                        <iframe
                            src="https://unity-td-fps-game-builds.s3.amazonaws.com/unity-fps-td-game/index.html"
                            style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
                            title="Project Aegis WebGL"
                            allow="autoplay; fullscreen; xr-spatial-tracking; payment; camera; microphone"
                            scrolling="no"
                        />
                    </div>
                </div>
                <div style={{ marginTop: '25px' }}>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '15px' }}>
                        <span style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>CONTROLS:</span> WASD to Move • Mouse to Aim • Click to Capture Cursor • ESC to Release
                    </p>
                </div>
            </section>
        </main>
    );
}