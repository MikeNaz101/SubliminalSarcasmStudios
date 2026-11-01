"use client";

import { useEffect } from 'react';
import './ChameleonTongue.css';

// When a visitor clicks a link or button, the chameleon in the header opens its mouth
// and flicks its tongue to the spot they clicked. The click goes through the moment the
// tongue lands, then the tongue snaps back.
//
// Skipped for keyboard presses, modified clicks (new tab, etc.), clicks inside dialogs,
// and visitors who prefer reduced motion: those clicks go through straight away.

const INTERACTIVE =
    'a[href], button, summary, [role="button"], [role="tab"], input[type="submit"], input[type="button"]';
const SKIP = 'dialog[open], [aria-modal="true"], [data-no-tongue]';

const MOUTH_LEAD_MS = 50; // jaw drops before the tongue leaves
const EXTEND_MS = 110;
const HOLD_MS = 40;
const RETRACT_MS = 120;

const SVG_NS = 'http://www.w3.org/2000/svg';

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const easeIn = (t: number) => t * t * t;

export default function ChameleonTongue() {
    useEffect(() => {
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

        const layer = document.createElementNS(SVG_NS, 'svg');
        layer.setAttribute('class', 'tongue-layer');
        layer.setAttribute('aria-hidden', 'true');
        const outline = document.createElementNS(SVG_NS, 'path');
        outline.setAttribute('class', 'tongue-outline');
        const body = document.createElementNS(SVG_NS, 'path');
        body.setAttribute('class', 'tongue-body');
        const tip = document.createElementNS(SVG_NS, 'circle');
        tip.setAttribute('class', 'tongue-tip');
        layer.append(outline, body, tip);
        document.body.appendChild(layer);

        let busy = false;
        let replaying = false;
        let frame = 0;

        const mouthPoint = (logo: HTMLElement) => {
            const r = logo.getBoundingClientRect();
            const [ox, oy] = (logo.dataset.tongueOrigin ?? '91.5,47.5').split(',').map(Number);
            return { x: r.left + (r.width * ox) / 100, y: r.top + (r.height * oy) / 100, size: r.width };
        };

        const strike = (logo: HTMLElement, tx: number, ty: number, onContact: () => void) => {
            busy = true;
            let contacted = false;
            let finished = false;
            const contact = () => {
                if (contacted) return;
                contacted = true;
                onContact();
            };
            const finish = () => {
                if (finished) return;
                finished = true;
                cancelAnimationFrame(frame);
                layer.classList.remove('is-active');
                delete logo.dataset.mouth;
                busy = false;
            };

            logo.dataset.mouth = 'open';
            const start = performance.now() + MOUTH_LEAD_MS;

            const draw = () => {
                const t = performance.now() - start;
                let p: number;
                if (t < 0) p = 0;
                else if (t < EXTEND_MS) p = easeOut(t / EXTEND_MS);
                else if (t < EXTEND_MS + HOLD_MS) p = 1;
                else if (t < EXTEND_MS + HOLD_MS + RETRACT_MS) p = 1 - easeIn((t - EXTEND_MS - HOLD_MS) / RETRACT_MS);
                else {
                    contact();
                    finish();
                    return;
                }
                if (t >= EXTEND_MS) contact();

                // Re-measure every frame: the header can shrink or move while the tongue is out.
                const m = mouthPoint(logo);
                const width = Math.max(3.5, m.size * 0.04);
                const x = m.x + (tx - m.x) * p;
                const y = m.y + (ty - m.y) * p;
                const d = `M${m.x.toFixed(1)} ${m.y.toFixed(1)}L${x.toFixed(1)} ${y.toFixed(1)}`;
                body.setAttribute('d', d);
                body.setAttribute('stroke-width', width.toFixed(2));
                outline.setAttribute('d', d);
                outline.setAttribute('stroke-width', (width + 2).toFixed(2));
                tip.setAttribute('cx', x.toFixed(1));
                tip.setAttribute('cy', y.toFixed(1));
                tip.setAttribute('r', (p > 0.02 ? width * 1.5 : 0).toFixed(2));
                layer.classList.add('is-active');
                frame = requestAnimationFrame(draw);
            };
            frame = requestAnimationFrame(draw);

            // If the tab is hidden mid-strike, animation frames pause; make sure the click still lands.
            window.setTimeout(contact, MOUTH_LEAD_MS + EXTEND_MS + 80);
            window.setTimeout(finish, MOUTH_LEAD_MS + EXTEND_MS + HOLD_MS + RETRACT_MS + 400);
        };

        const onClick = (e: MouseEvent) => {
            if (replaying || !e.isTrusted || e.defaultPrevented) return;
            if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
            if (e.detail === 0) return; // keyboard activation
            if (reducedMotion.matches) return;

            const target = (e.target instanceof Element ? e.target : null)?.closest<HTMLElement>(INTERACTIVE);
            if (!target || target.closest(SKIP)) return;
            if ((target as HTMLButtonElement).disabled || target.getAttribute('aria-disabled') === 'true') return;

            const logo = document.querySelector<HTMLElement>('.site-brand-logo[data-tongue-origin]');
            if (!logo) return;

            // Links that open a new tab go straight through (browsers may block a delayed new tab);
            // the tongue still flicks for show.
            const opensElsewhere =
                target instanceof HTMLAnchorElement && !!target.target && target.target !== '_self';

            if (busy) {
                // One catch at a time: the first click is about to land.
                if (!opensElsewhere) {
                    e.preventDefault();
                    e.stopImmediatePropagation();
                }
                return;
            }

            if (!opensElsewhere) {
                e.preventDefault();
                e.stopImmediatePropagation();
            }

            strike(logo, e.clientX, e.clientY, () => {
                if (opensElsewhere || !target.isConnected) return;
                replaying = true;
                try {
                    target.click();
                } finally {
                    replaying = false;
                }
            });
        };

        window.addEventListener('click', onClick, true);
        return () => {
            window.removeEventListener('click', onClick, true);
            cancelAnimationFrame(frame);
            layer.remove();
        };
    }, []);

    return null;
}
