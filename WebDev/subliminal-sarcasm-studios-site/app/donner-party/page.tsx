import type { Metadata } from 'next';
import '../game-page.css';
import AccentSync from '../../components/AccentSync';
import GameHero from '../../components/GameHero';
import Gallery from '../../components/Gallery';
import PageView from '../../components/PageView';
import TrackedLink from '../../components/TrackedLink';
import { getFeaturedGame } from '../../lib/games';

const game = getFeaturedGame('donner-party');
const PLAY_URL = 'https://play.subliminalsarcasmstudios.com';

export const metadata: Metadata = {
    title: 'The Donner Party... Game?',
    description: 'A multiplayer, vote-driven survival game: one host screen, everyone else on their phones.',
    openGraph: { images: ['/images/games/donner-party/01.jpg'] },
};

export default function DonnerParty() {
    return (
        <main>
            <PageView name="Donner Party" />
            <AccentSync accent={game.accent} onAccent={game.onAccent} />

            <GameHero
                title={game.title}
                tagline="Survival. Betrayal. The Oregon Trail, reimagined."
                image={game.shots[0]}
                facts={[
                    { label: 'Genre', value: game.genre },
                    { label: 'Players', value: 'One host screen, everyone on their phone' },
                    { label: 'Platform', value: game.platform },
                    { label: 'Status', value: game.status },
                ]}
                actions={
                    <>
                        <TrackedLink href={PLAY_URL} gameName="Donner Party" className="btn btn-primary" external>
                            Start a journey
                        </TrackedLink>
                        <a href="#screens" className="btn btn-ghost">See screenshots</a>
                    </>
                }
            />

            <section className="game-section">
                <h2>About the game</h2>
                <div className="game-prose">
                    <p>
                        Embark on a perilous journey west in a re-imagining of the classic trail adventure. Manage
                        resources, make hard calls and face the realities of the frontier together.
                    </p>
                    <p>
                        This is a <strong>multiplayer, vote-driven experience</strong> where cooperation and
                        communication decide who survives. Will your party reach its destination, or succumb to the
                        dangers of the trail?
                    </p>
                </div>
            </section>

            <div className="alt-bg">
                <div className="alt-bg-inner">
                    <h2>Core features</h2>
                    <div className="features-grid">
                        <div className="feature-card"><h3>Vote-driven decisions</h3><p>Players vote on every scenario from a streamlined, tabbed phone UI. Every choice matters.</p></div>
                        <div className="feature-card"><h3>Caravan persistence</h3><p>The host screen tracks the caravan on the map and animates its progress between waypoints.</p></div>
                        <div className="feature-card"><h3>Player trading</h3><p>Trade personal items with other players, or pay into the party&apos;s shared funds.</p></div>
                        <div className="feature-card"><h3>Survival pressure</h3><p>Hunger, thirst and sanity drain over time, forcing hard choices about what to use and when.</p></div>
                        <div className="feature-card"><h3>Inventory management</h3><p>Juggle your personal inventory and the shared supplies. Items degrade when a use fails.</p></div>
                        <div className="feature-card"><h3>Weighted outcomes</h3><p>Event results roll against systems influenced by each character class&apos;s modifiers.</p></div>
                    </div>
                </div>
            </div>

            <section id="screens" className="game-section">
                <h2>Screenshots</h2>
                <Gallery shots={game.shots} title={game.title} />
            </section>

            <div className="alt-bg">
                <div className="alt-bg-inner">
                    <h2>Development team</h2>
                    <div className="team-list">
                        <div><span className="team-role">Project lead and backend</span><div className="team-name">Mike Nasierowski</div></div>
                        <div><span className="team-role">Game logic and database</span><div className="team-name">Schuyler Deno</div></div>
                        <div><span className="team-role">Historical research</span><div className="team-name">Elijah Robinson</div></div>
                        <div><span className="team-role">Lead artist</span><div className="team-name">Nick Popiel</div></div>
                        <div><span className="team-role">UI/UX and QA</span><div className="team-name">Tyler Barnes</div></div>
                    </div>
                </div>
            </div>
        </main>
    );
}
