// Void Runner's leaderboards, read from the game's Supabase project (the same one the game's pilot accounts use).
// The site calls public.voidrunner_board, the function behind the in-game LEADERBOARDS screen, so both show the same
// boards. The publishable key only lets the page read them: call signs and results, never account ids or emails.

const SUPABASE_URL = process.env.NEXT_PUBLIC_VOID_RUNNER_SUPABASE_URL ?? 'https://bmxsyigdhiiwsifpnvpg.supabase.co';
const PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_VOID_RUNNER_SUPABASE_KEY ?? 'sb_publishable_y9bh8xDkJvNXLNK8I2ukpg_g390z1HH';

export type ModeBoard = 'endless' | 'data_mining' | 'story';

export type StatId =
    | 'no_fire' | 'no_hit' | 'top_speed' | 'barrel_rolls'
    | 'accuracy' | 'blocks' | 'rivals' | 'rare_blocks'
    | 'longest_run' | 'flawless_waves' | 'data' | 'distance';

export type BoardId = ModeBoard | 'race' | 'pilots' | StatId;

export type StatUnit = 'distance' | 'speed' | 'count' | 'percent' | 'time';

export interface StatDef {
    id: StatId;
    group: 'Flying style' | 'Combat' | 'Survival';
    label: string;
    unit: StatUnit;
    note: string;
}

// The RECORDS boards, in the in-game order (LeaderboardScreen.cs).
export const STATS: StatDef[] = [
    { id: 'no_fire', group: 'Flying style', label: 'No-fire stretch', unit: 'distance', note: 'Longest distance flown without firing a shot (Endless Void and Story).' },
    { id: 'no_hit', group: 'Flying style', label: 'Untouchable', unit: 'distance', note: 'Longest distance flown without being hit. A shield taking the hit still counts as one.' },
    { id: 'top_speed', group: 'Flying style', label: 'Top speed', unit: 'speed', note: 'Fastest stream speed reached in a run.' },
    { id: 'barrel_rolls', group: 'Flying style', label: 'Barrel rolls', unit: 'count', note: 'Most barrel rolls in one run.' },
    { id: 'accuracy', group: 'Combat', label: 'Accuracy', unit: 'percent', note: 'Best share of shots that hit, in runs with at least 50 shots.' },
    { id: 'blocks', group: 'Combat', label: 'Blocks destroyed', unit: 'count', note: 'Most data blocks destroyed in one run (Endless Void and Story).' },
    { id: 'rivals', group: 'Combat', label: 'Rivals downed', unit: 'count', note: 'Most rival clones brought down in one run.' },
    { id: 'rare_blocks', group: 'Combat', label: 'Rare blocks', unit: 'count', note: 'Most green rare data blocks broken in one run.' },
    { id: 'longest_run', group: 'Survival', label: 'Longest run', unit: 'time', note: "Longest time flown in one run (pauses and menus don't count)." },
    { id: 'flawless_waves', group: 'Survival', label: 'Flawless waves', unit: 'count', note: 'Most waves cleared without taking a single hit.' },
    { id: 'data', group: 'Survival', label: 'Data collected', unit: 'count', note: 'Most data fragments collected in one run.' },
    { id: 'distance', group: 'Survival', label: 'Longest distance', unit: 'distance', note: 'Longest distance flown in one run, in any mode.' },
];

export const STAT_GROUPS: StatDef['group'][] = ['Flying style', 'Combat', 'Survival'];

// Threat levels and their colours, as in the game's DifficultyTable.
export const THREATS = [
    { level: 0, name: 'Easy', color: '#40FF66' },
    { level: 1, name: 'Medium', color: '#FFBF1A' },
    { level: 2, name: 'Insane', color: '#FF2659' },
] as const;

export const STORY_LAYERS = ['The Sanctum', 'The Archive', 'The Tribunal', 'The Fracture', 'The Core'];

// Rows as the server sends them. Empty values are left out (jsonb_strip_nulls), so most fields are optional.
interface BaseRow {
    rank: number;
    pilot: string;
}

export interface RunRow extends BaseRow {
    score?: number;
    distance?: number;
    waves?: number;
    rings?: number;        // Data Mining only
    grade?: string;
    difficulty?: number;   // 0 Easy, 1 Medium, 2 Insane
    layers?: number;       // Story only: layers cleared, 0-5
}

export interface RaceRow extends BaseRow {
    wins?: number;
    losses?: number;
    ties?: number;
    races?: number;
    best_ms?: number;      // fastest finish on the current course length
}

export interface PilotRow extends BaseRow {
    level?: number;
    xp?: number;
    runs?: number;
}

export interface StatRow extends BaseRow {
    value?: number;
    mode?: number;         // 0 Endless Void, 1 Data Mining, 2 Story
    difficulty?: number;
}

export interface BoardReply<R> {
    rows: R[];
    total?: number;        // pilots on the board, beyond the rows returned
}

export async function fetchBoard<R>(board: BoardId, difficulty: number, limit = 25, signal?: AbortSignal): Promise<BoardReply<R>> {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/rpc/voidrunner_board`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', apikey: PUBLISHABLE_KEY },
        body: JSON.stringify({ p_board: board, p_difficulty: difficulty, p_limit: limit }),
        signal,
    });
    if (!response.ok) throw new Error(`Leaderboard request failed (${response.status})`);
    const reply = (await response.json()) as BoardReply<R>;
    if (!reply || !Array.isArray(reply.rows)) throw new Error('Unexpected leaderboard response');
    return reply;
}

export function threat(difficulty: number | undefined) {
    return THREATS.find((t) => t.level === difficulty);
}

export function modeName(mode: number | undefined): string {
    return mode === 1 ? 'Data Mining' : mode === 2 ? 'Story' : 'Endless Void';
}

export function formatNumber(n: number | undefined): string {
    return typeof n === 'number' && Number.isFinite(n) ? Math.round(n).toLocaleString('en-US') : '0';
}

// 1:01.23, like the race HUD.
export function formatRaceTime(ms: number | undefined): string {
    if (typeof ms !== 'number' || !Number.isFinite(ms) || ms <= 0) return '--:--.--';
    const hundredths = Math.floor(ms / 10);
    const minutes = Math.floor(hundredths / 6000);
    const seconds = Math.floor(hundredths / 100) % 60;
    return `${minutes}:${String(seconds).padStart(2, '0')}.${String(hundredths % 100).padStart(2, '0')}`;
}

// A record's value the way the game shows it (distances get "m" here, since the site has more room).
export function formatStat(unit: StatUnit, value: number | undefined): string {
    const v = typeof value === 'number' && Number.isFinite(value) ? value : 0;
    switch (unit) {
        case 'percent':
            return `${(v * 100).toFixed(1)}%`;
        case 'time': {
            const secs = Math.floor(v);
            const mm = String(Math.floor(secs / 60) % 60).padStart(2, '0');
            const ss = String(secs % 60).padStart(2, '0');
            return secs >= 3600 ? `${Math.floor(secs / 3600)}:${mm}:${ss}` : `${Math.floor(secs / 60)}:${ss}`;
        }
        case 'distance':
            return `${formatNumber(v)} m`;
        default:
            return formatNumber(v);
    }
}
