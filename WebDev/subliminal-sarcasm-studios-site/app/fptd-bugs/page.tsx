import type { Metadata } from 'next';
import '../game-page.css';
import AccentSync from '../../components/AccentSync';
import GameHero from '../../components/GameHero';
import PageView from '../../components/PageView';
import TrackedLink from '../../components/TrackedLink';

const GAME_NAME = 'FPS_TD_BUG_Game';

export const metadata: Metadata = {
    title: 'Project Aegis',
    description: 'An early hybrid of fast-paced FPS and strategic tower defense.',
};

export default function ProjectAegis() {
    return (
        <main>
            <PageView name={GAME_NAME} />
            <AccentSync accent="#7CE0FF" onAccent="#001820" />

            <GameHero
                title="Project Aegis"
                tagline="A hybrid of fast-paced FPS and strategic tower defense."
                facts={[
                    { label: 'Genre', value: 'FPS / tower defense' },
                    { label: 'Engine', value: 'Unity' },
                    { label: 'Status', value: 'Web alpha' },
                ]}
                actions={
                    <TrackedLink href="#play" gameName={GAME_NAME} className="btn btn-primary">
                        Play the web alpha
                    </TrackedLink>
                }
            />

            <section className="game-section">
                <h2>About the game</h2>
                <div className="game-prose">
                    <p>
                        Project Aegis throws you into a claustrophobic alien swarm. Defend your core against waves of
                        enemies with an arsenal of weapons while you build and upgrade defensive towers on the fly.
                        Success takes twitch-reflex gunplay and quick resource management.
                    </p>
                    <p>
                        Spend your scrap on that crucial tower upgrade, or save it for a more powerful weapon? Your
                        choices decide the fate of the core.
                    </p>
                </div>
            </section>

            <div className="alt-bg">
                <div className="alt-bg-inner">
                    <h2>Core features</h2>
                    <div className="features-grid">
                        <div className="feature-card"><h3>Fast player controller</h3><p>Responsive, Doom-inspired movement for high-speed engagements.</p></div>
                        <div className="feature-card"><h3>Grid-less tower building</h3><p>Build and upgrade towers anywhere on the map using the scrap you collect.</p></div>
                        <div className="feature-card"><h3>Enemy AI</h3><p>NavMesh-based enemies prioritize targets (player, core, doors) and react to their surroundings.</p></div>
                        <div className="feature-card"><h3>Adaptive difficulty director</h3><p>An AI director watches your accuracy and performance and tunes enemy aggression in real time.</p></div>
                        <div className="feature-card"><h3>Weapon system</h3><p>Hitscan weapons with recoil, aim down sights and damage drop-off.</p></div>
                        <div className="feature-card"><h3>Enemy senses</h3><p>Enemies hear your gunshots and use a field of view to pick up targets.</p></div>
                    </div>
                </div>
            </div>

            <section className="game-section">
                <h2>What&apos;s next</h2>
                <ul className="roadmap">
                    <li>New weapons and tower types.</li>
                    <li>More complex enemies, like the Spawner Queen.</li>
                    <li>A full set of balanced levels.</li>
                    <li>Final 3D models and sound design.</li>
                </ul>
            </section>

            <div className="alt-bg">
                <div className="alt-bg-inner">
                    <h2>Development team</h2>
                    <div className="team-list">
                        <div><span className="team-role">Lead developer and programmer</span><div className="team-name">Mike Nasierowski</div></div>
                        <div><span className="team-role">Project lead and level designer</span><div className="team-name">Vinny Verda</div></div>
                        <div><span className="team-role">Project manager and assistant programmer</span><div className="team-name">Jason Scott</div></div>
                        <div><span className="team-role">QA and gameplay balancing</span><div className="team-name">Derek</div></div>
                    </div>
                </div>
            </div>

            <section id="play" className="play-section">
                <h2>Play online</h2>
                <p>An early alpha that runs in your browser on desktop. Click inside the game to capture your cursor.</p>
                <div className="play-frame">
                    <iframe
                        src="https://unity-td-fps-game-builds.s3.amazonaws.com/unity-fps-td-game/index.html"
                        title="Project Aegis, playable WebGL alpha"
                        allow="autoplay; fullscreen; xr-spatial-tracking; payment; camera; microphone"
                        scrolling="no"
                    />
                </div>
                <div className="play-controls">
                    <span><kbd>W</kbd> <kbd>A</kbd> <kbd>S</kbd> <kbd>D</kbd> Move</span>
                    <span>Mouse to aim</span>
                    <span>Click to capture the cursor</span>
                    <span><kbd>Esc</kbd> Release it</span>
                </div>
            </section>
        </main>
    );
}
