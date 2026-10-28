"use client";

import { useEffect, useState } from 'react';
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
    // The full logo sits large at the top of the page and tucks down once you scroll.
    const [compact, setCompact] = useState(false);

    useEffect(() => {
        let frame = 0;
        const update = () => {
            cancelAnimationFrame(frame);
            frame = requestAnimationFrame(() => setCompact(window.scrollY > 24));
        };
        update();
        window.addEventListener('scroll', update, { passive: true });
        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener('scroll', update);
        };
    }, []);

    return (
        <>
            <header className={`site-header${compact ? ' is-compact' : ''}`}>
                <nav className="site-nav wrap" aria-label="Main">
                    <Link href="/" className="site-brand" aria-label="Subliminal Sarcasm Studios, home">
                        <LogoEye variant="header" alt="" sizes="(max-width: 560px) 120px, 170px" eager className="site-brand-logo" />
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
            {/* Holds the header's full height so the page doesn't jump when it shrinks. */}
            <div className="site-header-spacer" aria-hidden="true" />
        </>
    );
}
