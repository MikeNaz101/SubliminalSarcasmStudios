"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import '../game-page.css';
import Leaderboard from '../../components/Leaderboard';

export default function VoidRunner() {
    const SERVER_URL = "https://subliminal-backend.onrender.com";

    // Controls the visibility of our new survey modal
    const [showSurvey, setShowSurvey] = useState(false);

    // This listens for a custom signal from your Unity WebGL build
    useEffect(() => {
        const handleUnityQuit = () => {
            console.log("Signal received from Unity! Opening survey...");
            setShowSurvey(true);
        };

        // Attach the listener to the browser window
        window.addEventListener('unityQuitGame', handleUnityQuit);

        // Clean up the listener if the user leaves the page
        return () => {
            window.removeEventListener('unityQuitGame', handleUnityQuit);
        };
    }, []);

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
            {/* --- PLAY SECTION & LEADERBOARD --- */}
            <section id="play-now" style={{ textAlign: 'center', paddingTop: '40px', paddingBottom: '60px' }}>
                <h2 style={{ border: 'none', marginBottom: '30px' }}>Initiate Flight Sequence</h2>

                {/* Game Container */}
                <div style={{ display: 'flex', justifyContent: 'center', padding: '0 20px' }}>
                    <div style={{ position: 'relative', width: '960px', height: '600px', maxWidth: '100%', aspectRatio: '16/9', background: '#000', border: '3px solid var(--primary-color)', boxShadow: '0 0 30px rgba(255, 140, 0, 0.2)', borderRadius: '4px', overflow: 'hidden' }}>

                        {/* --- UPDATED S3 LINK --- */}
                        <iframe
                            src="https://unity-td-fps-game-builds.s3.us-east-2.amazonaws.com/void-runner/index.html"
                            style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
                            title="Vector Void WebGL"
                            allow="autoplay; fullscreen; xr-spatial-tracking; camera; microphone"
                            scrolling="no"
                        />

                    </div>
                </div>

                {/* EXIT GAME BUTTON */}
                <div style={{ marginTop: '20px' }}>
                    <button
                        onClick={() => setShowSurvey(true)}
                        style={{ padding: '10px 30px', backgroundColor: 'transparent', border: '2px solid var(--accent-color)', color: 'var(--accent-color)', fontWeight: 'bold', textTransform: 'uppercase', cursor: 'pointer', borderRadius: '4px' }}
                    >
                        Exit Game
                    </button>
                </div>

                {/* Leaderboard directly underneath */}
                <Leaderboard />

            </section>

            {/* --- SURVEY MODAL POPUP --- */}
            {showSurvey && (
                <div className="survey-overlay">
                    <div className="survey-box">
                        <h2>Thank you for playing!</h2>
                        <p>Your feedback helps make Vector Void better. Do you have a quick minute for a brief survey?</p>

                        <div>
                            {/* Remember to replace YOUR_FORM_LINK with your actual Google Form URL! */}
                            <a href="https://docs.google.com/forms/d/1z6v5TV6yMqfH6pLWUYhpNAMuXwVa7MADc-8bJnVy4dc/edit?pli=1" target="_blank" rel="noreferrer" className="survey-btn-primary" onClick={() => setShowSurvey(false)}>
                                Take Survey
                            </a>

                            {/* Clicking this just sets the state back to false, hiding the modal */}
                            <button onClick={() => setShowSurvey(false)} className="survey-btn-secondary">
                                No Thanks
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}