"use client";

import { useCallback, useEffect, useRef, useState } from 'react';
import type { CSSProperties, KeyboardEvent, ReactNode } from 'react';
import './Leaderboard.css';
import {
    STORY_LAYERS,
    fetchBoard,
    formatNumber,
    formatRaceTime,
    threatLevel,
    type Board,
    type BoardMode,
    type RaceRow,
    type RunRow,
} from '../lib/voidRunnerLeaderboard';

interface Tab {
    mode: BoardMode;
    label: string;
    short: string;   // the label on narrow screens
    color: string;   // the mode's colour in the game's mode picker
    metric: string;  // what the right-hand column ranks by
    note: string;
    empty: string;
}

const TABS: Tab[] = [
    {
        mode: 'endless',
        label: 'Endless Void',
        short: 'Endless',
        color: '#00FFFF',
        metric: 'Score',
        note: 'Best run per pilot. Scores include the threat level.',
        empty: 'No Endless Void runs yet. Be the first!',
    },
    {
        mode: 'data_mining',
        label: 'Data Mining',
        short: 'Mining',
        color: '#40FFCC',
        metric: 'Score',
        note: 'Streaming Data Mining: best time-attack score per pilot.',
        empty: 'No Data Mining runs yet. Be the first!',
    },
    {
        mode: 'story',
        label: 'Story',
        short: 'Story',
        color: '#FF3DAD',
        metric: 'Layers',
        note: "Ranked by layers of the Arbiter's mind cleared, then by score.",
        empty: 'No Captain has breached a firewall yet.',
    },
    {
        mode: 'race',
        label: 'Online Race',
        short: 'Race',
        color: '#FF8C1A',
        metric: 'Wins',
        note: 'Head-to-head wins, then fastest finish. Practice against the bot does not count.',
        empty: 'No online races recorded yet. Challenge a friend!',
    },
];

type Status = { state: 'loading' } | { state: 'error' } | { state: 'ready'; board: Board };

const COLUMNS = 3;

function runDetail(mode: BoardMode, row: RunRow): string {
    const parts: string[] = [];
    if (mode === 'endless') {
        if (row.waves) parts.push(`${row.waves.toLocaleString('en-US', { maximumFractionDigits: 1 })} waves`);
        if (row.distance) parts.push(`${formatNumber(row.distance)} m`);
    } else if (mode === 'data_mining') {
        if (row.rings) parts.push(`${formatNumber(row.rings)} rings`);
        if (row.distance) parts.push(`${formatNumber(row.distance)} m`);
    } else if (mode === 'story') {
        const layers = row.layers ?? 0;
        if (layers >= STORY_LAYERS.length) parts.push('Story complete');
        else if (layers > 0) parts.push(`Cleared ${STORY_LAYERS[layers - 1]}`);
        parts.push(`${formatNumber(row.score)} pts`);
    }
    const threat = threatLevel(row.difficulty);
    if (threat) parts.push(threat);
    if (row.grade) parts.push(`Grade ${row.grade}`);
    return parts.join(' · ');
}

function raceDetail(row: RaceRow): string {
    const record = `${row.wins}W ${row.losses}L${row.ties ? ` ${row.ties}T` : ''}`;
    return row.best_ms ? `${record} · Best ${formatRaceTime(row.best_ms)}` : record;
}

export default function Leaderboard() {
    const [active, setActive] = useState<BoardMode>('endless');
    const [boards, setBoards] = useState<Partial<Record<BoardMode, Status>>>({});
    const requested = useRef(new Set<BoardMode>());
    const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

    // Each board loads the first time its tab is opened, then stays.
    const load = useCallback((mode: BoardMode) => {
        requested.current.add(mode);
        setBoards((b) => ({ ...b, [mode]: { state: 'loading' } }));
        fetchBoard(mode)
            .then((board) => setBoards((b) => ({ ...b, [mode]: { state: 'ready', board } })))
            .catch((err) => {
                console.error('Error fetching leaderboard:', err);
                setBoards((b) => ({ ...b, [mode]: { state: 'error' } }));
            });
    }, []);

    useEffect(() => {
        if (!requested.current.has(active)) load(active);
    }, [active, load]);

    const select = (index: number, focus: boolean) => {
        setActive(TABS[index].mode);
        const button = tabRefs.current[index];
        if (!button) return;
        if (focus) button.focus();
        button.scrollIntoView({ block: 'nearest', inline: 'nearest' });
    };

    // Arrow keys move between tabs (Home / End jump to the ends).
    const onTabKey = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
        let next = -1;
        if (e.key === 'ArrowRight') next = (index + 1) % TABS.length;
        else if (e.key === 'ArrowLeft') next = (index - 1 + TABS.length) % TABS.length;
        else if (e.key === 'Home') next = 0;
        else if (e.key === 'End') next = TABS.length - 1;
        if (next < 0) return;
        e.preventDefault();
        select(next, true);
    };

    const tab = TABS.find((t) => t.mode === active) ?? TABS[0];
    const status: Status = boards[active] ?? { state: 'loading' };

    let body: ReactNode;
    if (status.state === 'loading') {
        body = <tr><td colSpan={COLUMNS} className="loading-text">Accessing Void Network...</td></tr>;
    } else if (status.state === 'error') {
        body = (
            <tr>
                <td colSpan={COLUMNS} className="error-text">
                    Connection to Void Network severed.{' '}
                    <button type="button" className="leaderboard-retry" onClick={() => load(active)}>Try again</button>
                </td>
            </tr>
        );
    } else if (status.board.rows.length === 0) {
        body = <tr><td colSpan={COLUMNS} className="loading-text">{tab.empty}</td></tr>;
    } else if (status.board.mode === 'race') {
        body = status.board.rows.map((row) => (
            <tr key={`${row.rank}-${row.pilot}`}>
                <td className="rank-col">#{row.rank}</td>
                <td className="name-col">
                    <span className="pilot-name">{row.pilot}</span>
                    <span className="pilot-detail">{raceDetail(row)}</span>
                </td>
                <td className="score-col">{formatNumber(row.wins)}</td>
            </tr>
        ));
    } else {
        const mode = status.board.mode;
        body = status.board.rows.map((row) => (
            <tr key={`${row.rank}-${row.pilot}`}>
                <td className="rank-col">#{row.rank}</td>
                <td className="name-col">
                    <span className="pilot-name">{row.pilot}</span>
                    <span className="pilot-detail">{runDetail(mode, row)}</span>
                </td>
                <td className="score-col">
                    {mode === 'story' ? `${row.layers ?? 0}/${STORY_LAYERS.length}` : formatNumber(row.score)}
                </td>
            </tr>
        ));
    }

    return (
        <div className="leaderboard-container" style={{ '--mode': tab.color } as CSSProperties}>
            <h3 className="leaderboard-title" id="leaderboard-title">Top Pilots</h3>

            <div className="leaderboard-tabs" role="tablist" aria-labelledby="leaderboard-title">
                {TABS.map((t, i) => {
                    const selected = t.mode === active;
                    return (
                        <button
                            key={t.mode}
                            ref={(el: HTMLButtonElement | null) => { tabRefs.current[i] = el; }}
                            type="button"
                            role="tab"
                            id={`leaderboard-tab-${t.mode}`}
                            aria-selected={selected}
                            aria-controls="leaderboard-panel"
                            tabIndex={selected ? 0 : -1}
                            aria-label={t.label}
                            className="leaderboard-tab"
                            style={{ '--tab': t.color } as CSSProperties}
                            onClick={() => select(i, false)}
                            onKeyDown={(e: KeyboardEvent<HTMLButtonElement>) => onTabKey(e, i)}
                        >
                            <span className="tab-long">{t.label}</span>
                            <span className="tab-short">{t.short}</span>
                        </button>
                    );
                })}
            </div>

            <div id="leaderboard-panel" role="tabpanel" aria-labelledby={`leaderboard-tab-${tab.mode}`}>
                <p className="leaderboard-note">{tab.note}</p>
                <table className="leaderboard-table" aria-busy={status.state === 'loading'}>
                    <caption className="sr-only">{tab.label} leaderboard</caption>
                    <thead>
                        <tr>
                            <th scope="col" className="rank-col">Rank</th>
                            <th scope="col" className="name-col">Pilot</th>
                            <th scope="col" className="score-col">{tab.metric}</th>
                        </tr>
                    </thead>
                    <tbody>{body}</tbody>
                </table>
            </div>

            <p className="leaderboard-footnote">Only signed-in pilots appear here. Sign in from the game to post your runs.</p>
        </div>
    );
}
