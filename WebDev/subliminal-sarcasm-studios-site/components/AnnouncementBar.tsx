"use client";

import { useEffect, useRef, useState } from 'react';
import { announcement, ANNOUNCEMENT_DISMISSED_KEY } from '../lib/announcement';
import './AnnouncementBar.css';

// The strip at the very top of the site header. Its height feeds --announce-h, which the header
// spacer adds to its own height. It folds away once the header goes compact, and a visitor can
// close it for good (until the announcement's id changes). app/layout.tsx hides it before the
// page paints for anyone who already closed it, so it never flashes.

const todayInNewYork = () =>
    new Intl.DateTimeFormat('en-CA', { timeZone: 'America/New_York' }).format(new Date());

export default function AnnouncementBar() {
    const [closed, setClosed] = useState(false);
    const [showUpcoming, setShowUpcoming] = useState(true);
    const innerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        try {
            if (localStorage.getItem(ANNOUNCEMENT_DISMISSED_KEY) === announcement.id) setClosed(true);
        } catch {
            // Storage blocked: just show the bar.
        }
        if (announcement.upcoming && todayInNewYork() >= announcement.upcoming.until) setShowUpcoming(false);
    }, []);

    // Keep --announce-h equal to the bar's real height, which changes when the text wraps.
    useEffect(() => {
        const inner = innerRef.current;
        const root = document.documentElement;
        if (closed || !inner) return;
        const update = () => root.style.setProperty('--announce-h', `${Math.ceil(inner.getBoundingClientRect().height)}px`);
        update();
        const observer = new ResizeObserver(update);
        observer.observe(inner);
        return () => {
            observer.disconnect();
            root.style.removeProperty('--announce-h');
        };
    }, [closed, showUpcoming]);

    if (!announcement.enabled || closed) return null;

    const close = () => {
        try {
            localStorage.setItem(ANNOUNCEMENT_DISMISSED_KEY, announcement.id);
        } catch {
            // Storage blocked: it closes for this page view only.
        }
        document.documentElement.classList.add('announce-off');
        setClosed(true);
    };

    const { label, headline, shortHeadline, link, upcoming } = announcement;

    return (
        <div className="announce" role="region" aria-label="Announcement">
            <div className="announce-inner wrap" ref={innerRef}>
                <p className="announce-text">
                    <span className="announce-main">
                        <span className="announce-label">{label}</span>
                        <span className="announce-headline">
                            <span className="announce-long">{headline}</span>
                            <span className="announce-short">{shortHeadline}</span>
                        </span>
                        <a href={link.href} className="announce-link" target="_blank" rel="noreferrer">
                            <span className="announce-long">{link.label}</span>
                            <span className="announce-short">{link.shortLabel}</span>
                            <span aria-hidden="true"> →</span>
                        </a>
                    </span>
                    {upcoming && showUpcoming && <span className="announce-upcoming">{upcoming.text}</span>}
                </p>
                <button type="button" className="announce-close" onClick={close} aria-label="Close announcement">
                    <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
                        <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                </button>
            </div>
        </div>
    );
}
