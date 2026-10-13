"use client";

import { useRef, useState, type CSSProperties, type KeyboardEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import AccentSync from './AccentSync';
import type { FeaturedGame } from '../lib/games';
import './GameShowcase.css';

export default function GameShowcase({ games }: { games: FeaturedGame[] }) {
    const [active, setActive] = useState(0);
    const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
    const game = games[active];

    const select = (index: number) => {
        const next = (index + games.length) % games.length;
        setActive(next);
        tabRefs.current[next]?.focus();
    };

    const onTabKey = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
        if (e.key === 'ArrowRight') { e.preventDefault(); select(index + 1); }
        if (e.key === 'ArrowLeft') { e.preventDefault(); select(index - 1); }
        if (e.key === 'Home') { e.preventDefault(); select(0); }
        if (e.key === 'End') { e.preventDefault(); select(games.length - 1); }
    };

    return (
        <section className="showcase" aria-label="Featured games">
            <AccentSync accent={game.accent} onAccent={game.onAccent} />

            <div className="showcase-stage">
                {games.map((g, i) => {
                    const shot = g.shots[0];
                    return (
                        <Image
                            key={g.slug}
                            src={shot.src}
                            alt={i === active ? shot.alt : ''}
                            aria-hidden={i === active ? undefined : true}
                            fill
                            sizes="100vw"
                            unoptimized={shot.src.endsWith('.svg')}
                            loading={i === 0 ? 'eager' : 'lazy'}
                            fetchPriority={i === 0 ? 'high' : 'auto'}
                            className={`showcase-img${i === active ? ' is-active' : ''}`}
                        />
                    );
                })}
                <div className="showcase-scrim" aria-hidden="true" />

                <div
                    className="showcase-copy wrap"
                    id="showcase-panel"
                    role="tabpanel"
                    aria-labelledby={`showcase-tab-${game.slug}`}
                >
                    <div key={game.slug} className="showcase-copy-inner">
                        <h2 className="showcase-title">{game.title}</h2>
                        <p className="showcase-tagline">{game.tagline}</p>
                        {game.awaitingScreens && (
                            <p className="showcase-note">In-headset footage is on its way.</p>
                        )}
                        <div className="btn-row">
                            {game.play && (game.play.external ? (
                                <a href={game.play.href} className="btn btn-primary" target="_blank" rel="noreferrer">
                                    {game.play.label}
                                </a>
                            ) : (
                                <Link href={game.play.href} className="btn btn-primary">{game.play.label}</Link>
                            ))}
                            <Link href={game.href} className={game.play ? 'btn btn-ghost' : 'btn btn-primary'}>
                                About the game
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="wrap">
                <div className="showcase-tabs" role="tablist" aria-label="Choose a game">
                    {games.map((g, i) => (
                        <button
                            key={g.slug}
                            ref={(el) => { tabRefs.current[i] = el; }}
                            id={`showcase-tab-${g.slug}`}
                            type="button"
                            role="tab"
                            aria-selected={i === active}
                            aria-controls="showcase-panel"
                            tabIndex={i === active ? 0 : -1}
                            className="showcase-tab"
                            style={{ '--tab-accent': g.accent } as CSSProperties}
                            onClick={() => setActive(i)}
                            onKeyDown={(e) => onTabKey(e, i)}
                        >
                            <span className="showcase-tab-thumb">
                                <Image
                                    src={g.shots[0].src}
                                    alt=""
                                    fill
                                    sizes="(max-width: 720px) 60vw, 300px"
                                    unoptimized={g.shots[0].src.endsWith('.svg')}
                                />
                            </span>
                            <span className="showcase-tab-title">{g.title}</span>
                            <span className="showcase-tab-status">{g.status}</span>
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
}
