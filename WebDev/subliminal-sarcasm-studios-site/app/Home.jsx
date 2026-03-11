import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ParticlesBackground from '../components/ParticlesBackground'; // Extracted your tsParticles config here
import './Home.css'; // Assume your homepage styles are moved here

const Home = () => {
    // Page View Tracking
    useEffect(() => {
        const SERVER_URL = "https://subliminal-backend.onrender.com";
        fetch(`${SERVER_URL}/track`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ gameName: 'Home_Page', type: 'view' })
        }).catch(err => console.log("Tracking Error:", err));
    }, []); // Empty array ensures this only runs once on load

    return (
        <>
            <ParticlesBackground />
            <Navbar />

            <header className="hero">
                <div className="hero-content">
                    <h1>The Donner Party... Game?</h1>
                    <p>Survival. Betrayal. Oregon Trail Re-imagined.</p>
                    <Link to="/donner-party" className="hero-btn">VIEW PROJECT</Link>
                </div>
            </header>

            <main>
                <h2 className="section-title">Featured Projects</h2>
                <section className="games-grid">

                    {/* Game Card 1 */}
                    <Link to="/donner-party" className="game-card">
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

                    {/* Game Card 2 */}
                    <Link to="/fptd-bugs" className="game-card">
                        <div className="card-image">
                            <img
                                src="/images/bugs_concept.jpg"
                                alt="FP/TD Bugs"
                                onError={(e) => { e.target.src = 'https://placehold.co/600x400/1a2a1a/FFF?text=FP/TD+Bugs'; }}
                            />
                        </div>
                        <div className="card-content">
                            <h3 className="card-title">FP/TD Bugs</h3>
                            <p className="card-desc">High-octane hybrid of FPS and Tower Defense. Build towers, shoot bugs, save the core.</p>
                            <div className="card-meta">
                                <span className="status-badge">Active Dev</span>
                            </div>
                        </div>
                    </Link>

                    {/* Game Card 3 */}
                    <Link to="/geometry-defenders" className="game-card">
                        <div className="card-image">
                            <img
                                src="/images/vr_concept.jpg"
                                alt="Geometry Defenders XR"
                                onError={(e) => { e.target.src = 'https://placehold.co/600x400/1a2a1a/FFF?text=Geometry+Defenders'; }}
                            />
                        </div>
                        <div className="card-content">
                            <h3 className="card-title">Geometry Defenders XR</h3>
                            <p className="card-desc">Immersive VR/XR tower defense experience designed for modern headsets.</p>
                            <div className="card-meta">
                                <span className="status-badge">Alpha</span>
                            </div>
                        </div>
                    </Link>

                    {/* Game Card 4 */}
                    <Link to="/syn-city" className="game-card">
                        <div className="card-image">
                            <img
                                src="/images/syn_city_concept.jpg"
                                alt="Syn City"
                                onError={(e) => { e.target.src = 'https://placehold.co/600x400/1a2a1a/FFF?text=Syn+City'; }}
                            />
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

            <footer>
                <p>&copy; 2025 Subliminal Sarcasm Studios. All Rights Reserved.</p>
            </footer>
        </>
    );
};

export default Home;