"use client";

import { useEffect } from 'react';
import '../game-page.css'; // For the .game-section container
import './about.css';      // For the specific About page styles

export default function About() {
    const SERVER_URL = "https://subliminal-backend.onrender.com";

    // Track Page View
    useEffect(() => {
        fetch(`${SERVER_URL}/track`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ gameName: 'About_Page', type: 'view' })
        }).catch(err => console.log("Tracking Error:", err));
    }, []);

    return (
        <main>
            <header className="hero-small">
                <div>
                    <h1>About The Studio</h1>
                    <p>Developing the Unseen.</p>
                </div>
            </header>

            <section className="game-section">
                <h2>Who We Are</h2>
                <p>Subliminal Sarcasm Studios began as a spark among a group of passionate gamers at UAlbany. What started as late-night discussions and shared visions quickly caught fire, fueled by a collective desire to contribute something meaningful to the world of entertainment.</p>
                <p>We aren’t just developers; we are players who believe that the medium of gaming is the ultimate frontier for original ideas. Our studio is built on the foundation of that early camaraderie, transformed into a professional mission to bring our unique brand of storytelling into the world.</p>
            </section>

            <section className="game-section">
                <h2>The Name: Subliminal Sarcasm</h2>
                <p>Why Subliminal Sarcasm Studios? To us, the name represents the layers inherent in great game design. In game creation, this duality allows us to build worlds that are intellectually engaging and stylistically bold.</p>

                <div className="duality-grid">
                    <div className="duality-card">
                        <h3>Subliminal</h3>
                        <p>Speaks to the nuance of the player experience—the subtle mechanics, the environmental storytelling, and the "invisible" logic that makes a game feel alive.</p>
                    </div>
                    <div className="duality-card">
                        <h3>Sarcasm</h3>
                        <p>Represents our edge, our personality, and our refusal to take the status quo at face value. A sharp, self-aware spirit that keeps the experience fresh.</p>
                    </div>
                </div>

                <p>We believe the best games have a "wink" to them—a hidden depth that rewards the player for looking closer.</p>
            </section>

            <section className="game-section">
                <h2>Our Journey & The Road Ahead</h2>
                <p>We are currently charting a course toward the future of interactive media. While we are deeply committed to developing our own original IPs, our technical roadmap is even more ambitious.</p>
                <p>We are actively pursuing development in <strong>VR and XR (Extended Reality)</strong>, with a specific focus on pioneering cross-platform experiences. Our goal is to bridge the gap between XR, Console, PC, and iOS, creating seamless journeys that exist wherever our players are.</p>

                <p>At the heart of every project is a dual commitment:</p>
                <ul className="roadmap-list">
                    <li><strong>Narrative Excellence:</strong> We view storytelling as our major contribution to the creative world.</li>
                    <li><strong>Mechanical Innovation:</strong> We are just as dedicated to the "how" as the "why," pushing the boundaries of game logic to ensure every player enjoys a unique, tactile experience.</li>
                </ul>
                <p style={{ marginTop: '30px', fontStyle: 'italic', color: '#fff' }}>
                    The journey has already begun, and we’re just getting started.
                </p>
            </section>
        </main>
    );
}