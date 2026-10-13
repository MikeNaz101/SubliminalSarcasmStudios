"use client";

import { useEffect } from 'react';

export const TRACKING_URL = 'https://subliminal-backend.onrender.com/track';

export function track(gameName: string, type: 'view' | 'play') {
    fetch(TRACKING_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gameName, type }),
    }).catch((err) => console.log('Tracking Error:', err));
}

/** Records one page view with the studio's analytics backend. */
export default function PageView({ name }: { name: string }) {
    useEffect(() => {
        track(name, 'view');
    }, [name]);

    return null;
}
