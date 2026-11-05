import type { Metadata } from 'next';
import Link from 'next/link';
import '../../game-page.css';
import '../playtest.css';
import AccentSync from '../../../components/AccentSync';
import GameHero from '../../../components/GameHero';
import PageView from '../../../components/PageView';
import { SUPPORT_EMAIL } from '../../../lib/contact';
import { getFeaturedGame } from '../../../lib/games';
import { PLAYTEST_SURVEY_URL, TESTFLIGHT_APP_URL, TESTFLIGHT_URL } from '../../../lib/voidRunnerPlaytest';

export const metadata: Metadata = {
    title: 'Void Runner playtest',
    description:
        'Join the Void Runner beta on iPhone and iPad through TestFlight, fly a few runs, then tell us what to fix in the playtest survey.',
    openGraph: { images: ['/images/games/void-runner/chrono-drag.jpg'] },
};

const game = getFeaturedGame('void-runner');
const heroShot = game.shots.find((s) => s.src.endsWith('chrono-drag.jpg')) ?? game.shots[0];

function TestFlightButton({ className = 'btn btn-primary' }: { className?: string }) {
    if (!TESTFLIGHT_URL) {
        return (
            <span className={`${className} is-unavailable`} aria-disabled="true">
                TestFlight invite coming soon
            </span>
        );
    }
    return (
        <a href={TESTFLIGHT_URL} className={className} target="_blank" rel="noreferrer">
            Join the beta on TestFlight
        </a>
    );
}

function SurveyButton({ className = 'btn btn-ghost' }: { className?: string }) {
    return (
        <a href={PLAYTEST_SURVEY_URL} className={className} target="_blank" rel="noreferrer">
            Take the playtest survey
        </a>
    );
}

export default function VoidRunnerPlaytest() {
    return (
        <main className="playtest-page">
            <PageView name="Void Runner Playtest" />
            <AccentSync accent={game.accent} onAccent={game.onAccent} />

            <GameHero
                title="Void Runner playtest"
                tagline="The iPhone and iPad build is in beta. Install it through TestFlight, fly a few runs, then tell us what to fix."
                image={heroShot}
                facts={[
                    { label: 'Build', value: 'iPhone and iPad beta' },
                    { label: 'Install with', value: 'Apple TestFlight (free)' },
                    { label: 'Survey', value: '5 to 10 minutes' },
                    { label: 'No iPhone?', value: <Link href="/void-runner#play">Play in your browser</Link> },
                ]}
                actions={
                    <>
                        <TestFlightButton />
                        <SurveyButton />
                    </>
                }
            />

            <section className="game-section" aria-labelledby="steps-title">
                <h2 id="steps-title">Join in three steps</h2>
                <ol className="playtest-steps">
                    <li className="playtest-step">
                        <h3>Get TestFlight</h3>
                        <p>
                            TestFlight is Apple&apos;s free app for trying games before they launch. Install it from the
                            App Store on the iPhone or iPad you want to play on.
                        </p>
                        <a href={TESTFLIGHT_APP_URL} className="btn btn-ghost" target="_blank" rel="noreferrer">
                            TestFlight on the App Store
                        </a>
                    </li>
                    <li className="playtest-step">
                        <h3>Accept the invite</h3>
                        {TESTFLIGHT_URL ? (
                            <p>
                                Open our invite on that same device, tap Accept, then Install. Void Runner lands on your
                                home screen with an orange dot by its name, which means it&apos;s a beta.
                            </p>
                        ) : (
                            <p>
                                The invite link goes up here as soon as the next build is ready for testers. Until then,
                                you can fly the browser version on a computer and still take the survey.
                            </p>
                        )}
                        <TestFlightButton />
                    </li>
                    <li className="playtest-step">
                        <h3>Fly, then tell us</h3>
                        <p>
                            Play a few runs. Story Mode is open from the start; Data Mining, Endless Void and Online
                            Race unlock as your pilot levels up. Then fill in the survey while it&apos;s still fresh.
                        </p>
                        <SurveyButton className="btn btn-primary" />
                    </li>
                </ol>
            </section>

            <div className="alt-bg">
                <div className="alt-bg-inner">
                    <h2>What we want to hear about</h2>
                    <div className="features-grid">
                        <div className="feature-card">
                            <h3>Handling</h3>
                            <p>
                                Does the ship go where you meant it to? Tight and responsive, or like driving a tractor
                                trailer on ice? On a phone, can you hit FIRE, CADET and the rolls without looking?
                            </p>
                        </div>
                        <div className="feature-card">
                            <h3>Reading the stream</h3>
                            <p>
                                At full speed, can you tell a deadly beam from a data block you can shoot? Can you keep
                                track of your hull, shields and laser heat without looking away?
                            </p>
                        </div>
                        <div className="feature-card">
                            <h3>Every mode you tried</h3>
                            <p>
                                Story&apos;s bosses, Data Mining&apos;s clock, Online Race&apos;s connection, co-op with
                                your crew. The survey only asks about the modes you actually played.
                            </p>
                        </div>
                        <div className="feature-card">
                            <h3>Fair deaths</h3>
                            <p>
                                Did every crash feel like your fault, or did the game cheat? Did you want to launch
                                again the second your last clone went down?
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <section className="game-section" aria-labelledby="bugs-title">
                <h2 id="bugs-title">Found a bug?</h2>
                <div className="game-prose">
                    <p>
                        <strong>On iPhone or iPad,</strong> take a screenshot while you play and tap Share Beta Feedback.
                        It reaches us with your device and build details attached. You can also open TestFlight, tap
                        Void Runner and choose Send Beta Feedback.
                    </p>
                    <p>
                        <strong>Anywhere else,</strong> email{' '}
                        <a href={`mailto:${SUPPORT_EMAIL}?subject=Void%20Runner%20playtest`} className="inline-link">{SUPPORT_EMAIL}</a>{' '}
                        with your call sign, your device and what happened.
                    </p>
                    <p>
                        Each beta build lasts 90 days. When we ship a new one, TestFlight lets you know and you can
                        update in a tap.
                    </p>
                    <p className="playtest-fine">
                        The survey runs on Google Forms and asks for your first name and age. How the game itself handles
                        your data: <Link href="/void-runner/privacy" className="inline-link">Void Runner privacy policy</Link>. Need help?{' '}
                        <Link href="/void-runner/support" className="inline-link">Void Runner support</Link>.
                    </p>
                </div>
            </section>
        </main>
    );
}
