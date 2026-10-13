"use client";

import { useEffect } from 'react';

// Shifts the site-wide accent (nav, buttons, focus details) to a game's colour,
// the way the studio's chameleon changes colour to match where it is.
export default function AccentSync({ accent, onAccent }: { accent: string; onAccent: string }) {
    useEffect(() => {
        const root = document.documentElement;
        root.style.setProperty('--accent', accent);
        root.style.setProperty('--on-accent', onAccent);
        return () => {
            root.style.removeProperty('--accent');
            root.style.removeProperty('--on-accent');
        };
    }, [accent, onAccent]);

    return null;
}
