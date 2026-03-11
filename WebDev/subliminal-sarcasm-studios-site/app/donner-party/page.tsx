"use client";

import { useEffect } from 'react';
import Link from 'next/link';
import '../game-page.css';

export default function DonnerParty() {
    const SERVER_URL = "https://subliminal-backend.onrender.com";

    // Track Page View
    useEffect(() => {
        fetch(`${SERVER_URL}/track`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ gameName: 'Donner Party', type: 'view' })
        }).catch(err => console.log("Tracking Error:", err));
    }, []);

    // Track Play Click
    const trackPlay = () => {
        fetch(`${SERVER_URL}/track`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ gameName: 'Donner Party', type: 'play' })
        }).catch(err => console.log("Tracking Error:", err));
    };

    return (
        <main>
            <header className="game-hero" style={{ background: `linear-gradient(to bottom, rgba(11,20,20,0.3), var(--bg-dark)), url('/images/DPG_1_full.png')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="game-hero-content">
                    <h1 className="game-title">The Donner Party... Game?</h1>
                    <p className="game-tagline">Survival. Betrayal. The Oregon Trail Re-imagined.</p>
                    <a href="https://play.subliminalsarcasmstudios.com" target="_blank" rel="noreferrer" className="play-btn-large" onClick={trackPlay}>
                        Start Journey
                    </a>
                </div>
            </header>

            <div className="stats-bar">
                <div className="stat-item">
                    <span className="stat-label">Genre</span>
                    <div className="stat-value">Multiplayer Survival</div>
                </div>
                <div className="stat-item">
                    <span className="stat-label">Platform</span>
                    <div className="stat-value">Web / Mobile Browser</div>
                </div>
                <div className="stat-item">
                    <span className="stat-label">Status</span>
                    <div className="stat-value" style={{ color: 'var(--primary-color)' }}>Alpha / In Dev</div>
                </div>
            </div>

            <section className="game-section">
                <h2>About The Game</h2>
                <p>Embark on a perilous journey west in this thrilling re-imagining of the classic trail adventure. Manage resources, make tough decisions, and face the harsh realities of the frontier.</p>
                <p>This is a <strong>multi-player, vote-driven experience</strong> where cooperation and communication determine survival. Will your party reach its destination, or will you succumb to the dangers of the trail?</p>
            </section>

            <div className="alt-bg">
                <div className="alt-bg-inner">
                    <h2>Core Features</h2>
                    <div className="features-grid">
                        <div className="feature-card"><h3>Vote-Driven Decisions</h3><p>Players vote on scenarios via a streamlined, tabbed mobile UI. Every choice matters.</p></div>
                        <div className="feature-card"><h3>Caravan Persistence</h3><p>The host screen accurately tracks the caravan on the map and animates movement between waypoints.</p></div>
                        <div className="feature-card"><h3>Complex Trading</h3><p>A functional Player-to-Player Trading system allows offering personal items and money to shared funds.</p></div>
                        <div className="feature-card"><h3>Survival Mechanics</h3><p>Hunger, Thirst, and Sanity stats degrade automatically, increasing pressure and forcing item consumption.</p></div>
                        <div className="feature-card"><h3>Inventory Management</h3><p>Manage Personal Inventory and Shared Supplies. Items degrade upon failed use.</p></div>
                        <div className="feature-card"><h3>Weighted Outcomes</h3><p>Event results are determined by random systems influenced by Character Class Modifiers.</p></div>
                    </div>
                </div>
            </div>

            <section className="game-section">
                <h2>Media Gallery</h2>
                <div className="gallery-grid">
                    <a href="/images/DPG_1_full.png" className="gallery-item" target="_blank" rel="noreferrer"><img src="/images/DPG_1_small.png" alt="Gameplay Map" /></a>
                    <a href="/images/DPG_2_full.png" className="gallery-item" target="_blank" rel="noreferrer"><img src="/images/DPG_2_small.png" alt="Character Design" /></a>
                    <a href="/images/DPG_3_full.png" className="gallery-item" target="_blank" rel="noreferrer"><img src="/images/DPG_3_small.png" alt="In-Game Map" /></a>
                    <a href="/images/DPG_4_full.png" className="gallery-item" target="_blank" rel="noreferrer"><img src="/images/DPG_4_small.png" alt="Dev Screenshot" /></a>
                </div>
            </section>

            <div className="alt-bg">
                <div className="alt-bg-inner">
                    <h2>Development Team</h2>
                    <div className="team-list">
                        <div className="team-member"><span className="team-role">Project Lead & Backend</span><div className="team-name">Mike Nasierowski</div></div>
                        <div className="team-member"><span className="team-role">Game Logic & DB</span><div className="team-name">Schuyler Deno</div></div>
                        <div className="team-member"><span className="team-role">Historical Research</span><div className="team-name">Elijah Robinson</div></div>
                        <div className="team-member"><span className="team-role">Lead Artist</span><div className="team-name">Nick Popiel</div></div>
                        <div className="team-member"><span className="team-role">UI/UX & QA</span><div className="team-name">Tyler Barnes</div></div>
                    </div>
                </div>
            </div>
        </main>
    );
}