import type { Metadata } from 'next';
import '../game-page.css';
import AccentSync from '../../components/AccentSync';
import GameHero from '../../components/GameHero';
import Gallery from '../../components/Gallery';
import PageView from '../../components/PageView';
import { getFeaturedGame } from '../../lib/games';

const game = getFeaturedGame('syn-city');

export const metadata: Metadata = {
    title: 'Syn City',
    description: 'A first-person educational puzzler where you debug real C# to keep a glitching city standing.',
    openGraph: { images: ['/images/games/syn-city/01.jpg'] },
};

export default function SynCity() {
    return (
        <main>
            <PageView name="Syn City" />
            <AccentSync accent={game.accent} onAccent={game.onAccent} />

            <GameHero
                title={game.title}
                tagline="Error 404: hope not found."
                image={game.shots[0]}
                facts={[
                    { label: 'Genre', value: game.genre },
                    { label: 'Language taught', value: 'C# / .NET' },
                    { label: 'Platform', value: game.platform },
                    { label: 'Status', value: game.status },
                ]}
                actions={
                    <>
                        <a href="#play" className="btn btn-primary">Start debugging</a>
                        <a href="#screens" className="btn btn-ghost">See screenshots</a>
                    </>
                }
            />

            <section className="game-section">
                <h2>Fix the code, save the city</h2>
                <div className="game-prose">
                    <p>
                        Welcome to <strong>Syn City</strong>, a digital metropolis on the brink of collapse. The source
                        code that governs reality has been corrupted by rogue malware: gravity fails, buildings
                        glitch and logic breaks down.
                    </p>
                    <p>
                        You play a <strong>Runtime Agent</strong> armed with a debugger. Traverse the glitching
                        districts, track down syntax errors and flipped booleans, and rewrite the C# scripts that
                        control the world around you.
                    </p>
                </div>
                <pre className="code-sample" aria-label="Example of a script the player repairs"><code>
<span style={{ color: '#569cd6' }}>void</span> <span style={{ color: '#dcdcaa' }}>RepairBridge</span>() {'{'}{'\n'}
{'    '}<span style={{ color: '#569cd6' }}>if</span> (!isBroken) <span style={{ color: '#c586c0' }}>return</span>;{'\n'}
{'    '}<span style={{ color: '#6a9955' }}>{'// TODO: Player must fix this syntax error to proceed!'}</span>{'\n'}
{'    '}bridge.<span style={{ color: '#dcdcaa' }}>SetActive</span>(<span style={{ color: '#569cd6' }}>true</span>);{'\n'}
{'}'}
                </code></pre>
            </section>

            <div className="alt-bg">
                <div className="alt-bg-inner">
                    <h2>What you learn</h2>
                    <div className="features-grid">
                        <div className="feature-card"><h3>Visual debugging</h3><p>Watch code execute in real time. Write an infinite loop and the world freezes around you.</p></div>
                        <div className="feature-card"><h3>Syntax and semantics</h3><p>Build errors are walls blocking your path. Runtime errors are the floor giving way beneath you.</p></div>
                        <div className="feature-card"><h3>Object-oriented combat</h3><p>Beat enemies by spotting their class weaknesses and instantiating the right counter-objects.</p></div>
                        <div className="feature-card"><h3>Real C# skills</h3><p>No drag-and-drop blocks. You type actual C# syntax, variables, loops and methods to solve puzzles.</p></div>
                    </div>
                </div>
            </div>

            <section id="screens" className="game-section">
                <h2>Screenshots</h2>
                <Gallery shots={game.shots} title={game.title} />
            </section>

            <section id="play" className="play-section">
                <h2>Play the early access build</h2>
                <p>Runs in your browser on desktop. Click inside the game to capture your mouse and keyboard.</p>
                <div className="play-frame">
                    <iframe
                        src="https://d1u9qse8chzfnc.cloudfront.net/syn-city-game/index.html"
                        title="Syn City, playable WebGL build"
                        allow="autoplay; fullscreen; xr-spatial-tracking; payment; camera; microphone"
                        scrolling="no"
                    />
                </div>
                <div className="play-controls">
                    <span><kbd>W</kbd> <kbd>A</kbd> <kbd>S</kbd> <kbd>D</kbd> Move</span>
                    <span>Mouse to look</span>
                    <span><kbd>E</kbd> Show or hide the debugging task</span>
                </div>
            </section>
        </main>
    );
}
