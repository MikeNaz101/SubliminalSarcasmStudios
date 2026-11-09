"use client";

import { useCallback, useEffect, useRef, useState } from 'react';
import type { ChangeEvent, CSSProperties, KeyboardEvent, ReactNode } from 'react';
import './Leaderboard.css';
import {
    STATS,
    STAT_GROUPS,
    STORY_LAYERS,
    THREATS,
    fetchBoard,
    formatNumber,
    formatRaceTime,
    formatStat,
    modeName,
    threat,
    type BoardId,
    type BoardReply,
    type PilotRow,
    type RaceRow,
    type RunRow,
    type StatDef,
    type StatId,
    type StatRow,
} from '../lib/voidRunnerLeaderboard';

type TabId = 'endless' | 'data_mining' | 'story' | 'race' | 'pilots' | 'records';

interface Tab {
    id: TabId;
    label: string;
    short: string;     // the label on narrow screens
    color: string;     // the tab's accent (the modes' colours from the game's mode picker)
    metric: string;    // what the right-hand column ranks by
    note: string;
    byThreat: boolean; // whether the threat level filter applies
}

const TABS: Tab[] = [
    { id: 'endless', label: 'Endless Void', short: 'Endless', color: '#00FFFF', metric: 'Score', byThreat: true,
      note: 'Best run per pilot. Scores include the threat level.' },
    { id: 'data_mining', label: 'Data Mining', short: 'Mining', color: '#40FFCC', metric: 'Score', byThreat: true,
      note: 'Streaming Data Mining: best time-attack score per pilot.' },
    { id: 'story', label: 'Story', short: 'Story', color: '#FF3DAD', metric: 'Layers', byThreat: true,
      note: "Ranked by layers of the Arbiter's mind cleared, then by score." },
    { id: 'race', label: 'Online Race', short: 'Race', color: '#FF8C1A', metric: 'Wins', byThreat: false,
      note: 'Head-to-head wins, then fastest finish. Practice against the bot does not count.' },
    { id: 'pilots', label: 'Pilot Rank', short: 'Pilots', color: '#FFD140', metric: 'Level', byThreat: false,
      note: 'Pilot level, by total XP earned across every mode.' },
    { id: 'records', label: 'Records', short: 'Records', color: '#B36BFF', metric: '', byThreat: true,
      note: '' },
];

const LIMIT = 25;
const COLUMNS = 3;

type Status<R> = { state: 'loading' } | { state: 'error' } | { state: 'ready'; reply: BoardReply<R> };

function ThreatName({ difficulty }: { difficulty: number | undefined }) {
    const t = threat(difficulty);
    return t ? <span className="threat" style={{ '--threat': t.color } as CSSProperties}>{t.name}</span> : null;
}

// " · "-separated detail line; empty parts are dropped.
function Detail({ parts }: { parts: ReactNode[] }) {
    const shown = parts.filter((p) => p !== null && p !== undefined && p !== false && p !== '');
    return (
        <span className="pilot-detail">
            {shown.map((p, i) => <span key={i}>{i > 0 ? ' · ' : ''}{p}</span>)}
        </span>
    );
}

function Row({ rank, pilot, detail, metric }: { rank: number; pilot: string; detail: ReactNode; metric: ReactNode }) {
    return (
        <tr className={rank <= 3 ? `medal medal-${rank}` : undefined}>
            <td className="rank-col">#{rank}</td>
            <td className="name-col">
                <span className="pilot-name">{pilot || 'PILOT'}</span>
                {detail}
            </td>
            <td className="score-col">{metric}</td>
        </tr>
    );
}

function runRows(tab: TabId, rows: RunRow[]) {
    return rows.map((r) => {
        let parts: ReactNode[];
        let metric: ReactNode;
        if (tab === 'story') {
            const layers = r.layers ?? 0;
            parts = [
                layers >= STORY_LAYERS.length ? 'Story complete' : layers > 0 ? `Cleared ${STORY_LAYERS[layers - 1]}` : 'No layer cleared',
                `${formatNumber(r.score)} pts`,
            ];
            metric = <>{layers}<span className="metric-of">/{STORY_LAYERS.length}</span></>;
        } else {
            parts = tab === 'data_mining'
                ? [r.rings ? `${formatNumber(r.rings)} rings` : null, r.distance ? `${formatNumber(r.distance)} m` : null]
                : [r.waves ? `${r.waves.toLocaleString('en-US', { maximumFractionDigits: 1 })} waves` : null,
                   r.distance ? `${formatNumber(r.distance)} m` : null];
            metric = formatNumber(r.score);
        }
        parts.push(<ThreatName difficulty={r.difficulty} />, r.grade ? `Grade ${r.grade}` : null);
        return <Row key={`${r.rank}-${r.pilot}`} rank={r.rank} pilot={r.pilot} detail={<Detail parts={parts} />} metric={metric} />;
    });
}

function raceRows(rows: RaceRow[]) {
    return rows.map((r) => {
        const record = `${r.wins ?? 0}W ${r.losses ?? 0}L${r.ties ? ` ${r.ties}T` : ''}`;
        const detail = <Detail parts={[record, r.best_ms ? `Best ${formatRaceTime(r.best_ms)}` : null]} />;
        return <Row key={`${r.rank}-${r.pilot}`} rank={r.rank} pilot={r.pilot} detail={detail} metric={formatNumber(r.wins)} />;
    });
}

function pilotRows(rows: PilotRow[]) {
    return rows.map((r) => {
        const runs = r.runs ?? 0;
        const detail = <Detail parts={[`${formatNumber(r.xp)} XP`, `${formatNumber(runs)} ${runs === 1 ? 'run' : 'runs'}`]} />;
        return <Row key={`${r.rank}-${r.pilot}`} rank={r.rank} pilot={r.pilot} detail={detail} metric={formatNumber(r.level)} />;
    });
}

function statRows(stat: StatDef, rows: StatRow[]) {
    return rows.map((r) => {
        const detail = <Detail parts={[modeName(r.mode), <ThreatName difficulty={r.difficulty} />]} />;
        return <Row key={`${r.rank}-${r.pilot}`} rank={r.rank} pilot={r.pilot} detail={detail} metric={formatStat(stat.unit, r.value)} />;
    });
}

function emptyText(tab: TabId, difficulty: number): string {
    const on = difficulty >= 0 ? ` on ${threat(difficulty)?.name}` : '';
    switch (tab) {
        case 'endless': return `No Endless Void runs${on} yet. Be the first!`;
        case 'data_mining': return `No Data Mining runs${on} yet. Be the first!`;
        case 'story': return difficulty >= 0 ? `No Story flights${on} yet.` : 'No Captain has breached a firewall yet.';
        case 'race': return 'No online races recorded yet. Challenge a friend!';
        case 'pilots': return 'No pilots ranked yet.';
        default: return `No run on this record${on} yet.`;
    }
}

export default function Leaderboard() {
    const [active, setActive] = useState<TabId>('endless');
    const [difficulty, setDifficulty] = useState(-1);   // -1: every threat level
    const [statId, setStatId] = useState<StatId>('no_fire');
    const [boards, setBoards] = useState<Record<string, Status<unknown>>>({});
    const requested = useRef(new Set<string>());
    const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

    const tab = TABS.find((t) => t.id === active) ?? TABS[0];
    const stat = STATS.find((s) => s.id === statId) ?? STATS[0];
    const board: BoardId = active === 'records' ? statId : active;
    const level = tab.byThreat ? difficulty : -1;
    const key = `${board}:${level}`;

    // Each board (and threat level) loads the first time it's shown, then stays.
    const load = useCallback((boardId: BoardId, threatLevel: number, cacheKey: string) => {
        requested.current.add(cacheKey);
        setBoards((b) => ({ ...b, [cacheKey]: { state: 'loading' } }));
        fetchBoard<unknown>(boardId, threatLevel, LIMIT)
            .then((reply) => setBoards((b) => ({ ...b, [cacheKey]: { state: 'ready', reply } })))
            .catch((err) => {
                console.error('Error fetching leaderboard:', err);
                setBoards((b) => ({ ...b, [cacheKey]: { state: 'error' } }));
            });
    }, []);

    useEffect(() => {
        if (!requested.current.has(key)) load(board, level, key);
    }, [board, level, key, load]);

    const select = (index: number, focus: boolean) => {
        setActive(TABS[index].id);
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

    const status = boards[key] ?? { state: 'loading' };
    const metric = active === 'records' ? stat.label : tab.metric;
    const note = active === 'records' ? stat.note : tab.note;

    let body: ReactNode;
    if (status.state === 'loading') {
        body = <tr><td colSpan={COLUMNS} className="loading-text">Accessing Void Network...</td></tr>;
    } else if (status.state === 'error') {
        body = (
            <tr>
                <td colSpan={COLUMNS} className="error-text">
                    Connection to Void Network severed.{' '}
                    <button type="button" className="leaderboard-retry" onClick={() => load(board, level, key)}>Try again</button>
                </td>
            </tr>
        );
    } else if (status.reply.rows.length === 0) {
        body = <tr><td colSpan={COLUMNS} className="loading-text">{emptyText(active, level)}</td></tr>;
    } else if (active === 'race') {
        body = raceRows(status.reply.rows as RaceRow[]);
    } else if (active === 'pilots') {
        body = pilotRows(status.reply.rows as PilotRow[]);
    } else if (active === 'records') {
        body = statRows(stat, status.reply.rows as StatRow[]);
    } else {
        body = runRows(active, status.reply.rows as RunRow[]);
    }

    const shown = status.state === 'ready' ? status.reply.rows.length : 0;
    const total = status.state === 'ready' ? status.reply.total ?? shown : 0;

    return (
        <div className="leaderboard-container" style={{ '--mode': tab.color } as CSSProperties}>
            <h3 className="leaderboard-title" id="leaderboard-title">Top Pilots</h3>

            <div className="leaderboard-tabs" role="tablist" aria-labelledby="leaderboard-title">
                {TABS.map((t, i) => {
                    const selected = t.id === active;
                    return (
                        <button
                            key={t.id}
                            ref={(el: HTMLButtonElement | null) => { tabRefs.current[i] = el; }}
                            type="button"
                            role="tab"
                            id={`leaderboard-tab-${t.id}`}
                            aria-selected={selected}
                            aria-controls="leaderboard-panel"
                            aria-label={t.label}
                            tabIndex={selected ? 0 : -1}
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

            <div id="leaderboard-panel" role="tabpanel" aria-labelledby={`leaderboard-tab-${tab.id}`}>
                {(active === 'records' || tab.byThreat) && (
                    <div className="leaderboard-controls">
                        {active === 'records' && (
                            <label className="record-picker">
                                <span className="control-label">Record</span>
                                <select
                                    value={statId}
                                    onChange={(e: ChangeEvent<HTMLSelectElement>) => setStatId(e.target.value as StatId)}
                                >
                                    {STAT_GROUPS.map((g) => (
                                        <optgroup key={g} label={g}>
                                            {STATS.filter((s) => s.group === g).map((s) => (
                                                <option key={s.id} value={s.id}>{s.label}</option>
                                            ))}
                                        </optgroup>
                                    ))}
                                </select>
                            </label>
                        )}
                        {tab.byThreat && (
                            <div className="threat-filter" role="group" aria-label="Threat level">
                                <span className="control-label" aria-hidden="true">Threat</span>
                                <div className="threat-options">
                                    {[{ level: -1, name: 'All', color: tab.color }, ...THREATS].map((t) => (
                                        <button
                                            key={t.level}
                                            type="button"
                                            className="threat-option"
                                            aria-pressed={difficulty === t.level}
                                            style={{ '--threat': t.color } as CSSProperties}
                                            onClick={() => setDifficulty(t.level)}
                                        >
                                            {t.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                <p className="leaderboard-note">{note}</p>
                <table className="leaderboard-table" aria-busy={status.state === 'loading'}>
                    <caption className="sr-only">
                        {active === 'records' ? `${stat.label} record` : `${tab.label} leaderboard`}
                        {tab.byThreat && level >= 0 ? `, ${threat(level)?.name}` : ''}
                    </caption>
                    <thead>
                        <tr>
                            <th scope="col" className="rank-col">Rank</th>
                            <th scope="col" className="name-col">Pilot</th>
                            <th scope="col" className="score-col">{metric}</th>
                        </tr>
                    </thead>
                    <tbody>{body}</tbody>
                </table>
            </div>

            <p className="leaderboard-footnote">
                {total > shown ? `Top ${shown} of ${formatNumber(total)} pilots. ` : ''}
                Only signed-in pilots appear here. Sign in from the game to post your runs.
                {active === 'records' ? ' Most records only count runs from game builds since Oct 29.' : ''}
            </p>
        </div>
    );
}
