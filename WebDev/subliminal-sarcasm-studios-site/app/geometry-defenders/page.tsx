import type { Metadata } from 'next';
import Link from 'next/link';
import '../game-page.css';
import AccentSync from '../../components/AccentSync';
import GameHero from '../../components/GameHero';
import PageView from '../../components/PageView';
import { getFeaturedGame } from '../../lib/games';

const game = getFeaturedGame('geometry-defenders');

export const metadata: Metadata = {
    title: 'Geometry Defenders XR',
    description: 'An immersive tower defense game designed for modern VR and XR headsets.',
};

export default function GeometryDefenders() {
    return (
        <main>
            <PageView name="Geometry Defenders" />
            <AccentSync accent={game.accent} onAccent={game.onAccent} />

            <GameHero
                title={game.title}
                tagline={game.tagline}
                image={game.shots[0]}
                facts={[
                    { label: 'Genre', value: game.genre },
                    { label: 'Platform', value: game.platform },
                    { label: 'Status', value: game.status },
                ]}
            />

            <section className="game-section">
                <h2>About the game</h2>
                <div className="game-prose">
                    <p>{game.summary}</p>
                    <p>
                        Geometry Defenders is part of the studio&apos;s push into VR and XR, where we are building
                        experiences meant to be played in the headset first.
                    </p>
                    <p>
                        Captures from the headset and a full rundown of the game are on their way. In the meantime,
                        you can <Link href="/void-runner#play" className="inline-link">play Void Runner</Link> in your
                        browser.
                    </p>
                </div>
            </section>
        </main>
    );
}
