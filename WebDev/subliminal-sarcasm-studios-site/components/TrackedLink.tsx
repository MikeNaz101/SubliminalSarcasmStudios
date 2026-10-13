"use client";

import type { ReactNode } from 'react';
import { track } from './PageView';

/** A plain link that also records a "play" event for the given game. */
export default function TrackedLink({
    href,
    gameName,
    className,
    external = false,
    children,
}: {
    href: string;
    gameName: string;
    className?: string;
    external?: boolean;
    children: ReactNode;
}) {
    return (
        <a
            href={href}
            className={className}
            onClick={() => track(gameName, 'play')}
            {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
        >
            {children}
        </a>
    );
}
