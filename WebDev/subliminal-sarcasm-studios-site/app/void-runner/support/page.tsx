import type { Metadata } from 'next';
import Link from 'next/link';
import '../../game-page.css';
import PageView from '../../../components/PageView';
import { SUPPORT_EMAIL } from '../../../lib/contact';

export const metadata: Metadata = {
    title: 'Void Runner support',
    description: 'Help with Void Runner: pilot accounts, progress, deleting your account, and how to contact the studio.',
};

export default function VoidRunnerSupport() {
    return (
        <main>
            <PageView name="Void Runner Support" />

            <section className="game-section">
                <h2>Void Runner support</h2>
                <div className="game-prose">
                    <p>
                        Stuck on something, found a bug, or want your data gone? Email us at{' '}
                        <a href={`mailto:${SUPPORT_EMAIL}?subject=Void%20Runner`}><strong>{SUPPORT_EMAIL}</strong></a>.
                        Tell us your call sign and the device you play on, and we will get back to you.
                    </p>
                </div>
            </section>

            <div className="alt-bg">
                <div className="alt-bg-inner">
                    <h2>Common questions</h2>
                    <div className="features-grid">
                        <div className="feature-card">
                            <h3>Do I need an account?</h3>
                            <p>
                                No. You can play as a guest, and your progress stays on your device. Sign in with Apple,
                                Google or email to keep your pilot across devices and appear on the leaderboards.
                            </p>
                        </div>
                        <div className="feature-card">
                            <h3>My progress is missing</h3>
                            <p>
                                Make sure you are signed in with the same account you used before. Guest progress lives
                                on one device; it moves to your pilot the first time you sign in on that device.
                            </p>
                        </div>
                        <div className="feature-card">
                            <h3>Deleting your account</h3>
                            <p>
                                In the game, open ACCOUNT from the title screen, then PILOT ACCOUNT, then Delete account.
                                That deletes your pilot and all of its game data. You can also email us and we will do it for you.
                            </p>
                        </div>
                        <div className="feature-card">
                            <h3>Online Race won&apos;t find a match</h3>
                            <p>
                                You are matched with pilots flying the same course. Try CREATE ROOM and send the code to a
                                friend, or practise against the bot while you wait.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <section className="game-section">
                <div className="game-prose">
                    <p>
                        How we handle your data: <Link href="/void-runner/privacy">Void Runner privacy policy</Link>.
                    </p>
                </div>
            </section>
        </main>
    );
}
