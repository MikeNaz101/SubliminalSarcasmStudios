import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom'; // Using React Router for navigation
import './Navbar.css'; // Assume your nav styles are moved here

const Navbar = () => {
    // Refs replace document.getElementById
    const eyeRef = useRef(null);
    const irisRef = useRef(null);
    const pupilRef = useRef(null);

    useEffect(() => {
        const handleMouseMove = (e) => {
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

        // Attach listener on mount, clean up on unmount
        window.addEventListener('mousemove', handleMouseMove);
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
                    {/* Repeated 4 times just like your original HTML */}
                    {[...Array(4)].map((_, i) => (
                        <span key={i} className="scrolling-text">
                            <span className="fancy-cap">S</span>UBLIMINAL
                            <span className="fancy-cap">S</span>ARCASM
                            <span className="fancy-cap">S</span>TUDIOS
                        </span>
                    ))}
                </div>
            </div>

            <div className="nav-links">
                <Link to="/games">Games</Link>
                <Link to="/about">About</Link>
                <Link to="/careers">Careers</Link>
                <Link to="/donner-party" className="cta-button">Play Demo</Link>
            </div>
        </nav>
    );
};

export default Navbar;