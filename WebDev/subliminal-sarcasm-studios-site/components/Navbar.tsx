"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import LogoEye from './LogoEye';
import './Navbar.css';

const links = [
    { href: '/#games', label: 'Games' },
    { href: '/about', label: 'Studio' },
];

export default function Navbar() {
    const pathname = usePathname();

    return (
        <header className="site-header">
            <nav className="site-nav wrap" aria-label="Main">
                <Link href="/" className="site-brand" aria-label="Subliminal Sarcasm Studios, home">
                    <LogoEye variant="icon" alt="" sizes="44px" eager className="site-brand-mark" />
                    <span className="site-brand-name">
                        Subliminal Sarcasm<span className="site-brand-suffix"> Studios</span>
                    </span>
                </Link>

                <ul className="site-links">
                    {links.map((link) => (
                        <li key={link.href}>
                            <Link
                                href={link.href}
                                aria-current={pathname === link.href ? 'page' : undefined}
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                    <li className="site-links-cta">
                        <Link href="/void-runner#play" className="btn btn-primary">
                            Play Void Runner
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
