// Key art for the preview page, drawn in SVG so no image file has to be published:
// a neon tower of pinball tables, each level its own colour, with a heavy ball sending out ripples.

const LEVELS = [
    { y: 760, scale: 1, color: '#4FD2FF' },
    { y: 560, scale: 0.86, color: '#B266FF' },
    { y: 385, scale: 0.74, color: '#FF4FB8' },
    { y: 235, scale: 0.64, color: '#FFC94F' },
    { y: 110, scale: 0.55, color: '#5CFF9D' },
];

const CX = 1130;

function Level({ y, scale, color }: { y: number; scale: number; color: string }) {
    const half = 330 * scale;
    const flip = 150 * scale;
    const gap = 46 * scale;
    const r = 26 * scale;
    return (
        <g stroke={color} fill="none" strokeLinecap="round" filter="url(#pb-glow)">
            {/* side rails and inlane guides */}
            <path d={`M${CX - half} ${y - 150 * scale} L${CX - half} ${y - 40 * scale} L${CX - gap - flip} ${y}`} strokeWidth={4 * scale} strokeOpacity="0.55" />
            <path d={`M${CX + half} ${y - 150 * scale} L${CX + half} ${y - 40 * scale} L${CX + gap + flip} ${y}`} strokeWidth={4 * scale} strokeOpacity="0.55" />
            {/* flippers */}
            <line x1={CX - gap - flip} y1={y} x2={CX - gap} y2={y + 26 * scale} strokeWidth={16 * scale} />
            <line x1={CX + gap + flip} y1={y} x2={CX + gap} y2={y + 26 * scale} strokeWidth={16 * scale} />
            {/* bumpers */}
            <circle cx={CX - 150 * scale} cy={y - 120 * scale} r={r} strokeWidth={5 * scale} fill={color} fillOpacity="0.12" />
            <circle cx={CX + 120 * scale} cy={y - 140 * scale} r={r} strokeWidth={5 * scale} fill={color} fillOpacity="0.12" />
            <circle cx={CX - 10 * scale} cy={y - 175 * scale} r={r * 0.8} strokeWidth={5 * scale} fill={color} fillOpacity="0.12" />
        </g>
    );
}

/** `centered` frames the tower in the middle instead of on the right (for narrow or centred spots). */
export default function PinBallinArt({ className, centered = false }: { className?: string; centered?: boolean }) {
    return (
        <svg className={className} viewBox={centered ? '330 0 1600 900' : '0 0 1600 900'} preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
            <defs>
                <radialGradient id="pb-sky" cx="70%" cy="45%" r="70%">
                    <stop offset="0" stopColor="#1b0f3d" />
                    <stop offset="0.55" stopColor="#0a0620" />
                    <stop offset="1" stopColor="#000" />
                </radialGradient>
                <radialGradient id="pb-ripple" cx="50%" cy="50%" r="50%">
                    <stop offset="0.55" stopColor="#4FD2FF" stopOpacity="0" />
                    <stop offset="0.85" stopColor="#4FD2FF" stopOpacity="0.45" />
                    <stop offset="1" stopColor="#4FD2FF" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="pb-ball" cx="38%" cy="35%" r="65%">
                    <stop offset="0" stopColor="#fff" />
                    <stop offset="0.45" stopColor="#ffd9a8" />
                    <stop offset="1" stopColor="#ff6a1f" />
                </radialGradient>
                <filter id="pb-glow" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="6" result="blur" />
                    <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
                <pattern id="pb-stars" width="140" height="140" patternUnits="userSpaceOnUse">
                    <circle cx="12" cy="20" r="1.2" fill="#fff" fillOpacity="0.5" />
                    <circle cx="90" cy="64" r="0.9" fill="#fff" fillOpacity="0.35" />
                    <circle cx="48" cy="118" r="1" fill="#fff" fillOpacity="0.4" />
                </pattern>
            </defs>

            <rect width="2000" height="900" fill="url(#pb-sky)" />
            <rect width="2000" height="900" fill="url(#pb-stars)" />

            {LEVELS.map((level) => <Level key={level.y} {...level} />)}

            {/* the ball mid-climb, rippling space around it */}
            <g className="pb-art-ripples">
                <circle cx={CX + 40} cy="470" r="150" fill="url(#pb-ripple)" />
                <circle cx={CX + 40} cy="470" r="95" fill="url(#pb-ripple)" opacity="0.7" />
            </g>
            <circle cx={CX + 40} cy="470" r="24" fill="url(#pb-ball)" filter="url(#pb-glow)" />
            <path d={`M${CX + 40} 500 q -6 60 4 120`} stroke="#ff9a4f" strokeOpacity="0.5" strokeWidth="6" strokeLinecap="round" fill="none" />
        </svg>
    );
}
