import type { Metadata } from 'next';
import Link from 'next/link';
import '../../game-page.css';
import PageView from '../../../components/PageView';
import { SUPPORT_EMAIL } from '../../../lib/contact';

export const metadata: Metadata = {
    title: 'Void Runner privacy policy',
    description: 'What Void Runner collects, why, who handles it, and how to delete it.',
};

const LAST_UPDATED = 'October 21, 2026';

export default function VoidRunnerPrivacy() {
    const mail = <a href={`mailto:${SUPPORT_EMAIL}?subject=Void%20Runner%20privacy`}>{SUPPORT_EMAIL}</a>;
    return (
        <main>
            <PageView name="Void Runner Privacy" />

            <section className="game-section">
                <h2>Void Runner privacy policy</h2>
                <div className="game-prose">
                    <p>Last updated: {LAST_UPDATED}</p>
                    <p>
                        Void Runner is made by Subliminal Sarcasm Studios, LLC (&quot;we&quot;). This policy covers the game on
                        iPhone and iPad, in the browser and on desktop.
                    </p>

                    <h3>What we collect</h3>
                    <p>
                        <strong>If you play as a guest,</strong> your progress stays on your device. When a run ends, the game
                        sends your call sign and the run&apos;s results (score, waves, distance, threat level and grade) to our
                        game server so we can balance the game. No device identifier is sent.
                    </p>
                    <p>
                        <strong>If you sign in</strong> with Apple, Google or an email address, we store your email address
                        (Sign in with Apple may give us a private relay address instead), an account ID and the call sign you
                        choose, and your progress: XP, level, skills, cosmetics and banked data, plus your runs, Story Mode saves
                        and Online Race results.
                    </p>
                    <p>
                        <strong>During an Online Race,</strong> your ship&apos;s position, speed and hits are sent live to your
                        opponent&apos;s game. Only the result is stored.
                    </p>
                    <p>
                        <strong>On iPhone and iPad,</strong> achievements are kept by Apple&apos;s Game Center under Apple&apos;s
                        privacy policy.
                    </p>

                    <h3>How we use it</h3>
                    <p>
                        To run the game: keep your progress, show your call sign and best results on the Void Runner
                        leaderboards, match you with other pilots, and balance difficulty. We don&apos;t show ads, we don&apos;t
                        track you across other apps or websites, and we don&apos;t sell your data.
                    </p>

                    <h3>Who else handles it</h3>
                    <p>
                        Supabase hosts pilot accounts and game data. Render hosts the game server that receives run results.
                        Amazon Web Services hosts the game files. Apple and Google handle sign-in when you choose them.
                    </p>

                    <h3>What is public</h3>
                    <p>
                        Your call sign, results and Online Race record appear on the public leaderboards. Your email address
                        and account ID never do.
                    </p>

                    <h3>Deleting your data</h3>
                    <p>
                        In the game, open ACCOUNT from the title screen, then PILOT ACCOUNT, then Delete account. This deletes
                        your pilot and all of its game data, then your sign-in account. If you signed in with Apple, we also
                        revoke the game&apos;s access to your Apple ID. If you use the same sign-in for another Subliminal Sarcasm
                        Studios app, that app keeps your sign-in, but all Void Runner data is deleted.
                    </p>
                    <p>
                        Guest progress is deleted when you delete the game or clear its storage. You can also ask us to delete
                        your data at {mail}.
                    </p>

                    <h3>Children</h3>
                    <p>
                        Void Runner is not directed at children under 13, and we don&apos;t knowingly collect personal information
                        from them. If you think a child under 13 has signed in, contact us and we will delete the account.
                    </p>

                    <h3>Changes</h3>
                    <p>
                        If this policy changes, we will update the date above and, for significant changes, tell signed-in
                        players in the game.
                    </p>

                    <h3>Contact</h3>
                    <p>
                        {mail} · <Link href="/void-runner/support">Void Runner support</Link>
                    </p>
                </div>
            </section>
        </main>
    );
}
