"use client";

import { useEffect, useRef, type CSSProperties } from 'react';
import Image from 'next/image';
import './LogoEye.css';

type Point = readonly [number, number];

// Lower jaw of the header chameleon, as % of the logo box. The top edge runs along the
// middle of the mouth line from the hinge (first point) to the tip of the snout.
const JAW_TOP: Point[] = [
    [67.31, 45.19], [70.10, 44.45], [72.12, 43.86], [74.15, 43.50], [76.18, 43.28], [78.21, 43.06],
    [80.23, 43.06], [82.26, 42.98], [84.29, 42.98], [86.32, 42.91], [88.34, 42.76], [90.37, 42.54],
    [92.40, 42.03], [93.66, 41.51], [94.32, 41.73],
];
const JAW_REST: Point[] = [
    [94.27, 42.25], [94.12, 43.13], [93.92, 44.01], [93.61, 44.89], [93.26, 45.33], [92.85, 45.78],
    [92.40, 46.73], [90.37, 46.88], [88.34, 46.88], [86.32, 46.58], [84.29, 46.80], [82.26, 47.17],
    [80.23, 47.83], [77.19, 48.42], [74.15, 48.57], [71.11, 48.13], [68.83, 46.95], [67.56, 45.78],
];
// The jaw's top edge once it has swung open by JAW_ANGLE degrees (front to back).
const JAW_TOP_OPEN: Point[] = [
    [93.74, 54.00], [93.15, 53.49], [91.85, 53.42], [89.81, 53.00], [87.83, 52.30], [85.88, 51.54],
    [83.93, 50.69], [82.00, 49.78], [80.05, 48.95], [78.13, 48.05], [76.15, 47.35], [74.18, 46.65],
    [72.17, 46.08], [70.12, 45.74], [67.31, 45.19],
];
const JAW_ANGLE = 18;

const polygon = (points: Point[]) => `polygon(${points.map(([x, y]) => `${x}% ${y}%`).join(', ')})`;

const HEADER_MOUTH = {
    jaw: polygon([...JAW_TOP, ...JAW_REST]),
    // The dark inside of the mouth: zero-height when closed, the full gap when open.
    // Both shapes have the same points so the browser can animate between them.
    gapClosed: polygon([...JAW_TOP, JAW_TOP[JAW_TOP.length - 1], ...[...JAW_TOP].reverse()]),
    gapOpen: polygon([...JAW_TOP, [95.2, 41.9], ...JAW_TOP_OPEN]),
    pivot: JAW_TOP[0],
    angle: JAW_ANGLE,
    // Where the tongue leaves the mouth.
    tongue: [91.5, 47.5] as Point,
};

// The chameleon's gold eye is cut out of the logo and laid back over it,
// so it can turn to follow the visitor's pointer. Positions are measured
// from the October 2026 logo pack.
const VARIANTS = {
    // Stacked logo, white text on a transparent background (site header).
    header: {
        src: '/images/brand/logo-header.png',
        eyeSrc: '/images/brand/logo-header-eye.png',
        width: 600,
        height: 414,
        eye: { left: 58.642, top: 17.561, size: 12.57 },
        mouth: HEADER_MOUTH,
    },
    // Stacked logo on its black plate (studio band, About page).
    full: {
        src: '/images/brand/logo-stacked.png',
        eyeSrc: '/images/brand/logo-eye.png',
        width: 1200,
        height: 872,
        eye: { left: 57.617, top: 22.834, size: 11.133 },
        mouth: null,
    },
} as const;

type Props = {
    variant?: keyof typeof VARIANTS;
    alt?: string;
    className?: string;
    sizes?: string;
    eager?: boolean;
};

export default function LogoEye({
    variant = 'full',
    alt = 'Subliminal Sarcasm Studios',
    className = '',
    sizes = '200px',
    eager = false,
}: Props) {
    const eyeRef = useRef<HTMLSpanElement>(null);
    const v = VARIANTS[variant];
    const mouth = v.mouth;

    useEffect(() => {
        const eye = eyeRef.current;
        if (!eye) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        let frame = 0;
        const onMove = (e: PointerEvent) => {
            cancelAnimationFrame(frame);
            frame = requestAnimationFrame(() => {
                const r = eye.getBoundingClientRect();
                const dx = e.clientX - (r.left + r.width / 2);
                const dy = e.clientY - (r.top + r.height / 2);
                const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
                const reach = Math.min(1, Math.hypot(dx, dy) / 400);
                // Stays inside the eye's black ring so the gold underneath never peeks out.
                const shift = r.width * 0.04 * reach;
                const tx = Math.cos((angle * Math.PI) / 180) * shift;
                const ty = Math.sin((angle * Math.PI) / 180) * shift;
                eye.style.transform = `translate(${tx}px, ${ty}px) rotate(${angle + 90}deg)`;
            });
        };

        window.addEventListener('pointermove', onMove, { passive: true });
        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener('pointermove', onMove);
        };
    }, []);

    return (
        <span
            className={`logo-eye logo-eye-${variant} ${className}`}
            data-tongue-origin={mouth ? mouth.tongue.join(',') : undefined}
        >
            <Image
                src={v.src}
                alt={alt}
                width={v.width}
                height={v.height}
                sizes={sizes}
                loading={eager ? 'eager' : 'lazy'}
                className="logo-eye-base"
            />
            {mouth && (
                <>
                    <span
                        className="logo-mouth"
                        aria-hidden="true"
                        style={{ '--gap-closed': mouth.gapClosed, '--gap-open': mouth.gapOpen } as CSSProperties}
                    />
                    <span
                        className="logo-jaw"
                        aria-hidden="true"
                        style={{
                            clipPath: mouth.jaw,
                            transformOrigin: `${mouth.pivot[0]}% ${mouth.pivot[1]}%`,
                            '--jaw-open': `${mouth.angle}deg`,
                        } as CSSProperties}
                    >
                        <Image
                            src={v.src}
                            alt=""
                            width={v.width}
                            height={v.height}
                            sizes={sizes}
                            loading={eager ? 'eager' : 'lazy'}
                            className="logo-eye-base"
                        />
                    </span>
                </>
            )}
            <span
                ref={eyeRef}
                className="logo-eye-iris"
                aria-hidden="true"
                style={{
                    left: `${v.eye.left}%`,
                    top: `${v.eye.top}%`,
                    width: `${v.eye.size}%`,
                    backgroundImage: `url(${v.eyeSrc})`,
                }}
            />
        </span>
    );
}
