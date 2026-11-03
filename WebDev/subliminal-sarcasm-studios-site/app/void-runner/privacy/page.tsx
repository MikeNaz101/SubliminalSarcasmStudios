import type { Metadata } from 'next';
import Link from 'next/link';
import '../../game-page.css';
import PageView from '../../../components/PageView';
import { SUPPORT_EMAIL } from '../../../lib/contact';

export const metadata: Metadata = {
    title: 'Void Runner privacy policy',
    description: 'What Void Runner collects, why, who handles it, and how to delete it.',
};

const LAST_UPDATED = 'November 2, 2026';

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
                        <strong>While the game is open,</strong> it tells other players&apos; games that you&apos;re online: your
                        call sign, your kind of device (for example iPhone) and what you&apos;re doing (in the menus, flying, on the
                        co-op screen or racing). This is passed along live and not stored. Turn SHOW ME ONLINE off in the PILOTS
                        ONLINE list to stop it.
                    </p>
                    <p>
                        <strong>Friends.</strong> If you&apos;re signed in and use FRIENDS, we store your friends list, the friend
                        requests and co-op invites you send and receive, and what you were last doing in the game, so your friends
                        can see when you&apos;re on.
                    </p>
                    <p>
                        <strong>Co-op</strong> sessions run on Unity Gaming Services. When you create or join one, the game signs
                        in to Unity with an anonymous player ID. Unity uses your IP address to pick a nearby server (an approximate
                        location) and may collect crash data. Your ship&apos;s moves, call sign and kind of device are sent live to
                        the other pilots in the session.
                    </p>
                    <p>
                        <strong>Reports and blocks.</strong> If you report a pilot, we store the call sign you reported, the reason,
                        where you saw them, any note you add and, if you&apos;re signed in, your account, so we can look into it. If
                        you block a pilot while signed in, the block is stored on your account; a guest&apos;s blocks stay on the
                        device.
                    </p>
                    <p>
                        <strong>On iPhone and iPad,</strong> achievements are kept by Apple&apos;s Game Center under Apple&apos;s
                        privacy policy.
                    </p>

                    <h3>How we use it</h3>
                    <p>
                        To run the game: keep your progress, show your call sign and best results on the Void Runner
                        leaderboards, match you with other pilots, connect you with friends and co-op crews, and balance
                        difficulty. To keep it safe: call signs with offensive words are refused, we review reports and reset
                        offensive call signs, and blocks keep a pilot from adding you or inviting you. We don&apos;t show ads, we
                        don&apos;t track you across other apps or websites, and we don&apos;t sell your data.
                    </p>

                    <h3>Who else handles it</h3>
                    <p>
                        Supabase hosts pilot accounts and game data. Render hosts the game server that receives run results.
                        Amazon Web Services hosts the game files. Apple and Google handle sign-in when you choose them. Unity
                        Technologies runs co-op sessions (Unity Gaming Services) under Unity&apos;s privacy policy.
                    </p>

                    <h3>What is public</h3>
                    <p>
                        Your call sign, results and Online Race record appear on the public leaderboards. Other players can see
                        your call sign and what you&apos;re doing while you&apos;re online (unless SHOW ME ONLINE is off), and your
                        friends see when you&apos;re on. Your email address and account ID never appear, and a pilot you report is
                        never told who reported them.
                    </p>

                    <h3>Deleting your data</h3>
                    <p>
                        In the game, open ACCOUNT from the title screen, then PILOT ACCOUNT, then Delete account. This deletes
                        your pilot and all of its game data, then your sign-in account. If you signed in with Apple, we also
                        revoke the game&apos;s access to your Apple ID. If you use the same sign-in for another Subliminal Sarcasm
                        Studios app, that app keeps your sign-in, but all Void Runner data is deleted. That includes your
                        friends list, requests, invites and blocks. Reports you sent are kept without your account, so we can
                        still act on them.
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
