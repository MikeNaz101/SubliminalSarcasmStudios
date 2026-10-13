import Image from 'next/image';
import Link from 'next/link';
import type { CSSProperties } from 'react';
import GameShowcase from '../components/GameShowcase';
import LogoEye from '../components/LogoEye';
import PageView from '../components/PageView';
import { featuredGames, inDevelopment, type FeaturedGame } from '../lib/games';
import './page.css';

function PlayButton({ game }: { game: FeaturedGame }) {
    if (!game.play) return null;
    return game.play.external ? (
        <a href={game.play.href} className="btn btn-primary" target="_blank" rel="noreferrer">
            {game.play.label}
        </a>
    ) : (
        <Link href={game.play.href} className="btn btn-primary">{game.play.label}</Link>
    );
}

function GameRow({ game, flip }: { game: FeaturedGame; flip: boolean }) {
    const [key, ...rest] = game.shots;
    const phone = rest.find((s) => s.height > s.width);
    const extras = rest.filter((s) => s.width >= s.height).slice(0, 2);
    const isSvg = key.src.endsWith('.svg');

    return (
        <article
            className={`game-row${flip ? ' is-flipped' : ''}`}
            style={{ '--accent': game.accent, '--on-accent': game.onAccent } as CSSProperties}
            aria-labelledby={`row-${game.slug}`}
        >
            <div className={`game-row-media${phone ? ' has-phone' : ''}`}>
                <Link href={game.href} className="game-row-key" tabIndex={-1} aria-hidden="true">
                    <Image
                        src={key.src}
                        alt=""
                        width={key.width}
                        height={key.height}
                        sizes="(max-width: 960px) 100vw, 760px"
                        unoptimized={isSvg}
                    />
                </Link>
                {phone && (
                    <figure className="game-row-phone">
                        <Image src={phone.src} alt={phone.alt} width={phone.width} height={phone.height} sizes="200px" />
                    </figure>
                )}
                {extras.length > 0 && (
                    <div className="game-row-extras">
                        {extras.map((shot) => (
                            <Image
                                key={shot.src}
                                src={shot.src}
                                alt={shot.alt}
                                width={shot.width}
                                height={shot.height}
                                sizes="(max-width: 960px) 50vw, 380px"
                            />
                        ))}
                    </div>
                )}
                {game.awaitingScreens && (
                    <p className="game-row-caption">Title card. Captures from the headset are coming soon.</p>
                )}
            </div>

            <div className="game-row-body">
                <h3 id={`row-${game.slug}`}>
                    <Link href={game.href}>{game.title}</Link>
                </h3>
                <p className="game-row-tagline">{game.tagline}</p>
                <p className="game-row-summary">{game.summary}</p>
                <dl className="facts">
                    <div><dt>Genre</dt><dd>{game.genre}</dd></div>
                    <div><dt>Platform</dt><dd>{game.platform}</dd></div>
                    <div><dt>Status</dt><dd>{game.status}</dd></div>
                </dl>
                <div className="btn-row">
                    <PlayButton game={game} />
                    <Link href={game.href} className={game.play ? 'btn btn-ghost' : 'btn btn-primary'}>
                        About the game
                    </Link>
                </div>
            </div>
        </article>
    );
}

export default function Home() {
    return (
        <main>
            <PageView name="Home_Page" />
            <h1 className="sr-only">Subliminal Sarcasm Studios</h1>

            <GameShowcase games={featuredGames} />

            <section id="games" className="games wrap" aria-labelledby="games-title">
                <div className="section-head">
                    <h2 id="games-title">Our games</h2>
                    <p>Four projects far enough along to play, show off or put in front of a crowd.</p>
                </div>
                <div className="game-rows">
                    {featuredGames.map((game, i) => (
                        <GameRow key={game.slug} game={game} flip={i % 2 === 1} />
                    ))}
                </div>
            </section>

            <section id="studio" className="studio" aria-labelledby="studio-title">
                <div className="wrap studio-grid">
                    <div className="studio-logo">
                        <LogoEye variant="full" sizes="(max-width: 860px) 80vw, 520px" />
                    </div>
                    <div className="studio-copy">
                        <h2 id="studio-title">Developing the unseen.</h2>
                        <p>
                            Subliminal Sarcasm started at UAlbany as a group of friends who could not stop talking
                            about the games they wished existed. Now we are a small independent studio making them:
                            browser games you can play right now, party games for a room full of phones, and VR built
                            for the headset first.
                        </p>
                        <p>
                            The name is the method. Subliminal for the systems you feel before you notice them.
                            Sarcasm for the wink that tells you to look a little closer.
                        </p>
                        <div className="btn-row">
                            <Link href="/about" className="btn btn-light">About the studio</Link>
                        </div>
                    </div>
                </div>
            </section>

            <section id="in-development" className="early wrap" aria-labelledby="early-title">
                <details className="early-details">
                    <summary>
                        <span className="early-summary-text">
                            <h2 id="early-title">In lower stages of development</h2>
                            <span>Early builds and ideas we are still finding the fun in. Expect rough edges.</span>
                        </span>
                        <span className="early-toggle" aria-hidden="true" />
                    </summary>
                    <ul className="early-list">
                        {inDevelopment.map((project) => (
                            <li key={project.title} className="early-item">
                                <div>
                                    <h3>{project.title}</h3>
                                    <p>{project.summary}</p>
                                </div>
                                <p className="early-stage">{project.stage}</p>
                                {project.href ? (
                                    <Link href={project.href} className="early-link">Project page</Link>
                                ) : (
                                    <span className="early-link is-muted">No public build yet</span>
                                )}
                            </li>
                        ))}
                    </ul>
                </details>
            </section>
        </main>
    );
}
