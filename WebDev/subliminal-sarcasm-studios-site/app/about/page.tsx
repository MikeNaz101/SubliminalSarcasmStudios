import type { Metadata } from 'next';
import Link from 'next/link';
import '../game-page.css';
import './about.css';
import LogoEye from '../../components/LogoEye';
import PageView from '../../components/PageView';

export const metadata: Metadata = {
    title: 'About the studio',
    description: 'Subliminal Sarcasm Studios is an independent game studio that began among gamers at UAlbany.',
};

export default function About() {
    return (
        <main>
            <PageView name="About_Page" />

            <header className="about-hero">
                <div className="wrap about-hero-grid">
                    <div className="about-hero-copy">
                        <h1>About the studio</h1>
                        <p>Developing the unseen.</p>
                    </div>
                    <LogoEye variant="full" eager sizes="(max-width: 860px) 70vw, 440px" className="about-hero-logo" />
                </div>
            </header>

            <section className="game-section">
                <h2>Who we are</h2>
                <div className="game-prose">
                    <p>
                        Subliminal Sarcasm Studios began as a spark among a group of passionate gamers at UAlbany.
                        Late-night discussions and shared visions quickly caught fire, fueled by a collective desire
                        to contribute something meaningful to the world of entertainment.
                    </p>
                    <p>
                        We are not just developers. We are players who believe games are the ultimate frontier for
                        original ideas. The studio is built on that early camaraderie, turned into a professional
                        mission to bring our own brand of storytelling to the world.
                    </p>
                </div>
            </section>

            <div className="alt-bg" id="name">
                <div className="alt-bg-inner">
                    <h2>The name</h2>
                    <div className="game-prose">
                        <p>
                            To us, Subliminal Sarcasm stands for the layers in great game design. That duality lets
                            us build worlds that are intellectually engaging and stylistically bold.
                        </p>
                    </div>
                    <div className="duality-grid">
                        <div className="duality-card">
                            <h3>Subliminal</h3>
                            <p>The nuance of the player experience: subtle mechanics, environmental storytelling and the invisible logic that makes a game feel alive.</p>
                        </div>
                        <div className="duality-card">
                            <h3>Sarcasm</h3>
                            <p>Our edge and our personality. A sharp, self-aware refusal to take the status quo at face value that keeps every experience fresh.</p>
                        </div>
                    </div>
                    <p className="about-wink">The best games have a wink to them: a hidden depth that rewards you for looking closer.</p>
                </div>
            </div>

            <section className="game-section">
                <h2>The road ahead</h2>
                <div className="game-prose">
                    <p>
                        We are deeply committed to our own original IP, and our technical roadmap is just as
                        ambitious. We are actively developing for <strong>VR and XR</strong>, with a focus on
                        cross-platform experiences that bridge XR, console, PC and iOS so our games exist wherever
                        our players are.
                    </p>
                    <p>Every project carries the same two commitments:</p>
                </div>
                <ul className="roadmap about-commitments">
                    <li><strong>Narrative excellence.</strong> Storytelling is our biggest contribution to the creative world.</li>
                    <li><strong>Mechanical innovation.</strong> We care as much about the how as the why, and push game logic so every player gets a unique, tactile experience.</li>
                </ul>
                <div className="btn-row about-cta">
                    <Link href="/#games" className="btn btn-primary">See our games</Link>
                </div>
            </section>
        </main>
    );
}
