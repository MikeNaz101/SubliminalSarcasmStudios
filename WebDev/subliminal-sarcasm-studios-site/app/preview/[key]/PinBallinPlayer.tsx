"use client";

import { useCallback, useEffect, useRef, useState } from 'react';
import { track } from '../../../components/PageView';
import PinBallinArt from './PinBallinArt';

type Phase = 'idle' | 'loading' | 'playing';

/**
 * The game frame. Nothing downloads until the player presses Play, so just opening the page
 * is quick. After that the build's own loading bar (from the SSS Embed WebGL template) takes over.
 */
export default function PinBallinPlayer({ src }: { src?: string }) {
    const frameRef = useRef<HTMLDivElement>(null);
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const [phase, setPhase] = useState<Phase>('idle');
    const [canFullscreen, setCanFullscreen] = useState(false);

    useEffect(() => {
        // iPhone Safari has no fullscreen for anything but video; there we open the game in its own tab.
        setCanFullscreen(!!document.fullscreenEnabled);
    }, []);

    const start = useCallback(() => {
        if (!src) return;
        track('Pin Ballin', 'play');
        setPhase('loading');
        // On a phone, bring the whole frame into view so the table fills the screen.
        frameRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, [src]);

    const fullscreen = useCallback(() => {
        const el = frameRef.current;
        if (el && document.fullscreenEnabled) {
            el.requestFullscreen().catch(() => window.open(src, '_blank', 'noopener'));
        } else if (src) {
            window.open(src, '_blank', 'noopener');
        }
        iframeRef.current?.focus();
    }, [src]);

    return (
        <>
            <div ref={frameRef} className={`play-frame pb-frame is-${phase}`}>
                {phase !== 'idle' && src && (
                    <iframe
                        ref={iframeRef}
                        src={src}
                        title="Pin Ballin, playable WebGL build"
                        allow="autoplay; fullscreen; gamepad"
                        allowFullScreen
                        onLoad={() => {
                            setPhase('playing');
                            iframeRef.current?.focus();
                        }}
                    />
                )}

                {phase !== 'playing' && (
                    <div className="pb-poster">
                        <PinBallinArt className="pb-poster-art" centered />
                        <div className="pb-poster-content">
                            {!src ? (
                                <p className="pb-poster-note">The build isn&apos;t uploaded yet. Check back soon.</p>
                            ) : phase === 'idle' ? (
                                <>
                                    <button type="button" className="pb-play-btn" onClick={start} data-no-tongue>
                                        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l10.5-6.5z" fill="currentColor" /></svg>
                                        <span>Play</span>
                                    </button>
                                    <p className="pb-poster-note">Runs right in your browser. Best with sound on.</p>
                                </>
                            ) : (
                                <p className="pb-poster-note" role="status">
                                    <span className="pb-spinner" aria-hidden="true" /> Loading the tower…
                                </p>
                            )}
                        </div>
                    </div>
                )}
            </div>

            <div className="play-controls pb-bar">
                <span className="pb-hint-desktop">Click the game first so it gets your keyboard.</span>
                <span className="pb-hint-touch">Hold your phone upright and tap the table to start.</span>
                <span className="pb-bar-actions">
                    {phase === 'playing' && (
                        <button type="button" className="btn btn-ghost pb-small-btn" onClick={fullscreen} data-no-tongue>
                            {canFullscreen ? 'Full screen' : 'Open full screen'}
                        </button>
                    )}
                    {src && (
                        <a href={src} target="_blank" rel="noopener" className="pb-link" data-no-tongue>
                            Open in its own tab
                        </a>
                    )}
                </span>
            </div>
        </>
    );
}
