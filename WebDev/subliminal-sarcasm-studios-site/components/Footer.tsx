import Link from 'next/link';
import Image from 'next/image';
import { featuredGames } from '../lib/games';
import './Footer.css';

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="site-footer">
            <div className="wrap site-footer-grid">
                <div className="site-footer-brand">
                    <Image src="/images/logo-full.png" alt="Subliminal Sarcasm Studios" width={1000} height={723} sizes="180px" />
                    <p>Developing the unseen.</p>
                </div>

                <nav aria-label="Games" className="site-footer-col">
                    <h2>Games</h2>
                    <ul>
                        {featuredGames.map((game) => (
                            <li key={game.slug}>
                                <Link href={game.href}>{game.title}</Link>
                            </li>
                        ))}
                        <li><Link href="/#in-development">Early projects</Link></li>
                    </ul>
                </nav>

                <nav aria-label="Studio" className="site-footer-col">
                    <h2>Studio</h2>
                    <ul>
                        <li><Link href="/about">About us</Link></li>
                        <li><Link href="/about#name">Why the name</Link></li>
                    </ul>
                </nav>
            </div>

            <div className="wrap site-footer-legal">
                <p>&copy; {year} Subliminal Sarcasm Studios, LLC. All rights reserved.</p>
            </div>
        </footer>
    );
}
