"use client";

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import './Navbar.css';

export default function Navbar() {
    // These replace your document.getElementById calls
    const eyeRef = useRef<HTMLDivElement>(null);
    const irisRef = useRef<HTMLDivElement>(null);
    const pupilRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!eyeRef.current || !irisRef.current || !pupilRef.current) return;

            const eyeRect = eyeRef.current.getBoundingClientRect();
            const eyeCenterX = eyeRect.left + eyeRect.width / 2;
            const eyeCenterY = eyeRect.top + eyeRect.height / 2;

            const mouseX = e.clientX;
            const mouseY = e.clientY;

            const angleRad = Math.atan2(mouseY - eyeCenterY, mouseX - eyeCenterX);

            const maxDistancePupil = 2.5;
            const maxDistanceIris = 1.5;

            const translateXPupil = Math.cos(angleRad) * maxDistancePupil;
            const translateYPupil = Math.sin(angleRad) * maxDistancePupil;
            const translateXIris = Math.cos(angleRad) * maxDistanceIris;
            const translateYIris = Math.sin(angleRad) * maxDistanceIris;

            pupilRef.current.style.transform = `translate(-50%, -50%) translate(${translateXPupil}px, ${translateYPupil}px)`;
            irisRef.current.style.transform = `translate(-50%, -50%) translate(${translateXIris}px, ${translateYIris}px)`;
        };

        window.addEventListener('mousemove', handleMouseMove);

        // This cleanup function runs when the component unmounts
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <nav>
            <div className="nav-brand">
                <div className="logo-container">
                    <img src="/images/subliminal-sarcasm-logo.png" alt="Subliminal Sarcasm Studios" className="logo-img" />
                    <div className="logo-eye-socket" ref={eyeRef}>
                        <div className="iris-small" ref={irisRef}></div>
                        <div className="pupil-small" ref={pupilRef}></div>
                    </div>
                </div>
            </div>

            <div className="scrolling-container">
                <div className="scrolling-wrapper">
                    {/* A quick trick to render 4 spans without copy/pasting */}
                    {[...Array(4)].map((_, i) => (
                        <span key={i} className="scrolling-text">
                            <span className="fancy-cap" style={{ fontFamily: 'var(--font-cinzel)' }}>S</span>UBLIMINAL
                            <span className="fancy-cap" style={{ fontFamily: 'var(--font-cinzel)' }}>S</span>ARCASM
                            <span className="fancy-cap" style={{ fontFamily: 'var(--font-cinzel)' }}>S</span>TUDIOS
                        </span>
                    ))}
                </div>
            </div>

            <div className="nav-links">
                <Link href="/">Games</Link>
                <Link href="/about">About</Link>
                <Link href="/donner-party" className="cta-button">Play Demo</Link>
            </div>
        </nav>
    );
}