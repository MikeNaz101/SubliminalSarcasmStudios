import type { Metadata } from 'next';
import '../game-page.css';
import AccentSync from '../../components/AccentSync';
import GameHero from '../../components/GameHero';
import PageView from '../../components/PageView';

export const metadata: Metadata = {
    title: 'Dimensional Stealth',
    description: 'A first-person stealth prototype about shifting between two realities.',
};

export default function DimensionalStealth() {
    return (
        <main>
            <PageView name="Dimensional Stealth" />
            <AccentSync accent="#00FFCC" onAccent="#001A14" />

            <GameHero
                title="Dimensional Stealth"
                tagline="Hunt. Shift. Survive."
                facts={[
                    { label: 'Genre', value: 'First-person stealth' },
                    { label: 'Mechanic', value: 'Reality shifting' },
                    { label: 'Status', value: 'Prototype' },
                ]}
            />

            <section className="game-section">
                <h2>Master two realities</h2>
                <div className="game-prose">
                    <p>
                        Survival depends on toggling cleanly between two distinct realities. Shift your physical
                        presence to bypass obstacles, solve puzzle chunks and outmaneuver threats.
                    </p>
                    <p>
                        Every shift carries a risk. Balance your time between hunting and hiding, and always know
                        which dimension you are standing in.
                    </p>
                </div>
            </section>

            <div className="alt-bg">
                <div className="alt-bg-inner">
                    <h2>Dual-dimension mechanics</h2>
                    <div className="features-grid">
                        <div className="feature-card">
                            <h3>The hunting grounds</h3>
                            <p>A serene but elusive reality full of passive creatures. Here you are the predator, gathering resources and tracking prey.</p>
                        </div>
                        <div className="feature-card">
                            <h3>The danger zone</h3>
                            <p>A hostile, nightmarish reflection of the world. Aggressive enemies patrol it, so stealth and fast traversal are everything.</p>
                        </div>
                        <div className="feature-card">
                            <h3>Behavior tree AI</h3>
                            <p>Creatures react to you across both dimensions, choosing to freeze, flee or roam based on what you do.</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
