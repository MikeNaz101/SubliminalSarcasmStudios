"use client";

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import type { Shot } from '../lib/games';
import './Gallery.css';

/** Screenshot grid with a keyboard-friendly lightbox. */
export default function Gallery({ shots, title }: { shots: Shot[]; title: string }) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [index, setIndex] = useState(0);

    const open = (i: number) => {
        setIndex(i);
        dialogRef.current?.showModal();
    };

    const step = useCallback(
        (delta: number) => setIndex((i) => (i + delta + shots.length) % shots.length),
        [shots.length],
    );

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight') step(1);
            if (e.key === 'ArrowLeft') step(-1);
        };
        dialog.addEventListener('keydown', onKey);
        return () => dialog.removeEventListener('keydown', onKey);
    }, [step]);

    const current = shots[index];
    const hasPortrait = shots.some((s) => s.height > s.width);
    const landscapeCount = shots.filter((s) => s.width >= s.height).length;
    const layout = hasPortrait ? 'has-portrait' : shots.length % 2 === 1 ? 'is-odd' : '';

    return (
        <>
            <ul className={`gallery-grid ${layout}`}>
                {shots.map((shot, i) => (
                    <li
                        key={shot.src}
                        className={shot.height > shot.width ? 'is-portrait' : undefined}
                        style={hasPortrait && shot.height > shot.width ? { gridRow: `1 / span ${Math.max(1, landscapeCount)}` } : undefined}
                    >
                        <button type="button" className="gallery-item" onClick={() => open(i)}>
                            <Image src={shot.src} alt={shot.alt} width={shot.width} height={shot.height} sizes="(max-width: 720px) 100vw, 540px" />
                            <span className="sr-only">Open larger</span>
                        </button>
                    </li>
                ))}
            </ul>

            <dialog
                ref={dialogRef}
                className="lightbox"
                aria-label={`${title} screenshots`}
                onClick={(e) => { if (e.target === e.currentTarget) dialogRef.current?.close(); }}
            >
                {current && (
                    <figure className="lightbox-figure">
                        <Image
                            key={current.src}
                            src={current.src}
                            alt={current.alt}
                            width={current.width}
                            height={current.height}
                            sizes="90vw"
                            className="lightbox-img"
                        />
                        <figcaption>
                            <span>{current.alt}</span>
                            <span className="lightbox-count">{index + 1} of {shots.length}</span>
                        </figcaption>
                    </figure>
                )}
                <div className="lightbox-controls">
                    {shots.length > 1 && (
                        <>
                            <button type="button" className="btn btn-ghost" onClick={() => step(-1)}>Previous</button>
                            <button type="button" className="btn btn-ghost" onClick={() => step(1)}>Next</button>
                        </>
                    )}
                    <button type="button" className="btn btn-primary" onClick={() => dialogRef.current?.close()}>Close</button>
                </div>
            </dialog>
        </>
    );
}
