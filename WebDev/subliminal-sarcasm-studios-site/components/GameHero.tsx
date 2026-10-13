import Image from 'next/image';
import type { ReactNode } from 'react';
import type { Shot } from '../lib/games';

type Fact = { label: string; value: ReactNode };

type Props = {
    title: string;
    tagline: ReactNode;
    image?: Shot;
    facts: Fact[];
    actions?: ReactNode;
    titleClassName?: string;
};

/** Top of every game page: the key screenshot, the title and the quick facts. */
export default function GameHero({ title, tagline, image, facts, actions, titleClassName = '' }: Props) {
    return (
        <>
            <header className={`game-hero${image ? ' has-image' : ''}`}>
                {image && (
                    <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="100vw"
                        loading="eager"
                        fetchPriority="high"
                        unoptimized={image.src.endsWith('.svg')}
                        className="game-hero-img"
                    />
                )}
                <div className="game-hero-scrim" aria-hidden="true" />
                <div className="game-hero-content wrap">
                    <h1 className={`game-title ${titleClassName}`}>{title}</h1>
                    <p className="game-tagline">{tagline}</p>
                    {actions && <div className="btn-row">{actions}</div>}
                </div>
            </header>

            <div className="stats-bar">
                <dl className="wrap stats-list">
                    {facts.map((fact) => (
                        <div className="stat-item" key={fact.label}>
                            <dt className="stat-label">{fact.label}</dt>
                            <dd className="stat-value">{fact.value}</dd>
                        </div>
                    ))}
                </dl>
            </div>
        </>
    );
}
