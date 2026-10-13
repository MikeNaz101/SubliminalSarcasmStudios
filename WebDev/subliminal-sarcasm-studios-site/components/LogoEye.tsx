"use client";

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import './LogoEye.css';

// The chameleon's gold eye is cut out of the logo and laid back over it,
// so it can turn to follow the visitor's pointer. Positions are measured
// from the source artwork (subliminal-sarcasm-logo1.png).
const VARIANTS = {
    mark: {
        src: '/images/logo-mark.png',
        width: 400,
        height: 195,
        eye: { left: 58.549, top: 25.745, size: 12.124 },
    },
    full: {
        src: '/images/logo-full.png',
        width: 1000,
        height: 723,
        eye: { left: 57.949, top: 17.163, size: 12.0 },
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
    variant = 'mark',
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
                const shift = r.width * 0.05 * reach;
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
                    backgroundImage: 'url(/images/logo-eye.png)',
                }}
            />
        </span>
    );
}
