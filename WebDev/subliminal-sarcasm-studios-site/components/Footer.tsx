"use client";

import './Footer.css';

export default function Footer() {
    // This automatically grabs the current year!
    const currentYear = new Date().getFullYear();

    return (
        <footer className="global-footer">
            <p>&copy; {currentYear} Subliminal Sarcasm Studios, LLC. All Rights Reserved.</p>
        </footer>
    );
}