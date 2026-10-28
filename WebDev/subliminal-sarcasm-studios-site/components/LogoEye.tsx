"use client";

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import './LogoEye.css';

// The chameleon's gold eye is cut out of the logo and laid back over it,
// so it can turn to follow the visitor's pointer. Positions are measured
// from the October 2026 logo pack (stacked logo on black, and SSS-icon.svg).
const VARIANTS = {
    icon: {
        src: '/images/brand/icon.png',
        eyeSrc: '/images/brand/icon-eye.png',
        width: 160,
        height: 160,
        eye: { left: 24.414, top: 28.125, size: 22.266 },
    },
    full: {
        src: '/images/brand/logo-stacked.png',
        eyeSrc: '/images/brand/logo-eye.png',
        width: 1200,
        height: 872,
        eye: { left: 57.617, top: 22.834, size: 11.133 },
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
    variant = 'icon',
    alt = 'Subliminal Sarcasm Studios',
    className = '',
    sizes = '200px',
    eager = false,
}: Props) {
    const eyeRef = useRef<HTMLSpanElement>(null);
    const v = VARIANTS[variant];

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
        <span className={`logo-eye logo-eye-${variant} ${className}`}>
            <Image
                src={v.src}
                alt={alt}
                width={v.width}
                height={v.height}
                sizes={sizes}
                loading={eager ? 'eager' : 'lazy'}
                className="logo-eye-base"
            />
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
