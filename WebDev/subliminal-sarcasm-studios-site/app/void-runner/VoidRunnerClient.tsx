"use client";

import { useEffect, useState } from 'react';
import '../game-page.css';
import AccentSync from '../../components/AccentSync';
import GameHero from '../../components/GameHero';
import Gallery from '../../components/Gallery';
import Leaderboard from '../../components/Leaderboard';
import PageView from '../../components/PageView';
import { getFeaturedGame } from '../../lib/games';

const game = getFeaturedGame('void-runner');
const SURVEY_URL = 'https://docs.google.com/forms/d/1z6v5TV6yMqfH6pLWUYhpNAMuXwVa7MADc-8bJnVy4dc/viewform';

export default function VoidRunnerClient() {
    const [showSurvey, setShowSurvey] = useState(false);

    // The Unity WebGL build dispatches `unityQuitGame` when the player quits from the menu.
    useEffect(() => {
        const handleUnityQuit = () => setShowSurvey(true);
        window.addEventListener('unityQuitGame', handleUnityQuit);
        return () => window.removeEventListener('unityQuitGame', handleUnityQuit);
    }, []);

    return (
        <main>
            <PageView name="Void Runner" />
            <AccentSync accent={game.accent} onAccent={game.onAccent} />

            <GameHero
                title={game.title}
                tagline="High-speed infinite arcade combat."
                image={game.shots[0]}
                facts={[
                    { label: 'Genre', value: game.genre },
                    { label: 'Platform', value: game.platform },
                    { label: 'Status', value: game.status },
                ]}
                actions={
                    <>
                        <a href="#play" className="btn btn-primary">Play now</a>
                        <a href="#screens" className="btn btn-ghost">See screenshots</a>
                    </>
                }
            />

            <section className="game-section">
                <h2>Survive the endless run</h2>
                <div className="game-prose">
                    <p>
                        Void Runner is a high-octane 3D flying arcade shooter where reflexes mean everything.
                        Navigate infinitely generating pathways through a hostile network, blast holes in data-cube
                        walls and slip between firewall beams in classic, Star Fox-style combat.
                    </p>
                    <p>
                        The void is unrelenting, and it is watching. The Arbiter studies how you fly and adapts to
                        your skill, so every run is as challenging as it is exhilarating.
                    </p>
                </div>
            </section>

            <div className="alt-bg">
                <div className="alt-bg-inner">
                    <h2>Flight systems</h2>
                    <div className="features-grid">
                        <div className="feature-card">
                            <h3>Adaptive difficulty AI</h3>
                            <p>Enemy spawns, hazard density and combat intensity shift in real time based on how you are flying.</p>
                        </div>
                        <div className="feature-card">
                            <h3>Ghost Protocol</h3>
                            <p>An assist system that learns from your past runs to guide you, with strategic advantages and split-second warnings.</p>
                        </div>
                        <div className="feature-card">
                            <h3>Arcade combat</h3>
                            <p>Lock on, barrel roll and unleash your payload. Fluid, responsive controls built for high-speed engagement.</p>
                        </div>
                    </div>
                </div>
            </div>

            <section id="screens" className="game-section">
                <h2>Screenshots</h2>
                <Gallery shots={game.shots} title={game.title} />
            </section>

            <section id="play" className="play-section">
                <h2>Play the demo</h2>
                <p>Runs in your browser on desktop. Click inside the game to give it your keyboard.</p>

                <div className="play-frame">
                    <iframe
                        src="https://unity-td-fps-game-builds.s3.us-east-2.amazonaws.com/void-runner/index.html"
                        title="Void Runner, playable WebGL build"
                        allow="autoplay; fullscreen; xr-spatial-tracking; camera; microphone"
                        scrolling="no"
                    />
                </div>

                <div className="play-controls">
                    <span><kbd>W</kbd> <kbd>S</kbd> Pitch</span>
                    <span><kbd>A</kbd> <kbd>D</kbd> Bank</span>
                    <span><kbd>Space</kbd> Boost</span>
                    <span><kbd>Left Shift</kbd> Brake</span>
                    <span><kbd>Right Shift</kbd> Fire</span>
                    <button type="button" className="btn btn-ghost" onClick={() => setShowSurvey(true)}>
                        Exit game
                    </button>
                </div>

                <Leaderboard />
            </section>

            {showSurvey && (
                <div className="survey-overlay" role="dialog" aria-modal="true" aria-labelledby="survey-title">
                    <div className="survey-box">
                        <h2 id="survey-title">Thanks for flying</h2>
                        <p>Your feedback shapes the next build of Void Runner. Do you have a minute for a short survey?</p>
                        <div className="btn-row">
                            <a
                                href={SURVEY_URL}
                                target="_blank"
                                rel="noreferrer"
                                className="btn btn-primary"
                                onClick={() => setShowSurvey(false)}
                            >
                                Take the survey
                            </a>
                            <button type="button" onClick={() => setShowSurvey(false)} className="btn btn-ghost">
                                Not now
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
