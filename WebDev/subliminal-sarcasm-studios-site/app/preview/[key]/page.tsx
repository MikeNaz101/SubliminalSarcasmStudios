import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import '../../game-page.css';
import './pin-ballin.css';
import AccentSync from '../../../components/AccentSync';
import PageView from '../../../components/PageView';
import { SUPPORT_EMAIL } from '../../../lib/contact';
import { buildUrl, previewKey } from '../../../lib/pinBallinPreview';
import PinBallinArt from './PinBallinArt';
import PinBallinPlayer from './PinBallinPlayer';

// Private, unlisted preview. See lib/pinBallinPreview.ts for how the link works.
// Rendered per request so a changed key takes effect without a rebuild of this page.
export const dynamic = 'force-dynamic';

const ACCENT = '#4FD2FF';
const ON_ACCENT = '#00131c';

export const metadata: Metadata = {
    title: 'Pin Ballin (private preview)',
    description: 'A private preview build of Pin Ballin.',
    robots: {
        index: false,
        follow: false,
        nocache: true,
        googleBot: { index: false, follow: false, noimageindex: true },
    },
    // Keep link previews in chat apps plain, so a shared link doesn't advertise the game.
    openGraph: null,
    twitter: null,
};

const heroes = [
    { name: 'Knight', joins: 'From the start', power: 'Shield Wall', what: 'Throws a draining ball back into play.' },
    { name: 'Archer', joins: 'Reach level 3', power: 'Volley', what: 'Arrows hit every bumper on the ball’s level.' },
    { name: 'Mage', joins: 'Score 40,000', power: 'Levitate', what: 'The ball weighs nothing for a few seconds. Then it all comes back at once.' },
    { name: 'Cleric', joins: 'Collect 2 feathers', power: 'Mend', what: 'Rebuilds broken flippers on your level and the one below.' },
];

export default async function PinBallinPreview({ params }: { params: Promise<{ key: string }> }) {
    const { key } = await params;
    const expected = previewKey();
    if (!expected || key !== expected) notFound();

    const src = buildUrl();
    const feedback = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent('Pin Ballin preview feedback')}`;

    return (
        <main className="pb-page">
            <PageView name="Pin Ballin" />
            <AccentSync accent={ACCENT} onAccent={ON_ACCENT} />

            <header className="game-hero pb-hero">
                <PinBallinArt className="pb-hero-art pb-art-wide" />
                <PinBallinArt className="pb-hero-art pb-art-narrow" centered />
                <div className="game-hero-scrim" aria-hidden="true" />
                <div className="game-hero-content wrap">
                    <p className="pb-badge"><span aria-hidden="true" /> Private preview</p>
                    <h1 className="game-title pb-title">Pin Ballin</h1>
                    <p className="game-tagline">
                        Infinite vertical pinball. Climb the tower one table at a time, but the higher you go, the
                        heavier the ball gets.
                    </p>
                    <div className="btn-row">
                        <a href="#play" className="btn btn-primary">Play now</a>
                        <a href="#how" className="btn btn-ghost">How it works</a>
                    </div>
                </div>
            </header>

            <div className="stats-bar">
                <dl className="wrap stats-list">
                    <div className="stat-item"><dt className="stat-label">Genre</dt><dd className="stat-value">Arcade pinball</dd></div>
                    <div className="stat-item"><dt className="stat-label">Engine</dt><dd className="stat-value">Unity 6</dd></div>
                    <div className="stat-item"><dt className="stat-label">Plays on</dt><dd className="stat-value">Desktop and phone browsers</dd></div>
                    <div className="stat-item"><dt className="stat-label">Status</dt><dd className="stat-value">Work in progress</dd></div>
                </dl>
            </div>

            <section id="play" className="play-section pb-play">
                <h2>Play</h2>
                <p>
                    You&apos;re one of a few people with this link. It&apos;s an early build, so expect rough edges,
                    and please keep the link to yourself for now.
                </p>
                <PinBallinPlayer src={src} />
            </section>

            <div id="how" className="alt-bg">
                <div className="alt-bg-inner">
                    <h2>How it works</h2>
                    <div className="features-grid">
                        <div className="feature-card">
                            <h3>An endless tower</h3>
                            <p>Every level is its own table. Shoot up through the next level&apos;s flippers to climb. Drain and you drop to the level below.</p>
                        </div>
                        <div className="feature-card">
                            <h3>Height means weight</h3>
                            <p>The higher the ball climbs, the heavier and harder-hitting it gets. Feathers make it lighter so you can push higher.</p>
                        </div>
                        <div className="feature-card">
                            <h3>The plummet</h3>
                            <p>Get too heavy and the ball crashes down ten levels, smashing everything it passes, then comes back molten for double damage.</p>
                        </div>
                        <div className="feature-card">
                            <h3>Everything breaks</h3>
                            <p>Bumpers and flippers have HP. Break a bumper for a bonus. Lose a flipper and that side stays open until it&apos;s repaired.</p>
                        </div>
                    </div>
                </div>
            </div>

            <section className="game-section">
                <h2>The Adventuring Party</h2>
                <div className="game-prose" style={{ marginBottom: 32 }}>
                    <p>
                        A party of heroes climbs the tower with you. Every bumper is a monster in their dungeon, and
                        every fifth level is a boss room. Damage you deal charges their powers.
                    </p>
                </div>
                <ul className="pb-heroes">
                    {heroes.map((hero) => (
                        <li key={hero.name} className="pb-hero-card">
                            <h3>{hero.name}</h3>
                            <p className="pb-hero-joins">{hero.joins}</p>
                            <p><strong>{hero.power}.</strong> {hero.what}</p>
                        </li>
                    ))}
                </ul>
            </section>

            <div className="alt-bg">
                <div className="alt-bg-inner">
                    <h2>Controls</h2>
                    <div className="pb-controls">
                        <div>
                            <h3>Keyboard and mouse</h3>
                            <dl>
                                <div><dt><kbd>A</kbd> <kbd>&larr;</kbd> or left click</dt><dd>Left flippers</dd></div>
                                <div><dt><kbd>D</kbd> <kbd>&rarr;</kbd> or right click</dt><dd>Right flippers</dd></div>
                                <div><dt><kbd>Space</kbd></dt><dd>Nudge</dd></div>
                                <div><dt><kbd>Q</kbd> / <kbd>E</kbd></dt><dd>Archer&apos;s Volley / Mage&apos;s Levitate</dd></div>
                                <div><dt><kbd>R</kbd></dt><dd>Restart after game over</dd></div>
                                <div><dt><kbd>M</kbd></dt><dd>Mute the music</dd></div>
                            </dl>
                        </div>
                        <div>
                            <h3>Phone</h3>
                            <dl>
                                <div><dt>Hold left or right half</dt><dd>Those flippers</dd></div>
                                <div><dt>Swipe up, left side</dt><dd>Volley</dd></div>
                                <div><dt>Swipe up, right side</dt><dd>Levitate</dd></div>
                                <div><dt>Swipe down</dt><dd>Nudge</dd></div>
                                <div><dt>Tap the party portraits</dt><dd>Pause and open the quest</dd></div>
                            </dl>
                            <p className="pb-note">Hold your phone upright. Sound starts after your first tap.</p>
                        </div>
                    </div>
                </div>
            </div>

            <section className="game-section pb-feedback">
                <h2>Tell me what you think</h2>
                <div className="game-prose">
                    <p>
                        What made you laugh, what felt unfair, how high you got, and anything that broke. Mention your
                        device and browser if something went wrong.
                    </p>
                </div>
                <div className="btn-row" style={{ marginTop: 24 }}>
                    <a href={feedback} className="btn btn-primary">Send feedback</a>
                </div>
            </section>
        </main>
    );
}
